import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { colors, normalize } from 'config';

type Props = {
  type: string,
  initialUser: Object,
  user: Object,
  isFollowing: boolean,
  navigation: Object
};

export const UserProfile = ({
  type,
  initialUser,
  user,
  isFollowing,
  navigation
}: Props) => (
  <View style={styles.container}>
    <View style={styles.profile}>
      <Image
        style={[
          styles.avatar,
          (initialUser.type === 'User' || user.type === 'User') &&
            styles.userAvatar
        ]}
        source={{
          uri: initialUser.avatar_url ? initialUser.avatar_url : user.avatar_url
        }}
      />
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.subtitle}>{initialUser.login}</Text>
    </View>
    <View style={styles.details}>
      <TouchableOpacity
        style={styles.unit}
        onPress={() =>
          navigation.navigate('RepositoryList', {
            user: user,
            repoCount: user.public_repos > 15 ? 15 : user.public_repos
          })}
      >
        <Text style={styles.unitNumber}>
          {user.public_repos + (user.total_private_repos || 0)}
        </Text>
        <Text style={styles.unitText}>Repositories</Text>
      </TouchableOpacity>

      {type !== 'org' &&
        <TouchableOpacity
          style={styles.unit}
          onPress={() =>
            navigation.navigate('FollowerList', {
              user: user,
              followerCount: user.followers > 15 ? 15 : user.followers
            })}
        >
          <Text style={[styles.unitNumber, isFollowing && styles.green]}>
            {user.followers}
          </Text>
          <Text style={styles.unitText}>Followers</Text>
        </TouchableOpacity>}

      {type !== 'org' &&
        <TouchableOpacity
          style={styles.unit}
          onPress={() =>
            navigation.navigate('FollowingList', {
              user: user,
              followingCount: user.following > 15 ? 15 : user.following
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profile: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  avatar: {
    width: 75,
    height: 75,
    marginBottom: 20,
    borderRadius: 37.5
  },
  userAvatar: {
    borderColor: colors.white,
    borderWidth: 2
  },
  title: {
    color: colors.white,
    fontFamily: 'AvenirNext-Bold',
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginBottom: 2
  },
  subtitle: {
    color: colors.white,
    fontFamily: 'AvenirNext-Medium',
    fontSize: normalize(12),
    marginBottom: 50,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center'
  },
  details: {
    flex: 1,
    flexDirection: 'row'
  },
  unit: {
    flex: 1
  },
  unitNumber: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: 'AvenirNext-Bold',
    fontSize: normalize(16),
    fontWeight: 'bold'
  },
  unitText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: normalize(10),
    fontFamily: 'AvenirNext-Medium'
  },
  green: {
    color: colors.lightGreen
  }
});
