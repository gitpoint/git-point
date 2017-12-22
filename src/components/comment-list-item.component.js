// @flow
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { GithubHtmlView } from 'components';
import { Icon } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';

import moment from 'moment/min/moment-with-locales.min';

import { translate } from 'utils';
import { colors, fonts, normalize } from 'config';

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingTop: 10,
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
    ...fonts.fontPrimaryBold,
    fontSize: normalize(13),
    color: colors.primaryDark,
  },
  date: {
    color: colors.greyDark,
  },
  commentContainer: {
    paddingTop: 5,
    marginLeft: 54,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  commentBottomPadding: {
    paddingBottom: 15,
  },
  commentText: {
    fontSize: normalize(12),
    color: colors.primaryDark,
  },
  commentTextNone: {
    ...fonts.fontPrimary,
    color: colors.primaryDark,
    fontStyle: 'italic',
  },
  actionButtonIconContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

class CommentListItemComponent extends Component {
  props: {
    comment: Object,
    onLinkPress: Function,
    onEditPress: Function,
    onDeletePress: Function,
    locale: string,
    navigation: Object,
    authUser: Object,
  };

  ActionSheet: ActionSheet;

  handlePress = (index: number) => {
    const { onDeletePress, onEditPress, comment } = this.props;

    if (index === 0) {
      onEditPress(comment);
    } else if (index === 1) {
      onDeletePress(comment);
    }
  };

  showMenu = () => {
    this.ActionSheet.show();
  };

  isIssueDescription = () =>
    Object.prototype.hasOwnProperty.call(this.props.comment, 'repository_url');

  commentActionSheetOptions = comment => {
    const { locale } = this.props;
    const actions = [translate('issue.comment.editAction', locale)];

    if (!comment.repository_url) {
      actions.push(translate('issue.comment.deleteAction', locale));
    }

    return actions;
  };

  render() {
    const { comment, locale, navigation, authUser, onLinkPress } = this.props;

    const commentPresent = comment.body_html && comment.body_html !== '';

    const isActionMenuEnabled =
      comment.user && authUser.login === comment.user.login;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {comment.user && (
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
                )
              }
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: comment.user.avatar_url,
                }}
              />
            </TouchableOpacity>
          )}

          {comment.user && (
            <View style={styles.titleSubtitleContainer}>
              <Text
                style={styles.linkDescription}
                onPress={() =>
                  navigation.navigate(
                    authUser.login === comment.user.login
                      ? 'AuthProfile'
                      : 'Profile',
                    {
                      user: comment.user,
                    }
                  )
                }
              >
                {comment.user.login}
              </Text>
            </View>
          )}

          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {moment(comment.created_at).fromNow()}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.commentContainer,
            !isActionMenuEnabled && styles.commentBottomPadding,
          ]}
        >
          {commentPresent ? (
            <GithubHtmlView
              source={comment.body_html}
              onLinkPress={onLinkPress}
            />
          ) : (
            <Text style={styles.commentTextNone}>
              {translate('issue.main.noDescription', locale)}
            </Text>
          )}

          {isActionMenuEnabled && (
            <View style={styles.actionButtonIconContainer}>
              <Icon
                color={colors.grey}
                size={20}
                name={'ellipsis-h'}
                type={'font-awesome'}
                onPress={this.showMenu}
              />
            </View>
          )}
        </View>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={translate('issue.comment.commentActions', locale)}
          options={[
            ...this.commentActionSheetOptions(comment),
            translate('common.cancel', locale),
          ]}
          cancelButtonIndex={this.commentActionSheetOptions(comment).length}
          onPress={this.handlePress}
        />
      </View>
    );
  }
}

export const CommentListItem = connect(mapStateToProps)(
  CommentListItemComponent
);
