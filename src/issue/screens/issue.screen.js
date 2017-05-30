import React, { Component, PropTypes } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Linking
} from "react-native";
import { Icon } from "react-native-elements";

import {
  ViewContainer,
  LoadingUserListItem,
  IssueDescriptionListItem,
  CommentListItem,
  CommentInput
} from "@components";

import config from "@config";

import { connect } from "react-redux";
import {
  getIssueComments,
  postIssueComment,
  getDiff,
  getIssueFromUrl
} from "../issue.action";

import { getRepository } from "@repository";

const mapStateToProps = state => ({
  authUser: state.auth.user,
  repository: state.repository.repository,
  issue: state.issue.issue,
  diff: state.issue.diff,
  comments: state.issue.comments,
  isPendingDiff: state.issue.isPendingDiff,
  isPendingComments: state.issue.isPendingComments,
  isPostingComment: state.issue.isPostingComment,
  isPendingIssue: state.issue.isPendingIssue
});

const mapDispatchToProps = dispatch => ({
  getIssueComments: url => dispatch(getIssueComments(url)),
  postIssueComment: (body, owner, repoName, issueNum) =>
    dispatch(postIssueComment(body, owner, repoName, issueNum)),
  getDiff: url => dispatch(getDiff(url)),
  getIssueFromUrl: url => dispatch(getIssueFromUrl(url)),
  getRepository: url => dispatch(getRepository(url))
});

class Issue extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, navigate } = navigation;

    if (state.params.userHasPushPermission) {
      return {
        headerRight: (
          <Icon
            name="gear"
            color={config.colors.primarydark}
            type="octicon"
            containerStyle={{ marginRight: 5 }}
            underlayColor={config.colors.transparent}
            onPress={() =>
              navigate("IssueSettings", {
                issue: state.params.issue
              })}
          />
        )
      };
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    const issue = navigation.state.params.issue;

    this.props.getIssueComments(issue);

    if (issue.pull_request) {
      this.props.getDiff(issue.pull_request.diff_url);
    }
  }

  postComment = body => {
    const { repository, navigation } = this.props;

    const repoName = repository.name;
    const owner = repository.owner.login;
    const issueNum = navigation.state.params.issue.number;

    this.props.postIssueComment(body, owner, repoName, issueNum);
    this.refs.commentsListRef.scrollToEnd();
    Keyboard.dismiss();
  };

  renderHeader = () => {
    const { issue, diff, isPendingDiff, navigation } = this.props;

    return (
      <IssueDescriptionListItem
        issue={issue}
        diff={diff}
        isPendingDiff={isPendingDiff}
        onRepositoryPress={url => this.onRepositoryPress(url)}
        onLinkPress={node => this.onLinkPress(node)}
        navigation={navigation}
      />
    );
  };

  renderItem = ({ item }) => (
    <CommentListItem
      comment={item}
      onLinkPress={node => this.onLinkPress(node)}
      navigation={this.props.navigation}
    />
  );

  onLinkPress = node => {
    const { getIssueFromUrl, navigation } = this.props;

    if (node.attribs.class && node.attribs.class.includes("user-mention")) {
      navigation.navigate("Profile", {
        user: { login: node.children[0].data.substring(1) }
      });
    } else if (
      node.attribs.class &&
      node.attribs.class.includes("issue-link")
    ) {
      getIssueFromUrl(
        node.attribs["data-url"].replace("github.com", "api.github.com/repos")
      ).then(() => {
        navigation.navigate("Issue", {
          issue: this.props.issue
        });
      });
    } else {
      Linking.openURL(node.attribs.href);
    }
  };

  onRepositoryPress = url => {
    const { navigation } = this.props;

    navigation.navigate("Repository", {
      repositoryUrl: url
    });
  };

  render() {
    const { issue, comments, isPendingComments, navigation } = this.props;

    return (
      <ViewContainer>
        {isPendingComments &&
          [...Array(issue.comments)].map((item, i) => (
            <LoadingUserListItem key={i} />
          ))}

        {!isPendingComments &&
          issue &&
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={"padding"}
            keyboardVerticalOffset={65}
          >

            <FlatList
              ref="commentsListRef"
              ListHeaderComponent={this.renderHeader}
              removeClippedSubviews={false}
              data={[issue, ...comments]}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />

            <CommentInput
              userHasPushPermission={
                navigation.state.params.userHasPushPermission
              }
              issueLocked={issue.locked}
              onSubmitEditing={this.postComment}
            />
          </KeyboardAvoidingView>}
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

Issue.propTypes = {
  getIssueComments: PropTypes.func,
  getDiff: PropTypes.func,
  getRepository: PropTypes.func,
  postIssueComment: PropTypes.func,
  getIssueFromUrl: PropTypes.func,
  issue: PropTypes.object,
  diff: PropTypes.string,
  authUser: PropTypes.object,
  repository: PropTypes.object,
  comments: PropTypes.array,
  isPendingDiff: PropTypes.bool,
  isPendingComments: PropTypes.bool,
  isPostingComment: PropTypes.bool,
  navigation: PropTypes.object
};

export const IssueScreen = connect(mapStateToProps, mapDispatchToProps)(Issue);
