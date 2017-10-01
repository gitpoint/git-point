import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { colors, fonts, normalize } from 'config';

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
    borderColor: colors.alabaster,
    borderWidth: 1,
  },
  badgeText: {
    ...fonts.fontPrimaryBold,
    backgroundColor: 'transparent',
  },
  textSmall: {
    fontSize: normalize(7),
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
