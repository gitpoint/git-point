/* eslint-disable no-prototype-builtins */
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, fonts, normalize } from 'config';
import { translate, abbreviateNumber } from 'utils';
import { ImageZoom } from 'components';

type Props = {
  type: string,
  initialUser: Object,
  user: Object,
  starCount: string,
  isFollowing: boolean,
  isFollower: boolean,
  locale: string,
  navigation: Object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperContainer: {
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
  unitStatus: {
    textAlign: 'center',
    color: colors.lighterBoldGreen,
    fontSize: normalize(8),
    ...fonts.fontPrimary,
  },
  badge: {
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 5,
    marginLeft: 17,
    marginRight: 17,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.lighterBoldGreen,
    justifyContent: 'center',
  },
  green: {
    color: colors.lightGreen,
  },
});

export class UserProfile extends Component {
  props: Props;

  getUserUri = () => {
    const { initialUser, user } = this.props;
    const image = initialUser.avatar_url
      ? `${initialUser.avatar_url}&lastModified=${initialUser.updated_at}`
      : `${user.avatar_url}&lastModified=${user.updated_at}`;

    return { uri: image };
  };

  render() {
    const {
      type,
      initialUser,
      user,
      starCount,
      isFollowing,
      isFollower,
      locale,
      navigation,
    } = this.props;

    return (
      <View style={styles.container}>
        {((user.hasOwnProperty('public_repos') &&
          !isNaN(parseInt(starCount, 10))) ||
          type === 'org') && (
          <View
            nativeId="user-profile-container"
            style={styles.wrapperContainer}
          >
            <View style={styles.profile}>
              <ImageZoom
                uri={this.getUserUri()}
                style={[
                  styles.avatar,
                  (initialUser.type === 'User' || user.type === 'User') &&
                    styles.userAvatar,
                ]}
              />
              <Text style={styles.title}>{user.name || ' '}</Text>
              <Text style={styles.subtitle}>{initialUser.login || ' '}</Text>
            </View>
            <View style={styles.details}>
              <TouchableOpacity
                style={styles.unit}
                nativeId="touchable-repository-list"
                onPress={() =>
                  navigation.navigate('RepositoryList', {
                    title: translate('user.repositoryList.title', locale),
                    user,
                    repoCount: user.public_repos > 15 ? 15 : user.public_repos,
                  })
                }
              >
                <Text style={styles.unitNumber}>
                  {!isNaN(parseInt(user.public_repos, 10))
                    ? user.public_repos + (user.total_private_repos || 0)
                    : ' '}
                </Text>
                <Text style={styles.unitText}>
                  {translate('common.repositories', locale)}
                </Text>
              </TouchableOpacity>

              {type !== 'org' && (
                <TouchableOpacity
                  nativeId="touchable-star-count-list"
                  style={styles.unit}
                >
                  <Text style={styles.unitNumber}>
                    {abbreviateNumber(starCount)}
                  </Text>
                  <Text style={styles.unitText}>
                    {translate('common.stars', locale)}
                  </Text>
                </TouchableOpacity>
              )}

              {type !== 'org' && (
                <TouchableOpacity
                  nativeId="touchable-followers-list"
                  style={styles.unit}
                  onPress={() =>
                    navigation.navigate('FollowerList', {
                      title: translate('user.followers.title', locale),
                      user,
                      followerCount: user.followers > 15 ? 15 : user.followers,
                    })
                  }
                >
                  <Text style={styles.unitNumber}>
                    {!isNaN(parseInt(user.followers, 10))
                      ? user.followers
                      : ' '}
                  </Text>
                  <Text style={styles.unitText}>
                    {translate('user.followers.text', locale)}
                  </Text>
                  {isFollowing && (
                    <Text style={[styles.unitStatus, styles.badge]}>
                      {translate('user.following.followingYou', locale)}
                    </Text>
                  )}
                </TouchableOpacity>
              )}

              {type !== 'org' && (
                <TouchableOpacity
                  nativeId="touchable-following-list"
                  style={styles.unit}
                  onPress={() =>
                    navigation.navigate('FollowingList', {
                      title: translate('user.following.title', locale),
                      user,
                      followingCount: user.following > 15 ? 15 : user.following,
                    })
                  }
                >
                  <Text style={styles.unitNumber}>
                    {!isNaN(parseInt(user.following, 10))
                      ? user.following
                      : ' '}
                  </Text>
                  <Text style={styles.unitText}>
                    {translate('user.following.text', locale)}
                  </Text>
                  {isFollower && (
                    <Text style={[styles.unitStatus, styles.badge]}>
                      {translate('user.followers.followsYou')}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}
