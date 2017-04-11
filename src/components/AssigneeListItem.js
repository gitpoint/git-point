import React, {PropTypes} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {Icon} from 'react-native-elements';

import colors from '../config/colors';

const AssigneeListItem = (
  {
    user,
    navigation,
    removeAssignee,
  }
) => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.userInfo}
        onPress={() => navigation.navigate('Profile', {
          user: user,
        })}>
          <Image
            style={styles.avatar}
            source={{uri: user.avatar_url}}
            />

          <View style={styles.titleContainer}>
            <Text
              style={styles.title}>{user.login}</Text>
          </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer} onPress={() => removeAssignee(user.login)}>
        <Icon
          color={colors.grey}
          name="x"
          type="octicon"
        />
      </TouchableOpacity>
    </View>
  </View>
);

AssigneeListItem.propTypes = {
  user: PropTypes.object,
  navigation: PropTypes.object,
  removeAssignee: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingBottom: 10,
  },
  wrapper: {
    padding: 10,
    marginLeft: 5,
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
    color: colors.primaryDark,
    fontFamily: 'AvenirNext-DemiBold',
    marginLeft: 10
  },
  iconContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default AssigneeListItem;
