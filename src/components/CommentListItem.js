import React, {PropTypes} from 'react';
import {StyleSheet, Dimensions, View, Text, Image} from 'react-native';
import {Icon} from 'react-native-elements';

import colors from '../config/colors';
const window = Dimensions.get('window');

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
  }
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
