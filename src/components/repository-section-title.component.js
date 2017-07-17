import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StateBadge } from 'components';
import { colors, fonts } from 'config';

type Props = {
  text: string,
  open: number,
  closed: number,
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
  },
  titleText: {
    color: colors.black,
    ...fonts.fontPrimaryBold,
  },
  badge: {
    marginLeft: 10,
  },
});

export const RepositorySectionTitle = ({ text, open, closed }: Props) => {
  return (
    <View style={styles.title}>
      <Text style={styles.titleText}>
        {text}
      </Text>
      <StateBadge type="open" text={open} style={styles.badge} />
      <StateBadge type="closed" text={closed} style={styles.badge} />
    </View>
  );
};
