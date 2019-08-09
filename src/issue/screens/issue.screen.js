/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Linking,
  Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';

import {
  ViewContainer,
  LoadingContainer,
  LoadingCommonItem,
  IssueDescription,
  CommentListItem,
  CommentInput,
  IssueEventListItem,
} from 'components';
import { v3, RestClient } from 'api';
import {
  t,
  formatEventsToRender,
  openURLInView,
  getRepoIdFromUrl,
} from 'utils';
import { colors } from 'config';
import {
  getPullRequestDetails,
  postIssueComment,
  getCommits,
  deleteIssueComment,
} from '../issue.action';

const parseIssueNavigation = navigation => {
  const params = navigation.state.params;
  const issueURL = params.issueURL || params.issue.url;
  const tokens = issueURL.split('/');

  return {
    issueURL,
    issueRepository: issueURL
      .replace(`${v3.root}/repos/`, '')
      .replace(/([^/]+\/[^/]+)\/issues\/\d+$/, '$1'),
    issueNumber: tokens[tokens.length - 1],
  };
};

const mapStateToProps = (state, ownProps) => {
  const {
    auth: { user, locale },
    issue: {
      pr,
      diff,
      isMerged,
      isPendingDiff,
      isPendingCheckMerge,
      isPostingComment,
      isDeletingComment,
    },
    entities: { users, gqlRepos, issues, issueTimelineItems },
    pagination: { REPOS_GET_CONTRIBUTORS, REPOS_GET_ISSUE_TIMELINE },
  } = state;

  const { issueURL, issueRepository, issueNumber } = parseIssueNavigation(
    ownProps.navigation
  );
  const issueId = `${issueRepository}/${issueNumber}`;
  const timelineItemsPagination = REPOS_GET_ISSUE_TIMELINE[issueId] || {
    ids: [],
  };
  const timelineItems = timelineItemsPagination.ids.map(
    id => issueTimelineItems[id]
  );

  return {
    locale,
    authUser: user,
    repository: gqlRepos[issueRepository],
    contributors: (
      REPOS_GET_CONTRIBUTORS[issueRepository] || { ids: [] }
    ).ids.map(id => users[id]),
    issue: issues[issueURL],
    comments: timelineItems.filter(item => item && item.event === 'commented'),
    events: timelineItems.filter(item => item && item.event !== 'commented'),
    timelineItemsPagination,
    pr,
    diff,
    isMerged,
    commits: state.issue.commits,
    isPendingDiff,
    isPendingCheckMerge,
    isPostingComment,
    isDeletingComment,
  };
};

const mapDispatchToProps = {
  getRepo: RestClient.graphql.getRepo,
  getContributors: RestClient.repos.getContributors,
  getIssue: RestClient.repos.getIssue,
  getIssueTimeline: RestClient.repos.getIssueTimeline,
  getCommits,
  getPullRequestDetails,
  postIssueComment,
  deleteIssueComment,
};

const compareCreatedAt = (a, b) => {
  if (a.created_at < b.created_at) {
    return -1;
  } else if (a.created_at > b.created_at) {
    return 1;
  }

  return 0;
};

class Issue extends Component {
  static navigationOptions = ({ navigation }) => {
    const getHeaderIcon = () => {
      const { state, navigate } = navigation;

      if (state.params.userHasPushPermission) {
        return (
          <Icon
            name="gear"
            color={colors.primaryDark}
            type="octicon"
            containerStyle={{ marginRight: 5 }}
            underlayColor={colors.transparent}
            onPress={() =>
              navigate('IssueSettings', {
                title: t('Settings', state.params.locale),
                issue: state.params.issue,
                repository: state.params.repository,
              })
            }
          />
        );
      }

      return (
        <Icon
          name="ellipsis-h"
          color={colors.primaryDark}
          type="font-awesome"
          containerStyle={{ marginRight: 10 }}
          underlayColor={colors.transparent}
          onPress={state.params.showActionSheet}
        />
      );
    };

    return { headerRight: getHeaderIcon() };
  };

