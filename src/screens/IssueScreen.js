import React, {Component, PropTypes} from 'react';
import {FlatList, KeyboardAvoidingView} from 'react-native';
import {Icon} from 'react-native-elements';

import ViewContainer from '../components/ViewContainer';
import LoadingUserListItem from '../components/LoadingUserListItem';
import IssueDescriptionListItem from '../components/IssueDescriptionListItem';
import CommentListItem from '../components/CommentListItem';
import CommentInput from '../components/CommentInput';

import colors from '../config/colors';

import {connect} from 'react-redux';
import {
  getHydratedComments,
  postIssueComment,
  createIssueReaction,
  createCommentReaction,
  deleteIssueReaction,
  deleteCommentReaction,
  getDiff
} from '../actions/issue';

const mapStateToProps = state => ({
  authUser: state.authUser.user,
  repository: state.repository.repository,
  issue: state.issue.issue,
  diff: state.issue.diff,
  comments: state.issue.comments,
  isPendingDiff: state.issue.isPendingDiff,
  isPendingComments: state.issue.isPendingComments,
  isPendingHydratedComments: state.issue.isPendingHydratedComments,
  isPostingComment: state.issue.isPostingComment,
  isCreatingReaction: state.issue.isCreatingReaction,
  isCreatingReactionForID: state.issue.isCreatingReactionForID,
});

const mapDispatchToProps = dispatch => ({
  getHydratedComments: url => dispatch(getHydratedComments(url)),
  postIssueComment: (body, owner, repoName, issueNum) =>
    dispatch(postIssueComment(body, owner, repoName, issueNum)),
  createIssueReaction: (type, issue, commentID, owner, repoName) =>
    dispatch(createIssueReaction(type, issue, commentID, owner, repoName)),
  createCommentReaction: (type, commentID, owner, repoName) =>
    dispatch(createCommentReaction(type, commentID, owner, repoName)),
  deleteIssueReaction: reactionID => dispatch(deleteIssueReaction(reactionID)),
  deleteCommentReaction: (commentID, reactionID) =>
    dispatch(deleteCommentReaction(commentID, reactionID)),
  getDiff: (url) =>
    dispatch(getDiff(url)),
});

class Issue extends Component {
  static navigationOptions = ({ navigation }) => {
    const {state, navigate} = navigation;

    if (state.params.userHasPushPermission) {
      return {
        headerRight: (
          <Icon
            name="gear"
            color={colors.primarydark}
            type="octicon"
            containerStyle={{marginRight: 5}}
            underlayColor={colors.transparent}
            onPress={() => navigate('IssueSettings', {
              issue: state.params.issue,
            })}
          />
        ),
      };
    }
  };

  componentDidMount() {
    const issue = this.props.navigation.state.params.issue;
    this.props.getHydratedComments(issue);

    if (issue.pull_request) {
      this.props.getDiff(issue.pull_request.diff_url);
    }
  }

  postComment = body => {
    const {repository, navigation} = this.props;

    const repoName = repository.name;
    const owner = repository.owner.login;
    const issueNum = navigation.state.params.issue.number;

    this.props.postIssueComment(body, owner, repoName, issueNum);
  };

  triggerReaction = (
    type,
    commentType,
    commentID,
    active,
    createdReactionID
  ) => {
    const {repository, navigation} = this.props;
    const repoName = repository.name;
    const owner = repository.owner.login;
    const issueNum = navigation.state.params.issue.number;

    if (active) {
      commentType === 'issue'
        ? this.props.deleteIssueReaction(createdReactionID)
        : this.props.deleteCommentReaction(commentID, createdReactionID);
    } else {
      commentType === 'issue'
        ? this.props.createIssueReaction(
            type,
            issueNum,
            commentID,
            owner,
            repoName
          )
        : this.props.createCommentReaction(type, commentID, owner, repoName);
    }
  };

  addAdditionalReaction = (type, commentType, commentID, reacted) => {
    const {repository, navigation} = this.props;
    const repoName = repository.name;
    const owner = repository.owner.login;
    const issueNum = navigation.state.params.issue.number;

    if (!reacted) {
      commentType === 'issue'
        ? this.props.createIssueReaction(
            type,
            issueNum,
            commentID,
            owner,
            repoName
          )
        : this.props.createCommentReaction(type, commentID, owner, repoName);
    }
  };

  renderItem = ({item}) => (
    <CommentListItem
      issue={this.props.issue}
      comment={item}
      commentType={item.issue_url ? 'comment' : 'issue'}
      authUser={this.props.authUser.login}
      isCreatingReaction={
        this.props.isCreatingReaction &&
          this.props.isCreatingReactionForID === item.id
      }
      triggerReaction={this.triggerReaction}
      addAdditionalReaction={this.addAdditionalReaction}
      navigation={this.props.navigation}
    />
  );

  render() {
    const {issue, comments, isPendingDiff, isPendingComments, navigation} = this.props;

    return (
      <ViewContainer>
        {isPendingComments &&
          [...Array(issue.comments)].map((item, i) => (
            <LoadingUserListItem key={i} />
          ))}

        {!isPendingComments && issue &&
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={'padding'}
            keyboardVerticalOffset={65}
          >
            <FlatList
              ListHeaderComponent={(): React$Element<*> => (
                <IssueDescriptionListItem
                  issue={issue}
                  isPendingDiff={isPendingDiff}
                  navigation={navigation}
                />
              )}
              removeClippedSubviews={false}
              data={[issue, ...comments]}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />

            <CommentInput userHasPushPermission={navigation.state.params.userHasPushPermission} issueLocked={issue.locked} onSubmitEditing={this.postComment} />
          </KeyboardAvoidingView>}
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

Issue.propTypes = {
  getHydratedComments: PropTypes.func,
  getDiff: PropTypes.func,
  postIssueComment: PropTypes.func,
  createIssueReaction: PropTypes.func,
  createCommentReaction: PropTypes.func,
  deleteIssueReaction: PropTypes.func,
  deleteCommentReaction: PropTypes.func,
  issue: PropTypes.object,
  authUser: PropTypes.object,
  repository: PropTypes.object,
  comments: PropTypes.array,
  hydratedComments: PropTypes.array,
  isPendingDiff: PropTypes.bool,
  isPendingComments: PropTypes.bool,
  isPendingHydratedComments: PropTypes.bool,
  isPostingComment: PropTypes.bool,
  isCreatingReaction: PropTypes.bool,
  isCreatingReactionForID: PropTypes.number,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Issue);
