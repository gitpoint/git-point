import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';

import { StateBadge } from 'components';
import { colors, fonts } from 'config';

type Props = {
  type: string,
  issue: Object,
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

export const IssueListItem = ({ type, issue, navigation }: Props) =>
  <TouchableHighlight
    style={issue.state === 'closed' && styles.closedIssue}
    onPress={() =>
      navigation.navigate('Issue', {
        issue,
        isPR: !!issue.pull_request,
      })}
    underlayColor={colors.greyLight}
  >
    <View style={styles.container}>
      <ListItem
        containerStyle={styles.listItemContainer}
        title={issue.title}
        subtitle={moment(issue.created_at).fromNow()}
        leftIcon={{
          name: type === 'issue' ? 'issue-opened' : 'git-pull-request',
          size: 36,
          color: colors.grey,
          type: 'octicon',
        }}
        hideChevron
        titleStyle={styles.title}
      />
      <StateBadge style={styles.badge} issue={issue} />
    </View>
  </TouchableHighlight>;