  props: {
    getRepo: Function,
    getContributors: Function,
    getIssue: Function,
    getIssueTimeline: Function,
    getPullRequestDetails: Function,
    postIssueComment: Function,
    getCommits: Function,
    deleteIssueComment: Function,
    commits: Array,
    issue: Object,
    timelineItemsPagination: Object,
    comments: Array,
    events: Array,
    diff: string,
    pr: Object,
    isMerged: boolean,
    authUser: Object,
    repository: Object,
    contributors: Array,
    isPendingDiff: boolean,
    isPendingCommits: boolean,
    isPendingCheckMerge: boolean,
    isDeletingComment: boolean,
    // isPostingComment: boolean,
    locale: string,
    navigation: Object,
  };

  componentDidMount() {
    this.getIssueInformation();
  }

  onLinkPress = node => {
    const { navigation, authUser } = this.props;

    if (node.attribs.class && node.attribs.class.includes('user-mention')) {
      const login = node.children[0].data.substring(1);

      navigation.navigate(
        authUser.login === login ? 'AuthProfile' : 'Profile',
        {
          user: { login },
        }
      );
    } else if (
      node.attribs.class &&
      node.attribs.class.includes('issue-link')
    ) {
      navigation.navigate('Issue', {
        issueURL: node.attribs.href
          .replace(/(#.+)$/, '')
          .replace('https://github.com', `${v3.root}/repos`)
          .replace(/pull\/([0-9]+)$/, 'issues/$1'),
      });
    } else {
      Linking.openURL(node.attribs.href);
    }
  };

  onRepositoryPress = url => {
    const { navigation } = this.props;

    navigation.navigate('Repository', {
      repoId: getRepoIdFromUrl(url),
    });
  };

  getIssueInformation = () => {
    const {
      navigation,
      getIssue,
      getIssueTimeline,
      getRepo,
      getContributors,
      getCommits,
      getPullRequestDetails,
    } = this.props;

    const { issueURL, issueRepository, issueNumber } = parseIssueNavigation(
      navigation
    );
    const pullRequestCommitsURL = `${issueURL.replace(
      'issues',
      'pulls'
    )}/commits`;

    Promise.all([
      getIssue(issueRepository, issueNumber),
      getIssueTimeline(issueRepository, issueNumber, { forceRefresh: true }),
      getRepo(issueRepository),
      getContributors(issueRepository, { forceRefresh: true }),
    ])
      .then(() => {
        const issue = this.props.issue;

        if (issue.pull_request) {
          return Promise.all([
            getPullRequestDetails(issue),
            getCommits(pullRequestCommitsURL),
          ]);
        }

        return Promise.resolve();
      })
      .then(() => {
        this.setNavigationParams();
      });
  };

  setNavigationParams = () => {
    const { navigation, locale, issue, repository } = this.props;

    navigation.setParams({
      locale,
      userHasPushPermission:
        repository.permissions.admin || repository.permissions.push,
      issue,
      repository,
      showActionSheet: this.showActionSheet,
    });
  };

  showActionSheet = () => this.ActionSheet.show();

  handleActionSheetPress = index => {
    if (index === 0) {
      openURLInView(this.props.issue.html_url);
    }
  };

  postComment = body => {
    const { issue, repository } = this.props;

    const repoName = repository.name;
    const owner = repository.owner.login;
    const issueNum = issue.number;

    this.props.postIssueComment(body, owner, repoName, issueNum).then(() => {
      this.commentsList.scrollToEnd();
    });
    Keyboard.dismiss();
  };

  deleteComment = comment => {
    const { repository } = this.props;
    const repoName = repository.name;
    const owner = repository.owner.login;

    this.props.deleteIssueComment(comment.id, owner, repoName);
  };

  editComment = comment => {
    const { state, navigate } = this.props.navigation;
    const { issue, repository } = this.props;

    navigate('EditIssueComment', {
      title: t('Edit Comment', state.params.locale),
      issue,
      comment,
      repository,
    });
  };

  keyExtractor = (item, index) => {
    return index;
  };

  renderHeader = () => {
    const {
      issue,
      repository,
      pr,
      diff,
      commits,
      isMerged,
      isPendingDiff,
      isPendingCommits,
      isPendingCheckMerge,
      locale,
      navigation,
    } = this.props;

    return (
      <IssueDescription
        issue={issue}
        repository={repository}
        diff={diff}
        commits={commits}
        isMergeable={pr.mergeable}
        isMerged={isMerged}
        isPendingDiff={isPendingDiff}
        isPendingCommits={isPendingCommits}
        isPendingCheckMerge={isPendingCheckMerge}
        onRepositoryPress={url => this.onRepositoryPress(url)}
        onLinkPress={node => this.onLinkPress(node)}
        userHasPushPermission={navigation.state.params.userHasPushPermission}
        locale={locale}
        navigation={navigation}
      />
    );
  };

  renderFooter = () => {
    return this.props.timelineItemsPagination.nextPageUrl ? (
      <LoadingCommonItem />
    ) : null;
  };

  renderItem = ({ item }) => {
    const { repository, locale, navigation } = this.props;

    if (item.header) {
      return this.renderHeader();
    }

    if (item.event && item.event !== 'commented') {
      return (
        <IssueEventListItem
          repository={repository}
          event={item}
          navigation={navigation}
        />
      );
    }

    return (
      <CommentListItem
        comment={item}
        onLinkPress={node => this.onLinkPress(node)}
        onDeletePress={this.deleteComment}
        onEditPress={this.editComment}
        locale={locale}
        navigation={navigation}
      />
    );
  };

  render() {
    const {
      issue,
      repository,
      comments,
      contributors,
      isDeletingComment,
      locale,
      navigation,
    } = this.props;

    const isPendingIssue = !issue || !repository;
    const isLoadingData = !!(isPendingIssue || isDeletingComment);
    const isShowLoadingContainer = isPendingIssue;
    const header = { header: true, created_at: '' };
    const events = formatEventsToRender([...this.props.events]);
    const conversation = [header, issue, ...comments, ...events].sort(
      compareCreatedAt
    );

    const participantNames = conversation.map(
      item => item && item.user && item.user.login
    );
    const contributorNames = contributors.map(item => item && item.login);
    const fullUsers = [
      ...new Set([...participantNames, ...contributorNames]),
    ].filter(item => !!item);

    const issuesActions = [t('Open in Browser', locale)];

    return (
      <ViewContainer>
        {isShowLoadingContainer && (
          <LoadingContainer animating={isShowLoadingContainer} center />
        )}

        {!isPendingIssue &&
          issue && (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              keyboardVerticalOffset={Platform.select({
                ios: 65,
                android: -200,
              })}
            >
              <FlatList
                ref={ref => {
                  this.commentsList = ref;
                }}
                refreshing={isLoadingData}
                onRefresh={this.getIssueInformation}
                contentContainerStyle={{ flexGrow: 1 }}
                removeClippedSubviews={false}
                data={conversation}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                onEndReached={() =>
                  repository &&
                  this.props.getIssueTimeline(
                    repository.full_name,
                    issue.number,
                    { loadMore: true }
                  )
                }
                onEndReachedThreshold={0.5}
                ListFooterComponent={this.renderFooter}
              />

              <CommentInput
                users={fullUsers}
                userHasPushPermission={
                  navigation.state.params.userHasPushPermission
                }
                issueLocked={issue.locked}
                locale={locale}
                onSubmit={this.postComment}
              />
            </KeyboardAvoidingView>
          )}

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={t('Issue Actions', locale)}
          options={[...issuesActions, t('Cancel', locale)]}
          cancelButtonIndex={1}
          onPress={this.handleActionSheetPress}
        />
      </ViewContainer>
    );
  }
}

export const IssueScreen = connect(mapStateToProps, mapDispatchToProps)(Issue);
