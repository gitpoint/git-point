import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { fonts, normalize } from 'config';

type Props = {
  color: string,
  backgroundColor: string,
  text: string,
  largeText: boolean,
};

const styles = StyleSheet.create({
  badge: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    width: 18,
    height: 18,
  },
  badgeText: {
    ...fonts.fontPrimaryBold,
    backgroundColor: 'transparent',
  },
  textSmall: {
    fontSize: normalize(8),
  },
  textLarge: {
    fontSize: normalize(9.5),
  },
});

export const Badge = ({ color, backgroundColor, text, largeText }: Props) =>
  <View style={StyleSheet.flatten([styles.badge, { backgroundColor }])}>
    <Text
      style={[
        styles.badgeText,
        largeText ? styles.textLarge : styles.textSmall,
        { color },
      ]}
    >
      {text}
    </Text>
  </View>;
