// @flow
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { MarkdownHtmlView } from 'components';
import moment from 'moment/min/moment-with-locales.min';

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
    paddingBottom: 2,
    marginLeft: 54,
    marginRight: 15,
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

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

class CommentListItemComponent extends Component {
  props: {
    comment: Object,
    onLinkPress: Function,
    language: string,
    navigation: Object,
    authUser: Object,
  };

  render() {
    const { comment, language, navigation, authUser, onLinkPress } = this.props;

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
                navigation.navigate(
                  authUser.login === comment.user.login
                    ? 'AuthProfile'
                    : 'Profile',
                  {
                    user: comment.user,
                  }
                )}
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
                navigation.navigate(
                  authUser.login === comment.user.login
                    ? 'AuthProfile'
                    : 'Profile',
                  {
                    user: comment.user,
                  }
                )}
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

        {!!commentPresent &&
          <View style={styles.commentContainer}>
            <MarkdownHtmlView source={comment.body} onLinkPress={onLinkPress} />
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

export const CommentListItem = connect(mapStateToProps)(
  CommentListItemComponent
);
