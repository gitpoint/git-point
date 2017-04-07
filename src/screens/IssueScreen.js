import React, {Component, PropTypes} from 'react';
import {FlatList, KeyboardAvoidingView} from 'react-native';

import ViewContainer from '../components/ViewContainer';
import LoadingUserListItem from '../components/LoadingUserListItem';
import CommentListItem from '../components/CommentListItem';
import CommentInput from '../components/CommentInput';

import {connect} from 'react-redux';
import {getHydratedComments, postIssueComment} from '../actions/issue';

const mapStateToProps = state => ({
  authUser: state.authUser.user.login,
  repository: state.repository.repository,
  comments: state.issue.comments,
  isPendingComments: state.issue.isPendingComments,
  isPendingHydratedComments: state.issue.isPendingHydratedComments,
  isPostingComment: state.issue.isPostingComment,
});

const mapDispatchToProps = dispatch => ({
  getHydratedComments: url => dispatch(getHydratedComments(url)),
  postIssueComment: (body, owner, repoName, issueNum) => dispatch(postIssueComment(body, owner, repoName, issueNum)),
});

class Issue extends Component {
  componentDidMount() {
    const issue = this.props.navigation.state.params.issue;

    this.props.getHydratedComments(issue.comments_url);
  }

  postComment = (body) => {
    const {repository, navigation} = this.props;

    const repoName = repository.name;
    const owner = repository.owner.login;
    const issueNum = navigation.state.params.issue.number;

    this.props.postIssueComment(body, owner, repoName, issueNum);
  }

  renderItem = ({item}) => (
    <CommentListItem comment={item} authUser={this.props.authUser} navigation={this.props.navigation} />
  );

  render() {
    const issue = this.props.navigation.state.params.issue;
    const {comments, isPendingComments} = this.props;

    return (
      <ViewContainer>
        {isPendingComments &&
          [...Array(issue.comments)].map((item, i) => (
            <LoadingUserListItem key={i} />
          ))}

          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={'padding'}
            keyboardVerticalOffset={65}
          >
            <FlatList
              removeClippedSubviews={false}
              data={[issue, ...comments]}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />

            <CommentInput onSubmitEditing={this.postComment}/>
          </KeyboardAvoidingView>
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

Issue.propTypes = {
  getHydratedComments: PropTypes.func,
  postIssueComment: PropTypes.func,
  issue: PropTypes.object,
  authUser: PropTypes.string,
  repository: PropTypes.object,
  comments: PropTypes.array,
  hydratedComments: PropTypes.array,
  isPendingComments: PropTypes.bool,
  isPendingHydratedComments: PropTypes.bool,
  isPostingComment: PropTypes.bool,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Issue);
