import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';

import {
  ViewContainer,
  SectionList,
  UserListItem,
  LabelListItem,
} from 'components';
import { emojifyText, t, openURLInView } from 'utils';
import { colors, fonts } from 'config';
import { v3 } from 'api';
import { getLabels } from 'repository';
import { editIssue, changeIssueLockStatus } from '../issue.action';

const mapStateToProps = state => ({
  locale: state.auth.locale,
  authUser: state.auth.user,
  labels: state.repository.labels,
  isMerged: state.issue.isMerged,
  isEditingIssue: state.issue.isEditingIssue,
  isPendingLabels: state.repository.isPendingLabels,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editIssue,
      changeIssueLockStatus,
      getLabels,
    },
    dispatch
  );

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
    locale: string,
    authUser: Object,
    labels: Array,
    isMerged: boolean,
    // isEditingIssue: boolean,
    isPendingLabels: boolean,
    navigation: Object,
  };

  componentDidMount() {
    this.props.getLabels(
      `${v3.root}/repos/${
        this.props.navigation.state.params.repository.full_name
      }/labels`
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
    const { navigation } = this.props;
    const { issue } = navigation.state.params;
    const newState = issue.state === 'open' ? 'close' : 'open';

    if (index === 0) {
      this.editIssue({ state: newState }).then(() => {
        navigation.goBack();
      });
    }
  };

  handleLockIssueActionPress = index => {
    const { issue, repository } = this.props.navigation.state.params;
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
    const { navigation, labels } = this.props;
    const { issue } = navigation.state.params;
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
    const { issue, repository } = this.props.navigation.state.params;
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

  openURLInBrowser = () =>
    openURLInView(this.props.navigation.state.params.issue.html_url);

  render() {
    const { isMerged, locale, authUser, navigation } = this.props;
    const { issue } = navigation.state.params;
    const issueType = issue.pull_request
      ? t('Pull Request', locale)
      : t('Issue', locale);

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList
            showButton
            buttonTitle={t('Apply Label', locale)}
            buttonAction={this.showAddLabelActionSheet}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.grey,
            }}
            noItems={issue.labels.length === 0}
            noItemsMessage={t('None yet', locale)}
            title={t('LABELS', locale)}
          >
            {issue.labels.map(item => (
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
                  )
                }
              />
            ))}
          </SectionList>

          <SectionList
            showButton={
              !issue.assignees.some(
                assignee => assignee.login === authUser.login
              )
            }
            buttonTitle={t('Assign Yourself', locale)}
            buttonAction={() =>
              this.editIssue(
                {
                  assignees: [
                    ...issue.assignees.map(user => user.login),
                    authUser.login,
                  ],
                },
                { assignees: [...issue.assignees, authUser] }
              )
            }
            noItems={issue.assignees.length === 0}
            noItemsMessage={t('None yet', locale)}
            title={t('ASSIGNEES', locale)}
          >
            {issue.assignees.map(item => (
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
                  )
                }
              />
            ))}
          </SectionList>

          <SectionList title={t('ACTIONS', locale)}>
            <ListItem
              title={
                issue.locked
                  ? t('Unlock {issueType}', locale, {
                      issueType,
                    })
                  : t('Lock {issueType}', locale, {
                      issueType,
                    })
              }
              hideChevron
              underlayColor={colors.greyLight}
              titleStyle={styles.listItemTitle}
              onPress={this.showLockIssueActionSheet}
            />

            {!isMerged && (
              <ListItem
                title={
                  issue.state === 'open'
                    ? t('Close {issueType}', locale, {
                        issueType,
                      })
                    : t('Reopen {issueType}', locale, {
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
              />
            )}
          </SectionList>

          <SectionList>
            <ListItem
              title={t('Open in Browser', locale)}
              hideChevron
              underlayColor={colors.greyLight}
              titleStyle={styles.listItemTitle}
              onPress={this.openURLInBrowser}
            />
          </SectionList>
        </ScrollView>

        <ActionSheet
          ref={o => {
            this.IssueActionSheet = o;
          }}
          title={t('Are you sure?', locale)}
          options={[t('Yes', locale), t('Cancel', locale)]}
          cancelButtonIndex={1}
          onPress={this.handleIssueActionPress}
        />
        <ActionSheet
          ref={o => {
            this.LockIssueActionSheet = o;
          }}
          title={t('Are you sure?', locale)}
          options={[t('Yes', locale), t('Cancel', locale)]}
          cancelButtonIndex={1}
          onPress={this.handleLockIssueActionPress}
        />
        <ActionSheet
          ref={o => {
            this.AddLabelActionSheet = o;
          }}
          title={t('Apply a label to this issue', locale)}
          options={[
            ...this.props.labels.map(label => emojifyText(label.name)),
            t('Cancel', locale),
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
