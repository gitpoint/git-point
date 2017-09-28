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

import {
  ViewContainer,
  LoadingContainer,
  IssueDescription,
  CommentListItem,
  CommentInput,
} from 'components';
import { v3 } from 'api';
import { translate } from 'utils';
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
    const { state, navigate } = navigation;

    if (state.params.userHasPushPermission) {
      return {
        headerRight: (
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
        ),
      };
    }

    return null;
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
        issueURL: this.getIssueUrlFromNode(node, navigation.state.params),
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

  getIssueUrlFromNode = (node, params) => {
    if (node.attribs['data-id']) {
      return params.issue
        ? `${params.issue.repository_url}/issues/${node.attribs['data-id']}`
        : params.issueURL.replace(/\d+$/, node.attribs['data-id']);
    }

    return node.attribs['data-url'].replace(
      'https://github.com',
      `${v3.root}/repos`
    );
  };

  getIssueInformation = () => {
    const {
      issue,
      navigation,
      repository,
      getIssueComments,
      getRepository,
      getContributors,
      getIssueFromUrl,
    } = this.props;

    const issueParam = navigation.state.params.issue;
    const issueURLParam = navigation.state.params.issueURL;
    const issueCommentsURL = `${navigation.state.params.issueURL}/comments`;

    Promise.all([
      getIssueFromUrl(issueURLParam || issueParam.url),
      getIssueComments(
        issueURLParam ? issueCommentsURL : issueParam.comments_url
      ),
    ]).then(() => {
      if (
        issueParam &&
        repository.full_name !==
          issueParam.repository_url.replace(`${v3.root}/repos/`, '')
      ) {
        Promise.all([
          getRepository(issue.repository_url),
          getContributors(this.getContributorsLink(issue.repository_url)),
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
            </KeyboardAvoidingView>
          )}
      </ViewContainer>
    );
  }
}

export const IssueScreen = connect(mapStateToProps, mapDispatchToProps)(Issue);
