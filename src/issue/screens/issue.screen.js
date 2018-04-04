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
import { getRepository, getContributors } from 'repository';

const getRepoAndIssueFromUrl = url => {
  const re = /https:\/\/api.github.com\/repos\/(.*)\/issues\/(\d+)$/;
  const matches = re.exec(url);

  return { repoId: matches[1], issueNumber: matches[2] };
};

const mapStateToProps = (state, ownProps) => {
  const {
    entities: { issues, users, issue_comments, issue_events },
    pagination: { ISSUES_GET_COMMENTS, ISSUES_GET_EVENTS },
  } = state;

  const { repoId, issueNumber } = getRepoAndIssueFromUrl(
    ownProps.navigation.state.params.issue.url
  );

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

  const issue = issues[issueFQN] || ownProps.navigation.state.params.issue;

  return {
    issue,
    repoId,
    issueNumber,
    issueCommentsPagination,
    issueComments,
    issueEventsPagination,
    issueEvents,
    users,
    // old

    locale: state.auth.locale,
    authUser: state.auth.user,
    repository: state.repository.repository,
    contributors: state.repository.contributors,
    //    issue: state.issue.issue,
    diff: state.issue.diff,
    pr: state.issue.pr,
    isMerged: state.issue.isMerged,
    comments: state.issue.comments,
    events: state.issue.events,
    isPendingDiff: state.issue.isPendingDiff,
    isPendingCheckMerge: state.issue.isPendingCheckMerge,
    isPostingComment: state.issue.isPostingComment,
    isPendingContributors: state.repository.isPendingContributors,
    isDeletingComment: state.issue.isDeletingComment,
  };
};

const mapDispatchToProps = /*dispatch =>*/ {
  /*...bindActionCreators(
      {
        getRepository,
        getContributors,
        postIssueComment,
        deleteIssueComment,
      },
      dispatch
    ),*/
  createComment: RestClient.issues.createComment,
  editComment: RestClient.issues.editComment,
  deleteComment: RestClient.issues.deleteComment,
  getIssue: RestClient.issues.get,
  getIssueComments: RestClient.issues.getComments,
  getIssueEvents: RestClient.issues.getEvents,
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
    users: Array,
    // API
    getIssue: Function,
    getIssueEvents: Function,
    getIssueComments: Function,
    createComment: Function,
    deleteComment: Function,
    editComment: Function,

    // old
    getRepository: Function,
    getContributors: Function,
    getIssueFromUrl: Function,

    diff: string,
    issue: Object,
    pr: Object,
    isMerged: boolean,
    authUser: Object,
    repository: Object,
    contributors: Array,
    isPendingDiff: boolean,
    isPendingCheckMerge: boolean,
    isDeletingComment: boolean,
    isPendingContributors: boolean,
    // isPostingComment: boolean,
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
      navigation,
      repository,
      /* getRepository,
      getContributors,
      getIssueFromUrl,*/
      getIssue,
      getIssueEvents,
      getIssueComments,
    } = this.props;

    getIssue(repoId, issueNumber);
    getIssueEvents(repoId, issueNumber);
    getIssueComments(repoId, issueNumber);
    /*
    const params = navigation.state.params;
    const issueURL = params.issueURL || params.issue.url;
    const issueRepository = issueURL
      .replace(`${v3.root}/repos/`, '')
      .replace(/([^/]+\/[^/]+)\/issues\/\d+$/, '$1');

        if (repository.full_name !== issueRepository) {
          return Promise.all([
            getRepository(issue.repository_url),
            getContributors(this.getContributorsLink(issue.repository_url)),
          ]);
        }

        return [];
      })
      .then(() => {
        const { issue, repository } = this.props;

        this.setNavigationParams();

      });*/
  };

  getContributorsLink = repository => `${repository}/contributors`;

  setNavigationParams = () => {
    const { navigation, locale, repository } = this.props;

    navigation.setParams({
      locale,
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
    } = this.props;

    getIssue(repoId, issueNumber, { forceRefresh });
    getIssueEvents(repoId, issueNumber, { forceRefresh });
    getIssueComments(repoId, issueNumber, { forceRefresh });
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
      pr,
      diff,
      isMerged,
      isPendingDiff,
      isPendingCheckMerge,
      locale,
      navigation,
    } = this.props;

    return (
      <IssueDescription
        issue={issue}
        diff={diff}
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

      issueEvents,
      issueEventsPagination,
      issueComments,
      issueCommentsPagination,

      getIssueComments,
      getIssueEvents,

      // Old
      issue,
      contributors,

      isPendingContributors,
      isDeletingComment,
      locale,
      navigation,
    } = this.props;

    const isPendingEvents =
      issueEvents.length === 0 && issueEventsPagination.isFetching;

    const isPendingComments =
      issueComments.length === 0 && issueCommentsPagination.isFetching;

    const isPendingIssue = issue.comment_html !== undefined;

    const isLoadingData = !!(
      isPendingComments ||
      isPendingIssue ||
      isDeletingComment
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

        {!isPendingComments &&
          !isPendingIssue &&
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
