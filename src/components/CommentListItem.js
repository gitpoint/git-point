import React, { Component, PropTypes } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

import colors from "../config/colors";
import moment from "moment";

import HTMLView from "react-native-htmlview";

class CommentListItem extends Component {
  render() {
    const { comment, navigation } = this.props;
    const commentBodyAdjusted = () =>
      comment.body_html
        .replace(new RegExp(/<img[^>]*>/, "g"), "Image")
        .replace(new RegExp(/<ul>[\n]*?<li>/, "g"), "<ul><li>")
        .replace(new RegExp(/<\/li>[\n]*?<\/ul>/, "g"), "</li></ul>")
        .replace(new RegExp(/<ol>[\n]*?<li>/, "g"), "<ol><li>")
        .replace(new RegExp(/<\/li>[\n]*?<\/ol>/, "g"), "</li></ol>")
        .replace(new RegExp(/<li>[\n]*?<p>/, "g"), "<li><p>")
        .replace(new RegExp(/<\/h1>[\n]*?<p>/, "g"), "</h1><p>")
        .replace(new RegExp(/<\/h2>[\n]*?<p>/, "g"), "</h2><p>")
        .replace(new RegExp(/<\/h3>[\n]*?<p>/, "g"), "</h3><p>");

    const myDomElement = (node, index, siblings, parent, defaultRenderer) => {
      const onLinkPress = this.props.onLinkPress;

      if (node.name === "blockquote") {
        return (
          <View
            style={{
              paddingHorizontal: 12,
              borderLeftWidth: 3,
              borderLeftColor: colors.greyMid
            }}
          >
            <Text
              style={{
                color: colors.greyBlue,
                fontFamily: "AvenirNext-Regular"
              }}
            >
              {defaultRenderer(node.children, parent)}
            </Text>
          </View>
        );
      } else if (node.name === "hr") {
        return (
          <View style={{ height: 4, backgroundColor: colors.greyLight }} />
        );
      } else if (node.name === "code") {
        return (
          <Text
            style={{
              fontFamily: "Menlo",
              backgroundColor: colors.greyMidLight,
              fontSize: 13,
              margin: node.parent.name === "pre" ? 12 : 3
            }}
          >
            {defaultRenderer(node.children, parent)}
          </Text>
        );
      } else if (
        node.name === "h1" ||
        node.name === "h2" ||
        node.name === "h3"
      ) {
        return (
          <View
            style={{
              borderBottomWidth: node.name !== "h3" ? 1 : 0,
              borderBottomColor: colors.greyMid,
              marginBottom: 12
            }}
          >
            <Text
              style={{
                color: colors.primaryDark,
                fontFamily: "AvenirNext-DemiBold",
                fontSize: node.name === "h1"
                  ? 26
                  : node.name === "h2" ? 22 : 20,
                paddingBottom: 4
              }}
            >
              {defaultRenderer(node.children, parent)}
            </Text>
          </View>
        );
      } else if (node.name === 'a') {
        return (
          <Text
            style={{fontFamily: "AvenirNext-DemiBold", fontWeight: '600', color: colors.primaryDark}}
            onPress={() => onLinkPress(node)}
          > 
            {defaultRenderer(node.children, parent)}
          </Text>
        );
      }

      return undefined;
    };

    const commentPresent =
      (comment.body_html && comment.body_html !== "") ||
      (comment.body && comment.body !== "");
      
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {comment.user &&
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
            </TouchableOpacity>}

          {comment.user &&
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
            </TouchableOpacity>}

          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {moment(comment.created_at).fromNow()}
            </Text>
          </View>
        </View>

        {commentPresent &&
            <View style={styles.commentContainer}>
              {comment.body_html &&
                comment.body_html !== "" &&
                <HTMLView
                  value={commentBodyAdjusted()}
                  stylesheet={commentStyles}
                  renderNode={myDomElement}
                />}

              {comment.body &&
                comment.body !== "" &&
                !comment.body_html &&
                <Text style={styles.commentText}>{comment.body}</Text>}
            </View>}

                    {!commentPresent &&
            <View style={styles.commentContainer}>
                <Text style={styles.commentTextNone}>No description provided.</Text>
            </View>}

      </View>
    );
  }
}

CommentListItem.propTypes = {
  comment: PropTypes.object,
  onLinkPress: PropTypes.func,
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
    paddingTop: 4,
    paddingBottom: 22,
    marginLeft: 54,
    marginRight: 20,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1
  },
  commentText: {
    color: colors.primaryDark,
    fontFamily: "AvenirNext-Regular"
  },
  commentTextNone: {
    color: colors.primaryDark,
    fontFamily: "AvenirNext-Regular",
    fontStyle: 'italic',
  }
});

const textStyle = {
  color: colors.primaryDark,
  fontFamily: "AvenirNext-Regular"
};

const linkStyle = {
  color: colors.primaryDark,
  fontFamily: "AvenirNext-DemiBold"
};

const commentStyles = StyleSheet.create({
  p: textStyle,
  // h1: {...textStyle, fontSize: 26},
  h2: textStyle,
  h3: textStyle,
  h4: textStyle,
  li: textStyle,
  a: linkStyle
});

export default CommentListItem;
