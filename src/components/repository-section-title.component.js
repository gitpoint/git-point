import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StateBadge } from 'components';
import { colors, fonts } from 'config';

type Props = {
  text: string,
  openCount: number,
  closedCount: number,
  loading: boolean,
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
  },
  titleText: {
    color: colors.black,
    ...fonts.fontPrimaryBold,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: -7,
  },
  badge: {
    marginLeft: 10,
  },
});

export const RepositorySectionTitle = ({
  text,
  loading,
  openCount,
  closedCount,
}: Props) => {
  return (
    <View style={styles.title}>
      <Text style={styles.titleText}>
        {text}
      </Text>
      {!loading &&
        <View style={styles.badgeContainer}>
          <StateBadge type="open" text={openCount} style={styles.badge} />
          <StateBadge type="closed" text={closedCount} style={styles.badge} />
        </View>}
    </View>
  );
};
