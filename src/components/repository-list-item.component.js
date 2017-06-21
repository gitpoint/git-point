import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { colors, languageColors, normalize } from 'config';

type Props = {
  repository: Object,
  navigation: Object
};

export const RepositoryListItem = ({ repository, navigation }: Props) => (
  <ListItem
    key={repository.id}
    title={renderTitle(repository)}
    titleStyle={styles.title}
    rightIcon={{
      name: repository.fork ? 'repo-forked' : 'repo',
      color: colors.grey,
      type: 'octicon'
    }}
    underlayColor={colors.greyLight}
    onPress={() =>
      navigation.navigate('Repository', { repository: repository })}
  />
);

const renderTitle = repository => (
  <View style={styles.wrapper}>
    <Text style={styles.repositoryContainer}>
      <Text style={styles.title}>
        {repository.name}{repository.description && '\n'}
      </Text>
      <Text>
        {repository.description}
      </Text>
    </Text>
    <View style={styles.extraInfo}>
      <Icon
        containerStyle={styles.extraInfoIcon}
        name="star"
        type="octicion"
        size={15}
        color={colors.greyDark}
      />

      <Text style={[styles.extraInfoSubject, { paddingTop: 2 }]}>
        {repository.stargazers_count}
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
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5
  },
  title: {
    color: colors.primarydark,
    fontFamily: 'AvenirNext-DemiBold'
  },
  extraInfo: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 5
  },
  extraInfoSubject: {
    color: colors.greyDark,
    paddingLeft: 3,
    marginRight: 15,
    fontSize: normalize(10),
    fontFamily: 'AvenirNext-Medium'
  },
  repositoryContainer: {
    justifyContent: 'center',
    flex: 1,
    color: colors.primaryDark,
    fontFamily: 'AvenirNext-Regular'
  }
});
