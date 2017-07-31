import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';

import {
  ViewContainer,
  SectionList,
  UserListItem,
  LabelListItem,
} from 'components';
import { translate } from 'utils';
import { colors, fonts } from 'config';
import { getLabels } from 'repository';
import { editIssue, changeIssueLockStatus } from '../issue.action';

const mapStateToProps = state => ({
  language: state.auth.language,
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
    ...fonts.fontPrimary,
  },
  closeActionTitle: {
    color: colors.red,
    ...fonts.fontPrimary,
  },
  openActionTitle: {
    color: colors.green,
    ...fonts.fontPrimary,
  },
});

class IssueSettings extends Component {
  props: {
    editIssue: Function,
    changeIssueLockStatus: Function,
    getLabels: Function,
    language: string,
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

  showChangeIssueStateActionSheet = () => {
    this.IssueActionSheet.show();
  };

  showLockIssueActionSheet = () => {
    this.LockIssueActionSheet.show();
  };

  showAddLabelActionSheet = () => {
    if (!this.props.isPendingLabels) {
      this.AddLabelActionSheet.show();
    }
  };

  handleIssueActionPress = index => {
    const { issue, navigation } = this.props;
    const newState = issue.state === 'open' ? 'close' : 'open';

    if (index === 0) {
      this.editIssue({ state: newState }).then(() => {
        navigation.goBack();
      });
    }
  };

  handleLockIssueActionPress = index => {
    const { issue, repository } = this.props;
    const repoName = repository.name;
    const owner = repository.owner.login;

    if (index === 0) {
      this.props.changeIssueLockStatus(
        owner,
        repoName,
        issue.number,
        issue.locked
      );
    }
  };

  handleAddLabelActionPress = index => {
    const { issue, labels } = this.props;
    const labelChoices = [...labels.map(label => label.name)];

    if (
      index !== labelChoices.length &&
      !issue.labels.some(label => label.name === labelChoices[index])
    ) {
      this.editIssue(
        {
          labels: [
            ...issue.labels.map(label => label.name),
            labelChoices[index],
          ],
        },
        { labels: [...issue.labels, labels[index]] }
      );
    }
  };

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

  render() {
    const { issue, isMerged, language, authUser, navigation } = this.props;
    const issueType = issue.pull_request
      ? translate('issue.settings.pullRequestType', language)
      : translate('issue.settings.issueType', language);

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList
            showButton
            buttonTitle={translate('issue.settings.applyLabelButton', language)}
            buttonAction={this.showAddLabelActionSheet}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.grey,
            }}
            noItems={issue.labels.length === 0}
            noItemsMessage={translate('issue.settings.noneMessage', language)}
            title={translate('issue.settings.labelsTitle', language)}
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
            buttonTitle={translate(
              'issue.settings.assignYourselfButton',
              language
            )}
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
            noItemsMessage={translate('issue.settings.noneMessage', language)}
            title={translate('issue.settings.assigneesTitle', language)}
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

          <SectionList
            title={translate('issue.settings.actionsTitle', language)}
          >
            <ListItem
              title={
                issue.locked
                  ? translate('issue.settings.unlockIssue', language, {
                      issueType,
                    })
                  : translate('issue.settings.lockIssue', language, {
                      issueType,
                    })
              }
              hideChevron
              underlayColor={colors.greyLight}
              titleStyle={styles.listItemTitle}
              onPress={this.showLockIssueActionSheet}
            />

            {!isMerged &&
              <ListItem
                title={
                  issue.state === 'open'
                    ? translate('issue.settings.closeIssue', language, {
                        issueType,
                      })
                    : translate('issue.settings.reopenIssue', language, {
                        issueType,
                      })
                }
                hideChevron
                underlayColor={colors.greyLight}
                titleStyle={
                  issue.state === 'open'
                    ? styles.closeActionTitle
                    : styles.openActionTitle
                }
                onPress={this.showChangeIssueStateActionSheet}
              />}
          </SectionList>
        </ScrollView>

        <ActionSheet
          ref={o => {
            this.IssueActionSheet = o;
          }}
          title={translate('issue.settings.areYouSurePrompt', language)}
          options={[
            translate('common.yes', language),
            translate('common.cancel', language),
          ]}
          cancelButtonIndex={1}
          onPress={this.handleIssueActionPress}
        />
        <ActionSheet
          ref={o => {
            this.LockIssueActionSheet = o;
          }}
          title={translate('issue.settings.areYouSurePrompt', language)}
          options={[
            translate('common.yes', language),
            translate('common.cancel', language),
          ]}
          cancelButtonIndex={1}
          onPress={this.handleLockIssueActionPress}
        />
        <ActionSheet
          ref={o => {
            this.AddLabelActionSheet = o;
          }}
          title={translate('issue.settings.applyLabelTitle', language)}
          options={[
            ...this.props.labels.map(label => label.name),
            translate('common.cancel', language),
          ]}
          cancelButtonIndex={this.props.labels.length}
          onPress={this.handleAddLabelActionPress}
        />
      </ViewContainer>
    );
  }
}

export const IssueSettingsScreen = connect(mapStateToProps, mapDispatchToProps)(
  IssueSettings
);
