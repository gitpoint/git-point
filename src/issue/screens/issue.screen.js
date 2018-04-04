/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  View,
  ActivityIndicator,
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
  IssueDescription,
  CommentListItem,
  CommentInput,
  IssueEventListItem,
} from 'components';
import { RestClient, v3 } from 'api';
import { translate, formatEventsToRender, openURLInView } from 'utils';
import { colors } from 'config';

const getRepoAndIssueFromUrl = url => {
  const re = /https:\/\/api.github.com\/repos\/(.*)\/issues\/(\d+)$/;
  const matches = re.exec(url);

  return { repoId: matches[1], issueNumber: matches[2] };
};

const mapStateToProps = (state, ownProps) => {
  const {
    entities: {
      issues,
      users,
      repos,
      issue_comments,
      issue_events,
      issue_labels,
    },
    pagination: { ISSUES_GET_COMMENTS, ISSUES_GET_EVENTS, REPOS_GET_LABELS },
  } = state;

  const { repoId, issueNumber } = getRepoAndIssueFromUrl(
    ownProps.navigation.state.params.issue.url
  );

  const repository = repos[repoId];

  const issueFQN = `${repoId}-${issueNumber}`;

  const issueCommentsPagination = ISSUES_GET_COMMENTS[issueFQN] || {
    ids: [],
    isFetching: true,
  };
  const issueComments = issueCommentsPagination.ids.map(
    id => issue_comments[id]
  );

  const issueEventsPagination = ISSUES_GET_EVENTS[issueFQN] || {
    ids: [],
    isFetching: true,
  };
  const issueEvents = issueEventsPagination.ids.map(id => issue_events[id]);

  const repoLabelsPagination = REPOS_GET_LABELS[repoId] || {
    ids: [],
    isFetching: true,
  };
  const repoLabels = repoLabelsPagination.ids.reduce((map, id) => {
    /* eslint-disable no-param-reassign */
    map[id] = issue_labels[id];

    return map;
  }, {});

  const issue = issues[issueFQN] || ownProps.navigation.state.params.issue;

  return {
    issue,
    repoId,
    repository,
    issueNumber,
    issueCommentsPagination,
    issueComments,
    issueEventsPagination,
    issueEvents,
    repoLabelsPagination,
    repoLabels,
    allLabels: issue_labels,
    users,
    // old

    locale: state.auth.locale,
    authUser: state.auth.user,
    contributors: state.repository.contributors,
    //    issue: state.issue.issue,
    diff: state.issue.diff,
    pr: state.issue.pr,
    isMerged: state.issue.isMerged,
    isPendingDiff: state.issue.isPendingDiff,
    isPendingCheckMerge: state.issue.isPendingCheckMerge,
    isPendingContributors: state.repository.isPendingContributors,
  };
};

