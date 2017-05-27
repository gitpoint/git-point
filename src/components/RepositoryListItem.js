import React, {PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';

import config from '@config';

const RepositoryListItem = (
  {
    repository,
    navigation,
  }
) => (
  <ListItem
    key={repository.id}
    title={renderTitle(repository)}
    titleStyle={styles.title}
    rightIcon={{
      name: repository.fork ? 'repo-forked' : 'repo',
      color: config.colors.grey,
      type: 'octicon'
    }}
    underlayColor={config.colors.greyLight}
    onPress={() => navigation.navigate('Repository', {repository: repository})}
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
        color={config.colors.greyDark}
      />

      <Text style={[styles.extraInfoSubject, {paddingTop: 2}]}>
        {repository.stargazers_count}
      </Text>

      {repository.language !== null &&
        <Icon
          containerStyle={styles.extraInfoIcon}
          name="fiber-manual-record"
          size={15}
          color={config.languageColors[repository.language]}
        />}

      <Text style={[styles.extraInfoSubject, {paddingTop: 2}]}>
        {repository.language}
      </Text>
    </View>
  </View>
);

RepositoryListItem.propTypes = {
  repository: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  title: {
    color: config.colors.primarydark,
    fontFamily: 'AvenirNext-DemiBold',
  },
  extraInfo: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 5,
  },
  extraInfoSubject: {
    color: config.colors.greyDark,
    paddingLeft: 3,
    marginRight: 15,
    fontSize: 12,
    fontFamily: 'AvenirNext-Medium',
  },
  repositoryContainer: {
    justifyContent: 'center',
    flex: 1,
    color: config.colors.primaryDark,
    fontFamily: 'AvenirNext-Regular',
  },
});

export default RepositoryListItem;
