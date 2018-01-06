import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { emojifyText, abbreviateNumber } from 'utils';
import { colors, languageColors, fonts, normalize } from 'config';

type Props = {
  repository: Object,
  showFullName: boolean,
  navigation: Object,
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
  },
  privateIconContainer: {
    marginLeft: 6,
  },
  description: {
    color: colors.primaryDark,
    ...fonts.fontPrimaryLight,
  },
  extraInfo: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 5,
  },
  extraInfoSubject: {
    color: colors.greyDark,
    paddingLeft: 3,
    paddingTop: 2,
    marginRight: 15,
    fontSize: normalize(10),
    ...fonts.fontPrimary,
  },
  repositoryContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
});

const renderTitle = (repository, showFullName) => (
  <View style={styles.wrapper}>
    <View style={styles.repositoryContainer}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          {showFullName ? repository.full_name : repository.name}
        </Text>
        {repository.private && (
          <View style={styles.privateIconContainer}>
            <Icon
              size={16}
              name="lock"
              type="octicon"
              color={colors.greyDarkest}
            />
          </View>
        )}
      </View>
      <Text style={styles.description}>
        {emojifyText(repository.description)}
      </Text>
    </View>
    <View style={styles.extraInfo}>
      <Icon
        containerStyle={styles.extraInfoIcon}
        name="star"
        type="octicon"
        size={15}
        color={colors.greyDark}
      />

      <Text style={styles.extraInfoSubject}>
        {abbreviateNumber(repository.stargazers_count)}
      </Text>

      <Icon
        containerStyle={styles.extraInfoIcon}
        name="repo-forked"
        type="octicon"
        size={15}
        color={colors.greyDark}
      />

      <Text
        style={[styles.extraInfoSubject, { paddingLeft: 0, marginRight: 13 }]}
      >
        {abbreviateNumber(repository.forks_count)}
      </Text>

      {repository.language !== null && (
        <Icon
          containerStyle={styles.extraInfoIcon}
          name="fiber-manual-record"
          size={15}
          color={languageColors[repository.language]}
        />
      )}

      <Text style={styles.extraInfoSubject}>{repository.language}</Text>
    </View>
  </View>
);

export const RepositoryListItem = ({
  repository,
  showFullName,
  navigation,
}: Props) => (
  <ListItem
    key={repository.id}
    title={renderTitle(repository, showFullName)}
    titleStyle={styles.title}
    rightIcon={{
      name: repository.fork ? 'repo-forked' : 'repo',
      color: colors.grey,
      type: 'octicon',
    }}
    containerStyle={styles.container}
    underlayColor={colors.greyLight}
    onPress={() => navigation.navigate('Repository', { repository })}
  />
);

RepositoryListItem.defaultProps = {
  showFullName: true,
};
