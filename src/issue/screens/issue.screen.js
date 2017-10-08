/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  IssueDescription,
  CommentListItem,
  CommentInput,
} from 'components';
import { v3 } from 'api';
import { translate, openURLInView } from 'utils';
import { colors } from 'config';
import { getRepository, getContributors } from 'repository';
import {
  getIssueComments,
  postIssueComment,
  getIssueFromUrl,
  deleteIssueComment,
} from '../issue.action';

const mapStateToProps = state => ({
  language: state.auth.language,
  authUser: state.auth.user,
  repository: state.repository.repository,
  contributors: state.repository.contributors,
  issue: state.issue.issue,
  diff: state.issue.diff,
  pr: state.issue.pr,
  isMerged: state.issue.isMerged,
  comments: state.issue.comments,
  isPendingDiff: state.issue.isPendingDiff,
  isPendingCheckMerge: state.issue.isPendingCheckMerge,
  isPendingComments: state.issue.isPendingComments,
  isPostingComment: state.issue.isPostingComment,
  isPendingContributors: state.repository.isPendingContributors,
  isDeletingComment: state.issue.isDeletingComment,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getIssueComments,
      getRepository,
      getContributors,
      postIssueComment,
      getIssueFromUrl,
      deleteIssueComment,
    },
    dispatch
  );

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
                title: translate('issue.settings.title', state.params.language),
                issue: state.params.issue,
              })}
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
    getIssueComments: Function,
    getRepository: Function,
    getContributors: Function,
    postIssueComment: Function,
    getIssueFromUrl: Function,
    deleteIssueComment: Function,
    diff: string,
    issue: Object,
    pr: Object,
    isMerged: boolean,
    authUser: Object,
    repository: Object,
    contributors: Array,
    comments: Array,
    isPendingIssue: boolean,
    isPendingDiff: boolean,
    isPendingCheckMerge: boolean,
    isPendingComments: boolean,
    isDeletingComment: boolean,
    isPendingContributors: boolean,
    // isPostingComment: boolean,
    language: string,
    navigation: Object,
  };

  componentDidMount() {
    this.getIssueInformation();

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
      navigation,
      repository,
      getIssueComments,
      getRepository,
      getContributors,
      getIssueFromUrl,
    } = this.props;

    const params = navigation.state.params;
    const issueURL = params.issueURL || params.issue.url;
    let issueRepository;

    if (params.issueURL) {
      issueRepository = issueURL
        .replace(`${v3.root}/repos/`, '')
        .replace(/([^/]+\/[^/]+)\/issues\/\d+$/, '$1');
    } else if (params.issue) {
      issueRepository = params.issue.repository.nameWithOwner;
    }
    const repositoryUrl = `https://api.github.com/repos/${issueRepository}`;

    Promise.all([
      getIssueFromUrl(issueURL),
      getIssueComments(`${issueURL}/comments`),
    ]).then(() => {
      if (repository.full_name !== issueRepository) {
        Promise.all([
          getRepository(repositoryUrl),
          getContributors(this.getContributorsLink(repositoryUrl)),
        ]).then(() => {
          this.setNavigationParams();
        });
      } else {
        this.setNavigationParams();
      }
    });
  };

  getContributorsLink = repository => `${repository}/contributors`;

  setNavigationParams = () => {
    const { navigation, language, repository } = this.props;

    navigation.setParams({
      language,
      userHasPushPermission:
        repository.permissions.admin || repository.permissions.push,
    });
  };

  showActionSheet = () => this.ActionSheet.show();

  handleActionSheetPress = index => {
    if (index === 0) {
      openURLInView(this.props.navigation.state.params.issue.html_url);
    }
  };

  postComment = body => {
    const { repository, navigation } = this.props;

    const repoName = repository.name;
    const owner = repository.owner.login;
    const issueNum = navigation.state.params.issue.number;

    this.props.postIssueComment(body, owner, repoName, issueNum);
    Keyboard.dismiss();
    this.commentsList.scrollToEnd();
  };

  deleteComment = comment => {
    const { repository } = this.props;
    const repoName = repository.name;
    const owner = repository.owner.login;

    this.props.deleteIssueComment(comment.id, owner, repoName);
  };

  editComment = comment => {
    const { state, navigate } = this.props.navigation;
    const { repository } = this.props;

    navigate('EditIssueComment', {
      title: translate('issue.comment.editCommentTitle', state.params.language),
      comment,
      repository,
    });
  };

  keyExtractor = item => {
    return item.id;
  };

  renderHeader = () => {
    const {
      issue,
      pr,
      diff,
      isMerged,
      isPendingDiff,
      isPendingCheckMerge,
      language,
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
        language={language}
        navigation={navigation}
      />
    );
  };

  renderItem = ({ item }) => {
    const { language } = this.props;

    return (
      <CommentListItem
        comment={item}
        onLinkPress={node => this.onLinkPress(node)}
        onDeletePress={this.deleteComment}
        onEditPress={this.editComment}
        language={language}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    const {
      issue,
      comments,
      contributors,
      isPendingComments,
      isPendingContributors,
      isPendingIssue,
      isDeletingComment,
      language,
      navigation,
    } = this.props;

    const isLoadingData = !!(
      isPendingComments ||
      isPendingIssue ||
      isDeletingComment
    );
    const isShowLoadingContainer = isPendingComments || isPendingIssue;
    const fullComments = !isPendingComments ? [issue, ...comments] : [];

    const participantNames = !isPendingComments
      ? fullComments.map(item => item && item.user && item.user.login)
      : [];
    const contributorNames = !isPendingContributors
      ? contributors.map(item => item && item.login)
      : [];
    const fullUsers = [
      ...new Set([...participantNames, ...contributorNames]),
    ].filter(item => !!item);

    const issuesActions = [translate('common.openInBrowser', language)];

    return (
      <ViewContainer>
        {isShowLoadingContainer &&
          <LoadingContainer animating={isShowLoadingContainer} center />}

        {!isPendingComments &&
          !isPendingIssue &&
          issue &&
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
              onRefresh={this.getIssueInformation}
              contentContainerStyle={{ flexGrow: 1 }}
              ListHeaderComponent={this.renderHeader}
              removeClippedSubviews={false}
              data={fullComments}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />

            <CommentInput
              users={fullUsers}
              userHasPushPermission={
                navigation.state.params.userHasPushPermission
              }
              issueLocked={issue.locked}
              language={language}
              onSubmit={this.postComment}
            />
          </KeyboardAvoidingView>}

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={translate('issue.main.issueActions', language)}
          options={[...issuesActions, translate('common.cancel', language)]}
          cancelButtonIndex={1}
          onPress={this.handleActionSheetPress}
        />
      </ViewContainer>
    );
  }
}

export const IssueScreen = connect(mapStateToProps, mapDispatchToProps)(Issue);
