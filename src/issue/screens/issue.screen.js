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

import {
  ViewContainer,
  LoadingContainer,
  IssueDescription,
  CommentListItem,
  CommentInput,
} from 'components';
import { translate } from 'utils';
import { colors } from 'config';
import { getRepository } from 'repository';
import {
  getIssueComments,
  postIssueComment,
  getIssueFromUrl,
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
});

const mapDispatchToProps = dispatch => ({
  getIssueCommentsByDispatch: url => dispatch(getIssueComments(url)),
  postIssueCommentByDispatch: (body, owner, repoName, issueNum) =>
    dispatch(postIssueComment(body, owner, repoName, issueNum)),
  getIssueFromUrlByDispatch: url => dispatch(getIssueFromUrl(url)),
  getRepositoryByDispatch: url => dispatch(getRepository(url)),
});

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
    getIssueCommentsByDispatch: Function,
    getRepositoryByDispatch: Function,
    getContributorsByDispatch: Function,
    postIssueCommentByDispatch: Function,
    getIssueFromUrlByDispatch: Function,
    diff: string,
    issue: Object,
    isMerged: boolean,
    // authUser: Object,
    repository: Object,
    contributors: Array,
    comments: Array,
    isPendingIssue: boolean,
    isPendingDiff: boolean,
    isPendingCheckMerge: boolean,
    isPendingComments: boolean,
    isPendingContributors: boolean,
    // isPostingComment: boolean,
    language: string,
    navigation: Object,
  };

  componentDidMount() {
    this.getIssueInformation();
  }

  onLinkPress = node => {
    const { navigation } = this.props;

    if (node.attribs.class && node.attribs.class.includes('user-mention')) {
      navigation.navigate('Profile', {
        user: { login: node.children[0].data.substring(1) },
      });
    } else if (
      node.attribs.class &&
      node.attribs.class.includes('issue-link')
    ) {
      navigation.navigate('Issue', {
        issueURL: node.attribs['data-url'].replace(
          'github.com',
          'api.github.com/repos'
        ),
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
      issue,
      navigation,
      repository,
      getIssueCommentsByDispatch,
      getRepositoryByDispatch,
      getContributorsByDispatch,
      getIssueFromUrlByDispatch,
    } = this.props;

    const issueParam = navigation.state.params.issue;
    const issueURLParam = navigation.state.params.issueURL;
    const issueCommentsURL = `${navigation.state.params.issueURL}/comments`;

    Promise.all(
      getIssueFromUrlByDispatch(issueURLParam || issueParam.url),
      getIssueCommentsByDispatch(
        issueURLParam ? issueCommentsURL : issueParam.comments_url
      )
    ).then(() => {
      if (
        issueParam &&
        repository.full_name !==
          issueParam.repository_url.replace('https://api.github.com/repos/', '')
      ) {
        Promise.all([
          getRepositoryByDispatch(issue.repository_url),
          getContributorsByDispatch(
            this.getContributorsLink(issue.repository_url)
          ),
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

    this.props.postIssueCommentByDispatch(body, owner, repoName, issueNum);
    Keyboard.dismiss();
    this.commentsList.scrollToEnd();
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
      language,
      navigation,
    } = this.props;

    const isLoadingData = !!(isPendingComments || isPendingIssue);
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
        {isLoadingData &&
          <LoadingContainer
            animating={isPendingComments || isPendingIssue}
            center
          />}

        {!isPendingComments &&
          !isPendingIssue &&
          issue &&
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={'padding'}
            keyboardVerticalOffset={Platform.select({ ios: 65, android: -200 })}
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
              onSubmitEditing={this.postComment}
            />
          </KeyboardAvoidingView>}
      </ViewContainer>
    );
  }
}

export const IssueScreen = connect(mapStateToProps, mapDispatchToProps)(Issue);
