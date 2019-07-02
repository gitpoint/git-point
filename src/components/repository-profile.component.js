import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import { emojifyText, abbreviateNumber, t } from 'utils';
import { colors, fonts, normalize } from 'config';

type Props = {
  repository: Object,
  navigation: Object,
  isChangingStar: boolean,
  isChangingSubscription: boolean,
  loading: boolean,
  hasError: boolean,
  locale: string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkenContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  profile: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: colors.white,
    ...fonts.fontPrimaryBold,
    fontSize: normalize(16),
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
  subtitle: {
    color: colors.white,
    ...fonts.fontPrimary,
    fontSize: normalize(12),
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
  },
  subtitleDescriptionNoFork: {
    textAlign: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 50,
  },
  subtitleDescriptionWithFork: {
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitleFork: {
    fontSize: normalize(10),
    marginBottom: Platform.OS === 'ios' ? 10 : 30,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    minWidth: 300,
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
  unitNumberLoading: {
    textAlign: 'center',
    fontSize: normalize(10),
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
  green: {
    color: colors.lightGreen,
  },
  icon: {
    paddingBottom: 20,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 0,
    height: 44,
    position: 'absolute',
  },
  languageInfoTitle: {
    color: colors.white,
    paddingLeft: 3,
    fontSize: normalize(10),
    ...fonts.fontPrimary,
  },
  badgeView: {
    borderRadius: 5,
    padding: 2,
    flexGrow: 0,
    backgroundColor: colors.lighterBoldGreen,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
  },
  badge: {
    color: colors.white,
    ...fonts.fontPrimaryBold,
  },
});

const iconName = repository => {
  let icon = '';

  if (!repository.name) {
    icon = 'stop';
  } else {
    icon = repository.isFork ? 'repo-forked' : 'repo';
  }

  return icon;
};

export const RepositoryProfile = ({
  repository,
  isChangingStar,
  isChangingSubscription,
  navigation,
  loading,
  hasError,
  locale,
}: Props) => (
  <View style={styles.container}>
    <View style={styles.languageInfo}>
      {!hasError &&
        !loading &&
        repository.primaryLanguage !== null && (
          <Icon
            name="fiber-manual-record"
            size={15}
            color={repository.primaryLanguage.color}
          />
        )}

      <Text style={[styles.languageInfoTitle]}>
        {repository.primaryLanguage
          ? repository.primaryLanguage.name
          : t('Unknown', locale)}
      </Text>
    </View>

    <View style={styles.profile}>
      <Icon
        containerStyle={[
          styles.icon,
          repository.isFork ? { marginLeft: 17 } : { marginLeft: 13 },
        ]}
        name={iconName(repository)}
        type="octicon"
        size={45}
        color={colors.greyLight}
      />

      <Text style={styles.title}>
        {repository.name || t('Repository is not found', locale)}
      </Text>

      {!hasError && (
        <Text
          numberOfLines={repository.isFork ? 1 : 3}
          style={[
            styles.subtitle,
            repository.isFork
              ? styles.subtitleDescriptionWithFork
              : styles.subtitleDescriptionNoFork,
          ]}
        >
          {emojifyText(repository.description) || ' '}
        </Text>
      )}

      {repository.isFork && (
        <Text
          nativeId="repository-fork-container"
          style={[styles.subtitle, styles.subtitleFork]}
        >
          {repository.parent && (
            <Text>
              <Text>{t('forked from', locale)}</Text>
              <Text
                nativeId="repository-navigate-container"
                style={{ ...fonts.fontPrimaryBold }}
                onPress={() =>
                  navigation.navigate('Repository', {
                    repoId: repository.parent.nameWithOwner,
                  })
                }
              >
                {' '}
                {repository.parent.nameWithOwner}
              </Text>
            </Text>
          )}
        </Text>
      )}
    </View>

    <View style={styles.details}>
      <View style={styles.unit}>
        <Text style={styles.unitNumber}>
          {isChangingStar && (
            <Text style={styles.unitNumberLoading}>
              {emojifyText(':hourglass:')}
            </Text>
          )}
          {!isChangingStar &&
          repository.stargazers &&
          !isNaN(parseInt(repository.stargazers.totalCount, 10))
            ? abbreviateNumber(repository.stargazers.totalCount)
            : ' '}
        </Text>
        {!hasError && <Text style={styles.unitText}>{t('Stars', locale)}</Text>}
        {repository.viewerHasStarred && (
          <View style={styles.badgeView}>
            <Text style={[styles.unitStatus, styles.badge]}>
              {t('Starred', locale)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.unit}>
        <Text style={styles.unitNumber}>
          {isChangingSubscription && (
            <Text style={styles.unitNumberLoading}>
              {emojifyText(':hourglass:')}
            </Text>
          )}
          {!isChangingSubscription &&
          repository.watchers &&
          !isNaN(parseInt(repository.watchers.totalCount, 10))
            ? abbreviateNumber(repository.watchers.totalCount)
            : ' '}
        </Text>
        {!hasError && (
          <Text style={styles.unitText}>{t('Watchers', locale)}</Text>
        )}
        {repository.viewerSubscription === 'SUBSCRIBED' && (
          <View style={styles.badgeView}>
            <Text style={[styles.unitStatus, styles.badge]}>
              {t('Watching', locale)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.unit}>
        <Text style={styles.unitNumber}>
          {!isNaN(parseInt(repository.forkCount, 10))
            ? abbreviateNumber(repository.forkCount)
            : ' '}
        </Text>
        {!hasError && <Text style={styles.unitText}>{t('Forks', locale)}</Text>}
      </View>
    </View>
  </View>
);
