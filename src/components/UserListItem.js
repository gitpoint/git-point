import React, {PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import colors from '../config/colors';

import {ListItem} from 'react-native-elements';

const UserListItem = (
  {
    user,
    navigation,
  }
) => (
  <ListItem
    roundAvatar
    key={user.id}
    title={user.login}
    titleStyle={styles.title}
    avatar={{uri: user.avatar_url}}
    underlayColor={colors.greyLight}
    onPress={() => navigation.navigate(user.type === 'User' ? 'Profile' : 'Organization', user.type === 'User' ? {user: user} : {organization: user})}
  />
);

UserListItem.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium',
  },
});

export default UserListItem;
