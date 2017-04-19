import React, {PropTypes} from 'react';
import {StyleSheet, View, TouchableHighlight, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image'

import colors from '../config/colors';

const UserListItem = (
  {
    user,
    navigation,
  }
) => (
  <TouchableHighlight
    onPress={() => navigation.navigate(user.type === 'User' ? 'Profile' : 'Organization', user.type === 'User' ? {user: user} : {organization: user})}
    underlayColor={colors.greyLight}
    style={styles.container}
  >
    <View style={styles.wrapper}>
      <View style={styles.userInfo}>
        <FastImage
          style={styles.avatar}
          source={{
            uri: user.avatar_url,
            priority: FastImage.priority.high,
          }}
        />

        <View style={styles.titleContainer}>
          <Text
            style={styles.title}>{user.login}</Text>
        </View>
      </View>

      <View style={styles.iconContainer}>
        <Icon
          color={colors.grey}
          name="chevron-right"
        />
      </View>
    </View>
  </TouchableHighlight>
);

UserListItem.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  wrapper: {
    padding: 10,
    flexDirection: 'row',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.greyLight,
    borderRadius: 17,
    width: 34,
    height: 34
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    marginLeft: 10
  },
  iconContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default UserListItem;
