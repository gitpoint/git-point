import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { colors, fonts, normalize } from 'config';

type Props = {
  issue: Object,
  isMerged: boolean,
};

const styles = StyleSheet.create({
  badge: {
    padding: 12,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 20,
  },
  mergedIssue: {
    backgroundColor: colors.purple,
  },
  openIssue: {
    backgroundColor: colors.green,
  },
  closedIssue: {
    backgroundColor: colors.red,
  },
  text: {
    fontSize: normalize(12),
    ...fonts.fontPrimarySemiBold,
    color: colors.white,
  },
});

export const IssueStateBadge = ({ issue, isMerged }: Props) => {
  return (
    <View
      style={[
        styles.badge,
        isMerged && styles.mergedIssue,
        issue.state === 'open' && !isMerged && styles.openIssue,
        issue.state === 'closed' && !isMerged && styles.closedIssue,
      ]}
    >
      {isMerged && <Text style={styles.text}>Merged</Text>}

      {!isMerged &&
        <Text style={styles.text}>
          {issue.state === 'open' ? 'Open' : 'Closed'}
        </Text>}
    </View>
  );
};
