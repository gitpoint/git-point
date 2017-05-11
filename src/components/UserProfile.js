import React, {PropTypes} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image'

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
      <FastImage
        style={[styles.avatar, (initialUser.type === 'User' || user.type === 'User') && styles.userAvatar]}
        source={{
          uri: initialUser.avatar_url,
          priority: FastImage.priority.high,
        }}
      />
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.subtitle}>{initialUser.login}</Text>
    </View>
    <View style={styles.details}>
      <TouchableOpacity
        style={styles.unit}
        onPress={() => navigation.navigate('RepositoryList', {
          user: user,
          repoCount: user.public_repos > 10 ? 10 : user.public_repos,
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
          onPress={() => navigation.navigate('FollowerList', {
            user: user,
            followerCount: user.followers > 10 ? 10 : user.followers,
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
          onPress={() => navigation.navigate('FollowingList', {
            user: user,
            followingCount: user.following > 10 ? 10 : user.following,
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
    borderRadius: 37.5,
  },
  userAvatar: {
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
