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
  listItemContainer: {
    flex: 1,
    borderBottomWidth: 0,
  },
  title: {
    color: colors.primaryDark,
    ...fonts.fontPrimary,
  },
});

export const CommitListItem = ({ commit, navigation }: Props) => (
  <TouchableHighlight
    onPress={() =>
      navigation.navigate('Commit', {
        commit,
      })
    }
    underlayColor={colors.greyLight}
  >
    <View style={styles.container}>
      <ListItem
        containerStyle={styles.listItemContainer}
        title={commit.commit.message.split('\n')[0]}
        titleNumberOfLines={1}
        subtitle={
          `${commit.sha.substring(0, 7)} - ${commit.commit.author.name}` || ''
        }
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
  </TouchableHighlight>
);
