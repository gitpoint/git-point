import React, { Component, PropTypes } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActionSheetIOS,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import FastImage from "react-native-fast-image";

import Reaction from "./Reaction";
import AddReaction from "./AddReaction";

import colors from "../config/colors";
import moment from "moment";

import HTMLView from "react-native-htmlview";
const reactionButtons = ["👍", "👎", "😄", "🎉", "😕", "❤️", "Cancel"];
const reactionTypes = ["+1", "-1", "laugh", "hooray", "confused", "heart"];

class CommentListItem extends Component {
  renderReaction = (type, comment, index) => {
    let count;
    let reacted = null;

    if (comment.completeReactions) {
      count = comment.completeReactions.filter(
        reaction => reaction.content === type
      ).length;
      reacted = comment.completeReactions.some(
        reaction =>
          reaction.content === type &&
          reaction.user.login === this.props.authUser
      );
    } else if (comment.reactions) {
      count = comment.reactions[type];
    }

    return count > 0
      ? <Reaction
          key={index}
          commentType={this.props.commentType}
          type={type}
          count={count}
          active={reacted}
          locked={this.props.issue.locked}
          createdReactionID={
            reacted
              ? comment.completeReactions.find(
                  reaction =>
                    reaction.content === type &&
                    reaction.user.login === this.props.authUser
                ).id
              : null
          }
          commentID={comment.id}
          triggerReaction={this.props.triggerReaction}
        />
      : null;
  };

  render() {
    const { issue, comment, isCreatingReaction, navigation } = this.props;
    const commentBodyAdjusted = () => (
      // comment.body_html.replace(new RegExp(/<img[^>]*>/, 'g'), 'Image').replace(new RegExp(/<blockquote>[\n]*?<p>/, 'g'), '<span>').replace(new RegExp(/<\/p>[\n]*?<\/blockquote>/, 'g'), '</span>')
      comment.body_html.replace(new RegExp(/<img[^>]*>/, 'g'), 'Image').replace(new RegExp(/<ul>[\n]*?<li>/, 'g'), '<ul><li>').replace(new RegExp(/<\/li>[\n]*?<\/ul>/, 'g'), '</li></ul>').replace(new RegExp(/<ol>[\n]*?<li>/, 'g'), '<ol><li>').replace(new RegExp(/<\/li>[\n]*?<\/ol>/, 'g'), '</li></ol>').replace(new RegExp(/<li>[\n]*?<p>/, 'g'), '<li><p>')
    )

    function myDomElement(node, index, list, parent, origRenderer) {
        if(node.name === 'blockquote') {
            return (<View style={ {paddingHorizontal: 12, borderLeftWidth: 3, borderLeftColor: colors.greyMid} }>
                        <Text style={ {color: colors.greyBlue, fontFamily: "AvenirNext-Regular"} }>{ node.children[1].children[0].data }</Text>
                    </View>);
        } else if(node.name === 'hr') {
            return (<View style={ {height: 4, backgroundColor: colors.greyLight} } />);
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", {
                user: comment.user
              })}
          >
            <FastImage
              style={styles.avatar}
              source={{
                uri: comment.user.avatar_url,
                priority: FastImage.priority.high
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.titleSubtitleContainer}
            onPress={() =>
              navigation.navigate("Profile", {
                user: comment.user
              })}
          >
            <Text style={styles.linkDescription}>
              {comment.user.login}{"  "}
            </Text>
          </TouchableOpacity>

          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {moment(comment.created_at).fromNow()}
            </Text>
          </View>
        </View>

        <View style={styles.commentContainer}>
          {comment.body_html && comment.body_html !== "" &&
            <HTMLView
              value={commentBodyAdjusted()}
              stylesheet={commentStyles}
              renderNode= { myDomElement }
            />}

          {comment.body_html && comment.body_html !== null &&
            <View
              style={[
                styles.reactionsBar,
                comment.body_html.substr(comment.body_html.length - 1) !==
                  "\n" && styles.reactionsBarMargin
              ]}
            >

              {reactionTypes.map((reaction, i) =>
                this.renderReaction(reaction, comment, i)
              )}

              {!issue.locked &&
                <TouchableOpacity
                  onPress={() => this.showReactionActionSheet(comment)}
                >
                  <AddReaction />
                </TouchableOpacity>}

              {isCreatingReaction &&
                <ActivityIndicator
                  animating={true}
                  size="small"
                  style={styles.creatingReactionLoader}
                />}
            </View>}

        </View>
      </View>
    );
  }

  showReactionActionSheet = comment => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: "Add Reaction",
        options: reactionButtons,
        cancelButtonIndex: 6
      },
      buttonIndex => {
        const reactionType = reactionTypes[buttonIndex];
        if (buttonIndex !== 6) {
          this.props.addAdditionalReaction(
            reactionType,
            this.props.commentType,
            comment.id,
            this.alreadyReacted(comment, reactionType)
          );
        }
      }
    );
  };

  alreadyReacted = (comment, type) => {
    return comment.completeReactions
      ? comment.completeReactions.some(
          reaction =>
            reaction.content === type &&
            reaction.user.login === this.props.authUser
        )
      : false;
  };
}

CommentListItem.propTypes = {
  authUser: PropTypes.string,
  issue: PropTypes.object,
  comment: PropTypes.object,
  commentType: PropTypes.string,
  isCreatingReaction: PropTypes.bool,
  triggerReaction: PropTypes.func,
  addAdditionalReaction: PropTypes.func,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: "transparent"
  },
  header: {
    flexDirection: "row",
    marginLeft: 10,
    alignItems: "center"
  },
  avatar: {
    backgroundColor: colors.greyLight,
    width: 34,
    height: 34,
    borderRadius: 17
  },
  titleSubtitleContainer: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 10
  },
  dateContainer: {
    flex: 0.15,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  linkDescription: {
    fontFamily: "AvenirNext-DemiBold",
    color: colors.primaryDark
  },
  date: {
    color: colors.greyDark
  },
  commentContainer: {
    marginTop: 4,
    marginLeft: 54,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1
  },
  commentBody: {
    paddingRight: 10,
    color: colors.black,
    fontSize: 14,
    fontFamily: "AvenirNext-Regular"
  },
  reactionsBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  reactionsBarMargin: {
    marginTop: 10
  },
  creatingReactionLoader: {
    marginLeft: 10
  }
});

const commentStyles = StyleSheet.create({
  p: {
    color: colors.primaryDark,
    fontFamily: "AvenirNext-Regular"
  },
  li: {
    color: colors.primaryDark,
    fontFamily: "AvenirNext-Regular"
  },
  a: {
    fontFamily: "AvenirNext-DemiBold"
  },
});

export default CommentListItem;

// <HTMLView
//   value={comment.body_html.replace(new RegExp('<blockquote>', 'g'), '<h2>')
//     .replace(new RegExp('</blockquote>', 'g'), '</h2>')}
//   stylesheet={commentStyles}
// />

{
  /*<Text style={styles.commentBody}>
              {comment.body}
            </Text>}*/
}