const mapDispatchToProps = {
  getRepository: RestClient.repos.get,
  getContributors: RestClient.repos.getContributors,
  createComment: RestClient.issues.createComment,
  editComment: RestClient.issues.editComment,
  deleteComment: RestClient.issues.deleteComment,
  getIssue: RestClient.issues.get,
  getIssueComments: RestClient.issues.getComments,
  getIssueEvents: RestClient.issues.getEvents,
  getRepoLabels: RestClient.repos.getLabels,
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
                title: translate('issue.settings.title', state.params.locale),
                issue: state.params.issue,
                repoId: state.params.repoId,
                issueNumber: state.params.issueNumber,
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
    repoId: String,
    issue: Object,
    issueNumber: Number,
    issueCommentsPagination: Object,
    issueComments: Array,
    issueEventsPagination: Object,
    issueEvents: Array,
    repoLabelsPagination: Object,
    repoLabels: Object,
    users: Array,
    repository: Object,

    // API
    getIssue: Function,
    getIssueEvents: Function,
    getIssueComments: Function,
    getRepoLabels: Function,
    createComment: Function,
    deleteComment: Function,
    getRepository: Function,
    getContributors: Function,

    // old

    diff: string,
    issue: Object,
    pr: Object,
    isMerged: boolean,
    authUser: Object,
    contributors: Array,
    isPendingDiff: boolean,
    isPendingCheckMerge: boolean,
    isPendingContributors: boolean,
    locale: string,
    navigation: Object,
  };

  state: {
    updatingCommentId: number,
  };

  constructor() {
    super();

    this.state = {
      updatingCommentId: null,
    };
  }

  componentDidMount() {
    this.loadIssueInformation();

    this.props.navigation.setParams({ showActionSheet: this.showActionSheet });
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
      repositoryUrl: url,
    });
  };

  getIssueInformation = () => {
    const {
      repoId,
      issueNumber,
      getRepository,
      getContributors,
      getIssue,
      getIssueEvents,
      getIssueComments,
    } = this.props;

    getIssue(repoId, issueNumber).then(() => {
      this.setNavigationParams();
    });
    getIssueEvents(repoId, issueNumber);
    getIssueComments(repoId, issueNumber);

    Promise.all([getRepository(repoId), getContributors(repoId)]).then(() => {
      this.setNavigationParams();
    });
  };

  setNavigationParams = () => {
    const {
      navigation,
      locale,
      issue,
      repository,
      repoId,
      issueNumber,
    } = this.props;

    navigation.setParams({
      repoId,
      issueNumber,
      locale,
      issue,
      userHasPushPermission:
        repository.permissions.admin || repository.permissions.push,
    });
  };

  loadIssueInformation = (forceRefresh = false) => {
    const {
      repoId,
      issueNumber,
      getIssue,
      getIssueEvents,
      getIssueComments,
      getRepoLabels,
      getRepository,
      getContributors,
    } = this.props;

    getIssue(repoId, issueNumber, { forceRefresh });
    getIssueEvents(repoId, issueNumber, { forceRefresh });
    getIssueComments(repoId, issueNumber, { forceRefresh });
    getRepoLabels(repoId, { forceRefresh });

    Promise.all([getRepository(repoId), getContributors(repoId)]).then(() => {
      this.setNavigationParams();
    });
  };

  showActionSheet = () => this.ActionSheet.show();

  handleActionSheetPress = index => {
    if (index === 0) {
      openURLInView(this.props.issue.html_url);
    }
  };

  postComment = body => {
    const { repoId, issueNumber, createComment } = this.props;

    createComment(repoId, issueNumber, body).then(() => {
      this.commentsList.scrollToEnd();
    });
    Keyboard.dismiss();
  };

  deleteComment = comment => {
    const { repoId, issueNumber, deleteComment } = this.props;

    this.setState({ updatingCommentId: comment.id });
    deleteComment(repoId, issueNumber, comment.id).then(() =>
      this.setState({ updatingCommentId: null })
    );
  };

  editComment = comment => {
    const { state, navigate } = this.props.navigation;
    const { repoId, issueNumber } = this.props;

    navigate('EditIssueComment', {
      title: translate('issue.comment.editCommentTitle', state.params.locale),
      repoId,
      issueNumber,
      comment,
    });
  };

  keyExtractor = (item, index) => {
    return index;
  };

  renderHeader = () => {
    const {
      issue,
      repoLabels,
      pr,
      diff,
      isMerged,
      isPendingDiff,
      isPendingCheckMerge,
      locale,
      navigation,
      users,
    } = this.props;

    return (
      <IssueDescription
        issue={issue}
        diff={diff}
        assignees={issue.assignees.map(login => users[login])}
        labels={issue.labels.map(labelId => repoLabels[labelId])}
        isMergeable={pr.mergeable}
        isMerged={isMerged}
        isPendingDiff={isPendingDiff}
        isPendingCheckMerge={isPendingCheckMerge}
        onRepositoryPress={url => this.onRepositoryPress(url)}
        onLinkPress={node => this.onLinkPress(node)}
        userHasPushPermission={navigation.state.params.userHasPushPermission}
        locale={locale}
        navigation={navigation}
      />
    );
  };

  renderItem = ({ item }) => {
    if (item.header) {
      return this.renderHeader();
    }

    const { repository, locale, navigation, users } = this.props;

    if (item.event) {
      return (
        <IssueEventListItem
          repository={repository}
          event={item}
          actor={users[item.actor]}
          navigation={navigation}
        />
      );
    }

    return (
      <CommentListItem
        comment={item}
        user={users[item.user]}
        onLinkPress={node => this.onLinkPress(node)}
        onDeletePress={this.deleteComment}
        onEditPress={this.editComment}
        locale={locale}
        updating={this.state.updatingCommentId === item.id}
        navigation={navigation}
      />
    );
  };

  renderFooter = () => {
    if (
      this.props.issueEventsPagination.nextPageUrl === null &&
      this.props.issueCommentsPagination.nextPageUrl === null
    ) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    const {
      repoId,
      issueNumber,

      issue,

      issueEvents,
      issueEventsPagination,
      issueComments,
      issueCommentsPagination,
      repoLabels,
      repoLabelsPagination,

      getIssueComments,
      getIssueEvents,

      // Old
      contributors,

      isPendingContributors,
      locale,
      navigation,
    } = this.props;

    const isPendingEvents =
      issueEvents.length === 0 && issueEventsPagination.isFetching;

    const isPendingComments =
      issueComments.length === 0 && issueCommentsPagination.isFetching;

    const isPendingLabels =
      Object.values(repoLabels).length === 0 && repoLabelsPagination.isFetching;

    const isPendingIssue = issue.comment_html !== undefined;

    const isLoadingData = !!(
      isPendingComments ||
      isPendingIssue ||
      isPendingLabels
    );
    const isShowLoadingContainer =
      isPendingComments || isPendingIssue || isPendingEvents;

    const header = { header: true, created_at: '' };
    const events = formatEventsToRender(issueEvents);

    const conversation = isPendingComments
      ? [header]
      : [header, issue, ...issueComments, ...events].sort(compareCreatedAt);

    const participantNames = isPendingComments
      ? []
      : conversation.map(item => item && item.user && item.user.login);

    const contributorNames = isPendingContributors
      ? []
      : contributors.map(item => item && item.login);

    const fullUsers = [
      ...new Set([...participantNames, ...contributorNames]),
    ].filter(item => !!item);

    const issuesActions = [translate('common.openInBrowser', locale)];

    return (
      <ViewContainer>
        {isShowLoadingContainer && (
          <LoadingContainer animating={isShowLoadingContainer} center />
        )}

        {!isLoadingData &&
          issue && (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={'padding'}
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
                onRefresh={() => this.loadIssueInformation(true)}
                contentContainerStyle={{ flexGrow: 1 }}
                removeClippedSubviews={false}
                data={conversation}
                onEndReached={() =>
                  getIssueComments(repoId, issueNumber, {
                    loadMore: true,
                  }).then(() =>
                    getIssueEvents(repoId, issueNumber, { loadMore: true })
                  )
                }
                onEndReachedThreshold={0.5}
                ListFooterComponent={this.renderFooter}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
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
          title={translate('issue.main.issueActions', locale)}
          options={[...issuesActions, translate('common.cancel', locale)]}
          cancelButtonIndex={1}
          onPress={this.handleActionSheetPress}
        />
      </ViewContainer>
    );
  }
}

export const IssueScreen = connect(mapStateToProps, mapDispatchToProps)(Issue);
