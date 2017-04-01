import React, {PropTypes} from 'react';
import {StyleSheet, Dimensions, Text} from 'react-native';
import {ListItem} from 'react-native-elements';

import colors from '../config/colors';
const window = Dimensions.get('window');

const CommentListItem = (
  {
    comment,
    navigation
  }
) => (
  <ListItem
    roundAvatar
    avatar={{uri: comment.user.avatar_url}}
    avatarStyle={styles.avatar}
    containerStyle={{width: window.width}}
    title={renderBody(comment, navigation)}
    rightIcon={{name: 'thumb-up'}}
  />
);

const renderBody = (comment, navigation) => (
  <Text style={styles.descriptionContainer}>
    <Text
      style={styles.linkDescription}
      onPress={() => navigation.navigate('Profile', {
        user: comment.user,
      })}
    >
      {comment.user.login}{' '}
    </Text>
    {comment.body_html}
    <Text style={styles.date}>2h</Text>
  </Text>
);

CommentListItem.propTypes = {
  comment: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.greyLight,
  },
  descriptionContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    color: colors.primaryDark,
    fontFamily: 'AvenirNext-Regular',
  },
  linkDescription: {
    fontFamily: 'AvenirNext-DemiBold',
  },
  date: {
    color: colors.greyDark,
  },
});

export default CommentListItem;
