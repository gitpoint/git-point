import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, ActionSheetIOS } from 'react-native';
import { ListItem } from 'react-native-elements';

import {
  ViewContainer,
  SectionList,
  UserListItem,
  LabelListItem,
} from 'components';
import { colors } from 'config';
import { getLabels } from 'repository';
import { editIssue, changeIssueLockStatus } from '../issue.action';

const mapStateToProps = state => ({
  authUser: state.auth.user,
  repository: state.repository.repository,
  labels: state.repository.labels,
  issue: state.issue.issue,
  isMerged: state.issue.isMerged,
  isEditingIssue: state.issue.isEditingIssue,
  isPendingLabels: state.repository.isPendingLabels,
});

const mapDispatchToProps = dispatch => ({
  editIssue: (owner, repoName, issueNum, editParams, updateParams) =>
    dispatch(editIssue(owner, repoName, issueNum, editParams, updateParams)),
  changeIssueLockStatus: (owner, repoName, issueNum, currentStatus) =>
    dispatch(changeIssueLockStatus(owner, repoName, issueNum, currentStatus)),
  getLabels: url => dispatch(getLabels(url)),
});

const styles = StyleSheet.create({
  listItemTitle: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium',
  },
  closeActionTitle: {
    color: colors.red,
    fontFamily: 'AvenirNext-Medium',
  },
  openActionTitle: {
    color: colors.green,
    fontFamily: 'AvenirNext-Medium',
  },
});

class IssueSettings extends Component {
  props: {
    editIssue: Function,
    changeIssueLockStatus: Function,
    getLabels: Function,
    authUser: Object,
    repository: Object,
    labels: Array,
    issue: Object,
    isMerged: boolean,
    // isEditingIssue: boolean,
    isPendingLabels: boolean,
    navigation: Object,
  };

  componentDidMount() {
    this.props.getLabels(
      this.props.repository.labels_url.replace('{/name}', '')
    );
  }

  editIssue = (editParams, stateChangeParams) => {
    const { issue, repository } = this.props;
    const repoName = repository.name;
    const owner = repository.owner.login;
    const updateStateParams = stateChangeParams || editParams;

    return this.props.editIssue(
      owner,
      repoName,
      issue.number,
      editParams,
      updateStateParams
    );
  };

  showAddLabelActionSheet = () => {
    if (!this.props.isPendingLabels) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: 'Apply a label to this issue',
          options: [...this.props.labels.map(label => label.name), 'Cancel'],
          cancelButtonIndex: this.props.labels.length,
        },
        buttonIndex => {
          const { issue, labels } = this.props;
          const labelChoices = [...labels.map(label => label.name)];

          if (
            buttonIndex !== labelChoices.length &&
            !issue.labels.some(
              label => label.name === labelChoices[buttonIndex]
            )
          ) {
            this.editIssue(
              {
                labels: [
                  ...issue.labels.map(label => label.name),
                  labelChoices[buttonIndex],
                ],
              },
              { labels: [...issue.labels, labels[buttonIndex]] }
            );
          }
        }
      );
    }
  };

  showChangeIssueStateActionSheet = stateChange => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: `Are you sure you want to ${stateChange} this?`,
        options: ['Yes', 'Cancel'],
        cancelButtonIndex: 1,
      },
      buttonIndex => {
        const { navigation } = this.props;

        const newState = stateChange === 'close' ? 'closed' : 'open';

        if (buttonIndex === 0) {
          this.editIssue({ state: newState }).then(() => {
            navigation.goBack();
          });
        }
      }
    );
  };

  showLockIssueActionSheet = issueLocked => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: `Are you sure you want to ${issueLocked
          ? 'unlock'
          : 'lock'} this conversation?`,
        options: ['Yes', 'Cancel'],
        cancelButtonIndex: 1,
      },
      buttonIndex => {
        const { issue, repository } = this.props;
        const repoName = repository.name;
        const owner = repository.owner.login;

        if (buttonIndex === 0) {
          this.props.changeIssueLockStatus(
            owner,
            repoName,
            issue.number,
            issueLocked
          );
        }
      }
    );
  };

  render() {
    const { issue, isMerged, authUser, navigation } = this.props;
    const issueType = issue.pull_request ? 'Pull Request' : 'Issue';

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList
            showButton
            buttonTitle="Apply Label"
            buttonAction={() => this.showAddLabelActionSheet()}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.grey,
            }}
            noItems={issue.labels.length === 0}
            noItemsMessage="None yet"
            title="LABELS"
          >
            {issue.labels.map(item =>
              <LabelListItem
                label={item}
                key={item.id}
                removeLabel={labelToRemove =>
                  this.editIssue(
                    {
                      labels: [
                        ...issue.labels
                          .map(label => label.name)
                          .filter(
                            labelName => labelName !== labelToRemove.name
                          ),
                      ],
                    },
                    {
                      labels: issue.labels.filter(
                        label => label.name !== labelToRemove.name
                      ),
                    }
                  )}
              />
            )}
          </SectionList>

          <SectionList
            showButton={
              !issue.assignees.some(
                assignee => assignee.login === authUser.login
              )
            }
            buttonTitle="Assign Yourself"
            buttonAction={() =>
              this.editIssue(
                {
                  assignees: [
                    ...issue.assignees.map(user => user.login),
                    authUser.login,
                  ],
                },
                { assignees: [...issue.assignees, authUser] }
              )}
            noItems={issue.assignees.length === 0}
            noItemsMessage="None yet"
            title="ASSIGNEES"
          >
            {issue.assignees.map(item =>
              <UserListItem
                user={item}
                key={item.id}
                navigation={navigation}
                icon="x"
                iconAction={userToRemove =>
                  this.editIssue(
                    {
                      assignees: [
                        ...issue.assignees
                          .map(user => user.login)
                          .filter(user => user !== userToRemove),
                      ],
                    },
                    {
                      assignees: issue.assignees.filter(
                        assignee => assignee.login !== userToRemove
                      ),
                    }
                  )}
              />
            )}
          </SectionList>

          <SectionList title="Actions">
            <ListItem
              title={issue.locked ? `Unlock ${issueType}` : `Lock ${issueType}`}
              hideChevron
              underlayColor={colors.greyLight}
              titleStyle={styles.listItemTitle}
              onPress={() => this.showLockIssueActionSheet(issue.locked)}
            />

            {!isMerged &&
              <ListItem
                title={
                  issue.state === 'open'
                    ? `Close ${issueType}`
                    : `Reopen ${issueType}`
                }
                hideChevron
                underlayColor={colors.greyLight}
                titleStyle={
                  issue.state === 'open'
                    ? styles.closeActionTitle
                    : styles.openActionTitle
                }
                onPress={() =>
                  this.showChangeIssueStateActionSheet(
                    issue.state === 'open' ? 'close' : 'reopen'
                  )}
              />}
          </SectionList>
        </ScrollView>
      </ViewContainer>
    );
  }
}

export const IssueSettingsScreen = connect(mapStateToProps, mapDispatchToProps)(
  IssueSettings
);
