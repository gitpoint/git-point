import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, fonts, normalize } from 'config';
import { ImageZoom } from 'components';

type Props = {
  type: string,
  initialUser: Object,
  user: Object,
  isFollowing: boolean,
  navigation: Object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    ...fonts.fontPrimaryBold,
    fontSize: normalize(16),
    marginBottom: 2,
  },
  subtitle: {
    color: colors.white,
    ...fonts.fontPrimary,
    fontSize: normalize(12),
    marginBottom: 50,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
  },
  details: {
    flex: 1,
    flexDirection: 'row',
  },
  unit: {
    flex: 1,
  },
  unitNumber: {
    textAlign: 'center',
    color: colors.white,
    ...fonts.fontPrimaryBold,
    fontSize: normalize(16),
  },
  unitText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: normalize(10),
    ...fonts.fontPrimary,
  },
  green: {
    color: colors.lightGreen,
  },
});

export const UserProfile = ({
  type,
  initialUser,
  user,
  isFollowing,
  navigation,
}: Props) =>
  <View style={styles.container}>
    <View style={styles.profile}>
      <ImageZoom
        uri={{
          uri: initialUser.avatar_url
            ? initialUser.avatar_url
            : user.avatar_url,
        }}
        style={[
          styles.avatar,
          (initialUser.type === 'User' || user.type === 'User') &&
            styles.userAvatar,
        ]}
      />
      <Text style={styles.title}>
        {user.name || ' '}
      </Text>
      <Text style={styles.subtitle}>
        {initialUser.login || ' '}
      </Text>
    </View>
    <View style={styles.details}>
      <TouchableOpacity
        style={styles.unit}
        onPress={() =>
          navigation.navigate('RepositoryList', {
            user,
            repoCount: user.public_repos > 15 ? 15 : user.public_repos,
          })}
      >
        <Text style={styles.unitNumber}>
          {!isNaN(parseInt(user.public_repos, 10))
            ? user.public_repos + (user.total_private_repos || 0)
            : ' '}
        </Text>
        <Text style={styles.unitText}>Repositories</Text>
      </TouchableOpacity>

      {type !== 'org' &&
        <TouchableOpacity
          style={styles.unit}
          onPress={() =>
            navigation.navigate('FollowerList', {
              user,
              followerCount: user.followers > 15 ? 15 : user.followers,
            })}
        >
          <Text style={[styles.unitNumber, isFollowing && styles.green]}>
            {!isNaN(parseInt(user.followers, 10)) ? user.followers : ' '}
          </Text>
          <Text style={styles.unitText}>Followers</Text>
        </TouchableOpacity>}

      {type !== 'org' &&
        <TouchableOpacity
          style={styles.unit}
          onPress={() =>
            navigation.navigate('FollowingList', {
              user,
              followingCount: user.following > 15 ? 15 : user.following,
            })}
        >
          <Text style={styles.unitNumber}>
            {!isNaN(parseInt(user.following, 10)) ? user.following : ' '}
          </Text>
          <Text style={styles.unitText}>Following</Text>
        </TouchableOpacity>}
    </View>
  </View>;
