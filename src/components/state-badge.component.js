import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { colors, fonts, normalize } from 'config';

type Props = {
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

export const StateBadge = ({ text, type, style }: Props) => {
  return (
    <View
      style={[
        styles.badge,
        style,
        type === 'merged' && styles.mergedIssue,
        type === 'open' && styles.openIssue,
        type === 'closed' && styles.closedIssue,
      ]}
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  );
};
