import React, {PropTypes} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import colors from '../config/colors';

const UserProfile = (
  {
    type,
    initialUser,
    user,
    navigation,
  }
) => (
  <View style={styles.container}>
    <View style={styles.profile}>
      <Image
        style={[styles.avatar, initialUser.type === 'User' && styles.userAvatar]}
        resizeMode="contain"
        source={{uri: initialUser.avatar_url}}
      />
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.subtitle}>{initialUser.login}</Text>
    </View>
    <View style={styles.details}>
      <TouchableOpacity
        style={styles.unit}
        onPress={() => navigation.navigate('ListRender', {
          listType: 'Repositories',
          user: user.login,
          showLoadingCount: user.public_repos > 10 ? 10 : user.public_repos,
        })}
      >
        <Text style={styles.unitNumber}>
          {user.public_repos}
        </Text>
        <Text style={styles.unitText}>Repositories</Text>
      </TouchableOpacity>

      {type !== 'org' &&
        <TouchableOpacity
          style={styles.unit}
          onPress={() => navigation.navigate('ListRender', {
            listType: 'Followers',
            user: user.login,
            showLoadingCount: user.followers > 10 ? 10 : user.followers,
          })}
        >
          <Text style={styles.unitNumber}>
            {user.followers}
          </Text>
          <Text style={styles.unitText}>Followers</Text>
        </TouchableOpacity>}

      {type !== 'org' &&
        <TouchableOpacity
          style={styles.unit}
          onPress={() => navigation.navigate('ListRender', {
            listType: 'Following',
            user: user.login,
            showLoadingCount: user.following > 10 ? 10 : user.following,
          })}
        >
          <Text style={styles.unitNumber}>
            {user.following}
          </Text>
          <Text style={styles.unitText}>Following</Text>
        </TouchableOpacity>}
    </View>
  </View>
);

UserProfile.propTypes = {
  type: PropTypes.string,
  initialUser: PropTypes.object,
  user: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },
  avatar: {
    width: 75,
    height: 75,
    marginBottom: 20,
  },
  userAvatar: {
    borderRadius: 37.5,
    borderColor: colors.white,
    borderWidth: 2,
  },
  title: {
    color: colors.white,
    fontFamily: 'AvenirNext-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    color: colors.white,
    fontFamily: 'AvenirNext-Medium',
    fontSize: 14,
    marginBottom: 40,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
  },
  details: {
    flex: 2,
    flexDirection: 'row',
    paddingBottom: 30,
  },
  unit: {
    flex: 1,
  },
  unitNumber: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'AvenirNext-Bold',
    fontSize: 18,
    fontWeight: 'bold',
  },
  unitText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 12,
    fontFamily: 'AvenirNext-Medium',
  },
});

export default UserProfile;
