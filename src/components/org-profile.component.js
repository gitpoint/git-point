/* eslint-disable no-prototype-builtins */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { colors, fonts, normalize } from 'config';
import { translate } from 'utils';
import { ImageZoom } from 'components';

type Props = {
  org: Object,
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

const mockAttribute = (entity, attribute, replacement) => {
  return entity && entity[attribute] ? entity[attribute] : replacement;
};

export const OrgProfile = ({ org, locale, navigation }: Props) => {
  const countRepos = mockAttribute(org, 'countRepos', 0);

  return (
    <View style={styles.container}>
      <View style={styles.wrapperContainer}>
        <View style={styles.profile}>
          {org &&
            org.avatarUrl && (
              <ImageZoom
                uri={{
                  uri: org.avatarUrl,
                }}
                style={[styles.avatar]}
              />
            )}
          {(!org || !org.avatarUrl) && (
            <ActivityIndicator color={colors.white} size="large" />
          )}
          <Text style={styles.title}>{mockAttribute(org, 'name', ' ')}</Text>
          <Text style={styles.subtitle}>
            {mockAttribute(org, 'login', ' ')}
          </Text>
        </View>
        <View style={styles.details}>
          <TouchableOpacity
            style={styles.unit}
            onPress={() =>
              navigation.navigate('OrgRepositoryList', {
                title: translate('user.repositoryList.title', locale),
                orgId: org.id,
                repoCount: countRepos > 15 ? 15 : countRepos,
              })}
          >
            <Text style={styles.unitNumber}>{countRepos}</Text>
            <Text style={styles.unitText}>
              {translate('common.repositories', locale)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
