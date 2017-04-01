import React, {Component, PropTypes} from 'react';
import {FlatList} from 'react-native';

import ViewContainer from '../components/ViewContainer';
import LoadingUserListItem from '../components/LoadingUserListItem';
import CommentListItem from '../components/CommentListItem';

import {connect} from 'react-redux';
import {getIssueComments} from '../actions/issue';

const mapStateToProps = state => ({
  comments: state.issue.comments,
  isPendingComments: state.issue.isPendingComments,
});

const mapDispatchToProps = dispatch => ({
  getIssueComments: url => dispatch(getIssueComments(url)),
});

class Issue extends Component {
  componentDidMount() {
    const issue = this.props.navigation.state.params.issue;

    this.props.getIssueComments(issue.comments_url);
  }

  renderItem = ({item}) => (
    <CommentListItem comment={item} naigation={this.props.navigation} />
  );

  render() {
    const issue = this.props.navigation.state.params.issue;
    const {comments, isPendingComments, navigation} = this.props;

    return (
      <ViewContainer>
        <CommentListItem comment={issue} navigation={navigation} />

        {isPendingComments &&
          [...Array(issue.comments)].map((item, i) => (
            <LoadingUserListItem key={i} />
          ))}

        <FlatList
          removeClippedSubviews={false}
          data={comments}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

Issue.propTypes = {
  getIssueComments: PropTypes.func,
  issue: PropTypes.object,
  comments: PropTypes.array,
  isPendingComments: PropTypes.bool,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Issue);
