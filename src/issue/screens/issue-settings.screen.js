import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import { RestClient } from 'api';

import {
  ViewContainer,
  SectionList,
  UserListItem,
  LabelListItem,
} from 'components';
import { emojifyText, translate, openURLInView } from 'utils';
import { colors, fonts } from 'config';

const mapStateToProps = (state, ownProps) => {
  const { repoId, issueNumber } = ownProps.navigation.state.params;

  const {
    entities: { users, issues, issue_labels, repos },
    pagination: { REPOS_GET_LABELS },
  } = state;

  const issueFQN = `${repoId}-${issueNumber}`;

  const issue = issues[issueFQN];
  const repository = repos[repoId];

  const repoLabelsPagination = REPOS_GET_LABELS[repoId] || {
    ids: [],
    isFetching: true,
  };
  const repoLabels = repoLabelsPagination.ids.reduce((map, id) => {
    /* eslint-disable no-param-reassign */
    map[id] = issue_labels[id];

    return map;
  }, {});

  return {
    locale: state.auth.locale,
    authUser: state.auth.user,
    repoId,
    users,
    repository,
    issueNumber,
    issue,
    repoLabels,
  };
};

const mapDispatchToProps = {
  getLabels: RestClient.repos.getLabels,
  editIssue: RestClient.issues.edit,
  lockIssue: RestClient.issues.lock,
  unlockIssue: RestClient.issues.unlock,
};

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
    repoId: string,
    issueNumber: number,
    getLabels: Function,
    repoLabels: Array,
    users: Array,

    lockIssue: Function,
    unlockIssue: Function,
    editIssue: Function,
    locale: string,
    authUser: Object,
    issue: Object,
    isMerged: boolean,
    // isEditingIssue: boolean,
    isPendingLabels: boolean,
    navigation: Object,
  };

  componentDidMount() {
    const { repoId, getLabels } = this.props;

    getLabels(repoId);
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
    const { issueNumber, repoId, issue, lockIssue, unlockIssue } = this.props;

    if (index === 0) {
      if (issue.locked) {
        unlockIssue(repoId, issueNumber);
      } else {
        lockIssue(repoId, issueNumber);
      }
    }
  };

  handleAddLabelActionPress = index => {
    const { issue, repoLabels } = this.props;

    const existingLabels = issue.labels.map(label => repoLabels[label].name);

    this.editIssue({
      labels: [...existingLabels, Object.values(repoLabels)[index]],
    });
  };

  editIssue = editParams => {
    const { repoId, issueNumber } = this.props;

    return this.props.editIssue(repoId, issueNumber, editParams);
  };

  openURLInBrowser = () => openURLInView(this.props.issue.html_url);

  render() {
    const {
      issue,
      repoLabels,
      isMerged,
      locale,
      users,
      authUser,
      navigation,
    } = this.props;

    const issueType = issue.pull_request
      ? translate('issue.settings.pullRequestType', locale)
      : translate('issue.settings.issueType', locale);

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList
            showButton
            buttonTitle={translate('issue.settings.applyLabelButton', locale)}
            buttonAction={this.showAddLabelActionSheet}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.grey,
            }}
            noItems={repoLabels.length === 0}
            noItemsMessage={translate('issue.settings.noneMessage', locale)}
            title={translate('issue.settings.labelsTitle', locale)}
          >
            {issue.labels.map(labelId => (
              <LabelListItem
                label={repoLabels[labelId]}
                key={labelId}
                removeLabel={labelToRemove => {
                  const existingLabels = issue.labels.map(
                    label => repoLabels[label].name
                  );

                  return this.editIssue({
                    labels: [
                      ...existingLabels.filter(
                        label => label !== labelToRemove.name
                      ),
                    ],
                  });
                }}
              />
            ))}
          </SectionList>

          <SectionList
            showButton={
              !issue.assignees.some(assignee => assignee === authUser.login)
            }
            buttonTitle={translate(
              'issue.settings.assignYourselfButton',
              locale
            )}
            buttonAction={() => {
              return this.editIssue({
                assignees: [...issue.assignees, authUser.login],
              });
            }}
            noItems={issue.assignees.length === 0}
            noItemsMessage={translate('issue.settings.noneMessage', locale)}
            title={translate('issue.settings.assigneesTitle', locale)}
          >
            {issue.assignees.map(item => (
              <UserListItem
                user={users[item]}
                key={item.id}
                navigation={navigation}
                icon="x"
                iconAction={userToRemove =>
                  this.editIssue({
                    assignees: [
                      ...issue.assignees.filter(user => user !== userToRemove),
                    ],
                  })
                }
              />
            ))}
          </SectionList>

          <SectionList title={translate('issue.settings.actionsTitle', locale)}>
            <ListItem
              title={
                issue.locked
                  ? translate('issue.settings.unlockIssue', locale, {
                      issueType,
                    })
                  : translate('issue.settings.lockIssue', locale, {
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
                    ? translate('issue.settings.closeIssue', locale, {
                        issueType,
                      })
                    : translate('issue.settings.reopenIssue', locale, {
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
              title={translate('common.openInBrowser', locale)}
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
          title={translate('issue.settings.areYouSurePrompt', locale)}
          options={[
            translate('common.yes', locale),
            translate('common.cancel', locale),
          ]}
          cancelButtonIndex={1}
          onPress={this.handleIssueActionPress}
        />
        <ActionSheet
          ref={o => {
            this.LockIssueActionSheet = o;
          }}
          title={translate('issue.settings.areYouSurePrompt', locale)}
          options={[
            translate('common.yes', locale),
            translate('common.cancel', locale),
          ]}
          cancelButtonIndex={1}
          onPress={this.handleLockIssueActionPress}
        />
        <ActionSheet
          ref={o => {
            this.AddLabelActionSheet = o;
          }}
          title={translate('issue.settings.applyLabelTitle', locale)}
          options={[
            ...Object.values(repoLabels).map(label => emojifyText(label.name)),
            translate('common.cancel', locale),
          ]}
          cancelButtonIndex={Object.values(repoLabels).length}
          onPress={this.handleAddLabelActionPress}
        />
      </ViewContainer>
    );
  }
}

export const IssueSettingsScreen = connect(mapStateToProps, mapDispatchToProps)(
  IssueSettings
);
