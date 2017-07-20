import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { colors, fonts, normalize } from 'config';

type Props = {
  issue: Object,
  isMerged: boolean,
  text: string,
  type: string,
  style: Object,
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

export const StateBadge = ({ issue, isMerged, text, type, style }: Props) => {
  let issueState = type;
  let issueText = text;

  if (isMerged) {
    issueState = 'merged';
    issueText = 'Merged';
  } else if (issue && issue.state === 'open') {
    issueState = 'open';
    issueText = 'Open';
  } else if (issue && issue.state === 'closed') {
    issueState = 'closed';
    issueText = 'Closed';
  }

  return (
    <View
      style={[
        styles.badge,
        style,
        issueState === 'merged' && styles.mergedIssue,
        issueState === 'open' && styles.openIssue,
        issueState === 'closed' && styles.closedIssue,
      ]}
    >
      <Text style={styles.text}>
        {issueText}
      </Text>
    </View>
  );
};
