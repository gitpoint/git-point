import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { colors, fonts } from 'config';

type Props = {
  text: string,
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: 1,
    top: -1,
    backgroundColor: colors.darkerRed,
    borderRadius: 18,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.alabaster,
    borderWidth: 1,
  },
  badgeText: {
    alignSelf: 'center',
    fontSize: 9,
    ...fonts.fontPrimary,
    color: colors.white,
    backgroundColor: 'transparent',
  },
});

export const Badge = ({ text }: Props) =>
  <View style={styles.badge}>
    <Text style={styles.badgeText}>
      {text}
    </Text>
  </View>;
