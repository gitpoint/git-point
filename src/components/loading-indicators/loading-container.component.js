import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

import { colors, fonts } from 'config';

type Props = {
  animating: boolean,
  text: string,
  center: boolean,
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
  },
  text: {
    paddingTop: 20,
    ...fonts.fontPrimary,
  },
});

export const LoadingContainer = ({ animating, text, center }: Props) =>
  <View style={[styles.loadingContainer, center && styles.center]}>
    <ActivityIndicator animating={animating} size="large" />
    {text &&
      <Text style={styles.text}>
        {text}
      </Text>}
  </View>;
