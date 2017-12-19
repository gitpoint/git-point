import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { colors, fonts, normalize } from 'config';
import { translate } from 'utils';

type Props = {
  issue: Object,
  isMerged: boolean,
  text: string,
  type: string,
  style: Object,
  locale: string,
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

export const StateBadge = ({
  issue,
  isMerged,
  text,
  type,
  style,
  locale,
}: Props) => {
  let issueState = type;
  let issueText = text;

  if (isMerged) {
    issueState = 'merged';
    issueText = translate('issue.main.states.merged', locale);
  } else if (issue && issue.state === 'open') {
    issueState = 'open';
    issueText = translate('issue.main.states.open', locale);
  } else if (issue && issue.state === 'closed') {
    issueState = 'closed';
    issueText = translate('issue.main.states.closed', locale);
  }

  let issueStyle = {};

  if (issueState === 'merged') {
    issueStyle = styles.mergedIssue;
  } else if (issueState === 'open') {
    issueStyle = styles.openIssue;
  } else if (issueState === 'closed') {
    issueStyle = styles.closedIssue;
  }

  return (
    <View style={[styles.badge, style, issueStyle]}>
      <Text style={styles.text}>{issueText}</Text>
    </View>
  );
};
