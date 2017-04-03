import React, {PropTypes} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Emoji from 'react-native-emoji';

import colors from '../config/colors';

import HTMLView from 'react-native-htmlview';

const CommentListItem = (
  {
    comment,
    navigation
  }
) => (
  <View
      style={styles.container}>
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

      <View style={styles.commentBody}>
        <HTMLView
          value={comment.body_html.replace(new RegExp('<blockquote>', 'g'), '<h2>')
            .replace(new RegExp('</blockquote>', 'g'), '</h2>')}
          stylesheet={commentStyles}
        />

        <View style={styles.reactionsBar}>
          <TouchableOpacity
            style={styles.reactionContainer}>
            <Text style={styles.reaction}><Emoji name="+1"/></Text>
            <Text style={styles.reactionCount}>
              6
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reactionContainer}>
            <Text style={styles.reaction}><Emoji name="-1"/></Text>
            <Text style={styles.reactionCount}>
              1
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reactionContainer}>
            <Text style={styles.reaction}><Emoji name="tada"/></Text>
            <Text style={styles.reactionCount}>
              2
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
);

CommentListItem.propTypes = {
  comment: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'transparent'
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
    borderRadius: 17
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
    justifyContent: 'center'
  },
  linkDescription: {
    fontFamily: 'AvenirNext-DemiBold',
  },
  date: {
    color: colors.greyDark,
  },
  commentBody: {
    marginTop: 4,
    marginBottom: 10,
    marginLeft: 54,
    marginRight: 10,
  },
  reactionsBar: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  reactionContainer: {
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  reaction: {
    fontSize: 17,
  },
  reactionCount: {
    color: colors.primaryDark,
    paddingLeft: 3,
    paddingTop: 5,
    marginRight: 15,
    fontSize: 13,
    fontFamily: 'AvenirNext-Medium',
  },
});

const commentStyles = StyleSheet.create({
  p: {
    color: colors.primaryDark,
    fontFamily: 'AvenirNext-Regular',
  },
  a: {
    fontFamily: 'AvenirNext-DemiBold',
  },
  h2: {
    color: colors.greyLight,
    fontFamily: 'AvenirNext-DemiBold',
  }
});

export default CommentListItem;
