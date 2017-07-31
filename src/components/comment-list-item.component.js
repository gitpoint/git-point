// @flow
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';

import { translate } from 'utils';
import { colors, fonts, normalize } from 'config';

const lightFont = {
  ...fonts.fontPrimaryLight,
};

const regularFont = {
  ...fonts.fontPrimary,
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
  avatarContainer: {
    backgroundColor: colors.greyLight,
    borderRadius: 17,
    width: 34,
    height: 34,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  titleSubtitleContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  dateContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  linkDescription: {
    ...fonts.fontPrimarySemiBold,
    color: colors.primaryDark,
  },
  date: {
    color: colors.greyDark,
  },
  commentContainer: {
    paddingTop: 4,
    paddingBottom: 22,
    marginLeft: 54,
    marginRight: 20,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  commentText: {
    fontSize: Platform.OS === 'ios' ? normalize(11) : normalize(12),
    color: colors.primaryDark,
  },
  commentTextNone: {
    color: colors.primaryDark,
    fontStyle: 'italic',
  },
  commentLight: {
    ...lightFont,
  },
  commentRegular: {
    ...regularFont,
  },
});

const textStyleLight = {
  fontSize: Platform.OS === 'ios' ? normalize(11) : normalize(12),
  color: colors.primaryDark,
  ...lightFont,
};

const textStyleRegular = {
  fontSize: Platform.OS === 'ios' ? normalize(11) : normalize(12),
  color: colors.primaryDark,
  ...regularFont,
};

const textStyle = Platform.OS === 'ios' ? textStyleLight : textStyleRegular;

const linkStyle = {
  color: colors.primaryDark,
  ...fonts.fontPrimarySemiBold,
};

const commentStyles = StyleSheet.create({
  span: textStyle,
  p: textStyle,
  h1: textStyle,
  h2: textStyle,
  h3: textStyle,
  h4: textStyle,
  li: textStyle,
  a: linkStyle,
});

export class CommentListItem extends Component {
  props: {
    comment: Object,
    onLinkPress: Function,
    language: string,
    navigation: Object,
  };

  render() {
    const { comment, language, navigation } = this.props;
    const commentBodyAdjusted = () =>
      comment.body_html
        .replace(new RegExp(/<img[^>]*>/g), 'Image')
        .replace(new RegExp(/<ul>[\n]*?<li>/g), '<ul><li>')
        .replace(new RegExp(/<\/li>[\n]*?<\/ul>/g), '</li></ul>')
        .replace(new RegExp(/<ol>[\n]*?<li>/g), '<ol><li>')
        .replace(new RegExp(/<\/li>[\n]*?<\/ol>/g), '</li></ol>')
        .replace(new RegExp(/<li>[\n]*?<p>/g), '<li><span>')
        .replace(new RegExp(/<\/h1>[\n]*?<p>/g), '</h1><span>')
        .replace(new RegExp(/<\/h2>[\n]*?<p>/g), '</h2><span>')
        .replace(new RegExp(/<\/h3>[\n]*?<p>/g), '</h3><span>')
        .replace(new RegExp(/<p>*>/g), '<span>')
        .replace(new RegExp(/<\/p>*>/g), '</span>');

    const myDomElement = (node, index, siblings, parent, defaultRenderer) => {
      const onLinkPress = this.props.onLinkPress;

      if (node.name === 'blockquote') {
        return (
          <View
            key={index}
            style={{
              paddingHorizontal: 12,
              borderLeftWidth: 3,
              borderLeftColor: colors.greyMid,
            }}
          >
            <Text
              style={{
                color: colors.greyBlue,
                ...fonts.fontPrimaryLight,
              }}
            >
              {defaultRenderer(node.children, parent)}
            </Text>
          </View>
        );
      } else if (node.name === 'hr') {
        return (
          <View
            key={index}
            style={{ height: 4, backgroundColor: colors.greyLight }}
          />
        );
      } else if (node.name === 'code') {
        return (
          <Text
            key={index}
            style={{
              ...fonts.fontCode,
              backgroundColor: colors.greyMidLight,
              fontSize: normalize(11),
              margin: node.parent.name === 'pre' ? 12 : 3,
            }}
          >
            {defaultRenderer(node.children, parent)}
          </Text>
        );
      } else if (
        node.name === 'h1' ||
        node.name === 'h2' ||
        node.name === 'h3'
      ) {
        return (
          <View
            key={index}
            style={{
              borderBottomWidth: node.name !== 'h3' ? 1 : 0,
              borderBottomColor: colors.greyMid,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: colors.primaryDark,
                ...fonts.fontPrimarySemiBold,
                fontSize:
                  node.name === 'h1'
                    ? normalize(24)
                    : node.name === 'h2' ? normalize(20) : normalize(18),
                paddingBottom: 4,
              }}
            >
              {defaultRenderer(node.children, parent)}
            </Text>
          </View>
        );
      } else if (node.name === 'a') {
        return (
          <Text
            key={index}
            style={{
              ...fonts.fontPrimarySemiBold,
              color: colors.primaryDark,
            }}
            onPress={() => onLinkPress(node)}
          >
            {defaultRenderer(node.children, parent)}
          </Text>
        );
      }

      return undefined;
    };

    const commentPresent =
      (comment.body_html && comment.body_html !== '') ||
      (comment.body && comment.body !== '');

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {comment.user &&
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() =>
                navigation.navigate('Profile', {
                  user: comment.user,
                })}
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: comment.user.avatar_url,
                }}
              />
            </TouchableOpacity>}

          {comment.user &&
            <TouchableOpacity
              style={styles.titleSubtitleContainer}
              onPress={() =>
                navigation.navigate('Profile', {
                  user: comment.user,
                })}
            >
              <Text style={styles.linkDescription}>
                {comment.user.login}
                {'  '}
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
              comment.body_html !== '' &&
              <HTMLView
                value={commentBodyAdjusted()}
                stylesheet={commentStyles}
                renderNode={myDomElement}
                addLineBreaks={false}
              />}

            {comment.body &&
              comment.body !== '' &&
              !comment.body_html &&
              <Text
                style={[
                  styles.commentText,
                  Platform.OS === 'ios'
                    ? styles.commentLight
                    : styles.commentRegular,
                ]}
              >
                {comment.body}
              </Text>}
          </View>}

        {!commentPresent &&
          <View style={styles.commentContainer}>
            <Text
              style={[
                styles.commentTextNone,
                Platform.OS === 'ios'
                  ? styles.commentLight
                  : styles.commentRegular,
              ]}
            >
              {translate('issue.main.noDescription', language)}
            </Text>
          </View>}
      </View>
    );
  }
}
