import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { colors, fonts } from 'config';

type Props = {
  commit: Object,
  navigation: Object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
  },
  closedIssue: {
    backgroundColor: colors.greyVeryLight,
    opacity: 0.6,
  },
  listItemContainer: {
    flex: 1,
    borderBottomWidth: 0,
  },
  title: {
    color: colors.primaryDark,
    ...fonts.fontPrimary,
  },
  badge: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export const CommitListItem = ({ commit, navigation }: Props) =>
  <TouchableHighlight
    onPress={() =>
      navigation.navigate('Commit', {
        commit,
      })}
    underlayColor={colors.greyLight}
  >
    <View style={styles.container}>
      <ListItem
        containerStyle={styles.listItemContainer}
        title={commit.message}
        titleNumberOfLines={1}
        subtitle={commit.sha.substring(0, 7) + ' - ' + commit.author.name || ''} // eslint-disable-line prefer-template
        leftIcon={{
          name: 'git-commit',
          size: 36,
          color: colors.grey,
          type: 'octicon',
        }}
        hideChevron
        titleStyle={styles.title}
      />
    </View>
  </TouchableHighlight>;
