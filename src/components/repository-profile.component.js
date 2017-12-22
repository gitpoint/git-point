import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import { emojifyText, abbreviateNumber, translate } from 'utils';
import { colors, languageColors, fonts, normalize } from 'config';

type Props = {
  repository: Object,
  starred: boolean,
  navigation: Object,
  loading: boolean,
  subscribed: boolean,
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
    top: 35,
    position: 'absolute',
  },
  languageInfoTitle: {
    color: colors.white,
    paddingLeft: 3,
    fontSize: normalize(10),
    ...fonts.fontPrimary,
  },
  badge: {
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 5,
    marginLeft: 27,
    marginRight: 27,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.lighterBoldGreen,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export const RepositoryProfile = ({
  repository,
  starred,
  navigation,
  loading,
  subscribed,
  locale,
}: Props) => (
  <View style={styles.container}>
    <View style={styles.languageInfo}>
      {!loading &&
        repository.language !== null && (
          <Icon
            name="fiber-manual-record"
            size={15}
            color={languageColors[repository.language]}
          />
        )}

      <Text style={[styles.languageInfoTitle]}>
        {repository.language || ' '}
      </Text>
    </View>

    <View style={styles.profile}>
      <Icon
        containerStyle={[
          styles.icon,
          repository.fork ? { marginLeft: 17 } : { marginLeft: 13 },
        ]}
        name={repository.fork ? 'repo-forked' : 'repo'}
        type="octicon"
        size={45}
        color={colors.greyLight}
      />

      <Text style={styles.title}>{repository.name || ' '}</Text>

      <Text
        numberOfLines={repository.fork ? 1 : 3}
        style={[
          styles.subtitle,
          repository.fork
            ? styles.subtitleDescriptionWithFork
            : styles.subtitleDescriptionNoFork,
        ]}
      >
        {emojifyText(repository.description) || ' '}
      </Text>

      {repository.fork && (
        <Text
          nativeId="repository-fork-container"
          style={[styles.subtitle, styles.subtitleFork]}
        >
          {repository.parent && (
            <Text>
              <Text>
                {translate('repository.main.forkedFromMessage', locale)}
              </Text>
              <Text
                nativeId="repository-navigate-container"
                style={{ ...fonts.fontPrimaryBold }}
                onPress={() =>
                  navigation.navigate('Repository', {
                    repository: repository.parent,
                  })
                }
              >
                {' '}
                {repository.parent.full_name}
              </Text>
            </Text>
          )}
        </Text>
      )}
    </View>

    <View style={styles.details}>
      <View style={styles.unit}>
        <Text style={styles.unitNumber}>
          {!isNaN(parseInt(repository.stargazers_count, 10))
            ? abbreviateNumber(repository.stargazers_count)
            : ' '}
        </Text>
        <Text style={styles.unitText}>
          {translate('repository.main.starsTitle', locale)}
        </Text>
        {starred && (
          <Text style={[styles.unitStatus, styles.badge]}>
            {translate('repository.main.starred', locale)}
          </Text>
        )}
      </View>

      <View style={styles.unit}>
        <Text style={styles.unitNumber}>
          {!isNaN(parseInt(repository.subscribers_count, 10))
            ? abbreviateNumber(repository.subscribers_count)
            : ' '}
        </Text>
        <Text style={styles.unitText}>
          {translate('repository.main.watchers', locale)}
        </Text>
        {subscribed && (
          <Text style={[styles.unitStatus, styles.badge]}>
            {translate('repository.main.watching', locale)}
          </Text>
        )}
      </View>

      <View style={styles.unit}>
        <Text style={styles.unitNumber}>
          {!isNaN(parseInt(repository.forks, 10))
            ? abbreviateNumber(repository.forks)
            : ' '}
        </Text>
        <Text style={styles.unitText}>
          {translate('repository.main.forksTitle', locale)}
        </Text>
      </View>
    </View>
  </View>
);
