import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { emojifyText, abbreviateNumber } from 'utils';
import { colors, languageColors, fonts, normalize } from 'config';

type Props = {
  repository: Object,
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
  },
  title: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
  },
  private: {
    borderColor: 'rgba(27, 31, 35, 0.15)',
    borderRadius: 2,
    borderStyle: 'solid',
    borderWidth: 1,
    color: colors.greyDark,
    fontSize: normalize(10),
    marginLeft: 8,
    paddingLeft: 4,
    paddingRight: 2,
    paddingTop: 2,
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
    marginRight: 15,
    fontSize: normalize(10),
    ...fonts.fontPrimary,
  },
  repositoryContainer: {
    justifyContent: 'center',
    flex: 1,
  },
});

const renderTitle = repository =>
  <View style={styles.wrapper}>
    <View style={styles.repositoryContainer}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          {repository.name}
        </Text>
        {repository.private && <Text style={styles.private}>Private</Text>}
      </View>
      <Text style={styles.description}>
        {emojifyText(repository.description)}
      </Text>
    </View>
    <View style={styles.extraInfo}>
      <Icon
        containerStyle={styles.extraInfoIcon}
        name="star"
        type="octicion"
        size={15}
        color={colors.greyDark}
      />

      <Text style={[styles.extraInfoSubject, { paddingTop: 2 }]}>
        {abbreviateNumber(repository.stargazers_count)}
      </Text>

      {repository.language !== null &&
        <Icon
          containerStyle={styles.extraInfoIcon}
          name="fiber-manual-record"
          size={15}
          color={languageColors[repository.language]}
        />}

      <Text style={[styles.extraInfoSubject, { paddingTop: 2 }]}>
        {repository.language}
      </Text>
    </View>
  </View>;

export const RepositoryListItem = ({ repository, navigation }: Props) =>
  <ListItem
    key={repository.id}
    title={renderTitle(repository)}
    titleStyle={styles.title}
    rightIcon={{
      name: repository.fork ? 'repo-forked' : 'repo',
      color: colors.grey,
      type: 'octicon',
    }}
    underlayColor={colors.greyLight}
    onPress={() => navigation.navigate('Repository', { repository })}
  />;
