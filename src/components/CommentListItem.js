import React, {Component, PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActionSheetIOS,
  TouchableOpacity,
} from 'react-native';

import Reaction from './Reaction';
import AddReaction from './AddReaction';

import colors from '../config/colors';

// import HTMLView from 'react-native-htmlview';
const reactionButtons = ['👍', '👎', '😄', '🎉', '😕', '❤️', 'Cancel'];
const reactionTypes = ['+1', '-1', 'laugh', 'hooray', 'confused', 'heart'];

class CommentListItem extends Component {
  state = {
    addReactionClicked: 'none',
  };

  renderReaction = (type, comment) => {
    let count;
    let reacted = null;

    if (comment.completeReactions) {
      count = comment.completeReactions.filter(reaction => reaction.content === type).length;
      reacted = comment.completeReactions.some(reaction => reaction.content === type && reaction.user.login === this.props.authUser);
    } else {
      count = comment.reactions[type];
    }

    return count > 0 ? <Reaction type={type} count={count} active={reacted} createdReactionID={reacted ? comment.completeReactions.find(reaction => reaction.content === type && reaction.user.login === this.props.authUser).id : null} commentID={comment.id} triggerReaction={this.props.triggerReaction} /> : null;
  }

  render() {
    const {comment, navigation} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{uri: comment.user.avatar_url}}
          />

          <Text style={styles.titleSubtitleContainer}>
            <Text
              style={styles.linkDescription}
              onPress={() => navigation.navigate('Profile', {
                user: comment.user,
              })}
            >
              {comment.user.login}{'  '}
            </Text>
          </Text>

          <View style={styles.dateContainer}>
            <Text style={styles.date}>2h</Text>
          </View>
        </View>

        <View style={styles.commentContainer}>
          {comment.body !== '' &&
            <Text style={styles.commentBody}>
              {comment.body}
            </Text>}

          <View
            style={[
              styles.reactionsBar,
              comment.body.substr(comment.body.length - 1) !== '\n' &&
                styles.reactionsBarMargin,
            ]}
          >

            {reactionTypes.map((reaction) =>
              this.renderReaction(reaction, comment)
            )}

            <TouchableOpacity onPress={this.showActionSheet}>
              <AddReaction />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }

  showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Add Reaction',
        options: reactionButtons,
        cancelButtonIndex: 6,
      },
      buttonIndex => {
        this.setState({clicked: reactionButtons[buttonIndex]});
      }
    );
  };
}

CommentListItem.propTypes = {
  authUser: PropTypes.string,
  comment: PropTypes.object,
  triggerReaction: PropTypes.func,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.greyLight,
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  titleSubtitleContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    color: colors.primaryDark,
    fontFamily: 'AvenirNext-Regular',
  },
  dateContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  linkDescription: {
    fontFamily: 'AvenirNext-DemiBold',
  },
  date: {
    color: colors.greyDark,
  },
  commentContainer: {
    marginTop: 4,
    marginLeft: 54,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  commentBody: {
    paddingRight: 10,
    color: colors.black,
    fontSize: 14,
    fontFamily: 'AvenirNext-Regular',
  },
  reactionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reactionsBarMargin: {
    marginTop: 10,
  },
});

// const commentStyles = StyleSheet.create({
//   p: {
//     color: colors.primaryDark,
//     fontFamily: 'AvenirNext-Regular',
//   },
//   a: {
//     fontFamily: 'AvenirNext-DemiBold',
//   },
//   h2: {
//     color: colors.greyLight,
//     fontFamily: 'AvenirNext-DemiBold',
//   }
// });

export default CommentListItem;

// <HTMLView
//   value={comment.body_html.replace(new RegExp('<blockquote>', 'g'), '<h2>')
//     .replace(new RegExp('</blockquote>', 'g'), '</h2>')}
//   stylesheet={commentStyles}
// />
