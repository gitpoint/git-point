import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

import { colors } from 'config';

type Props = {
  animating: boolean,
  text: string,
  center: boolean
};

export const LoadingContainer = ({ animating, text, center }: Props) => (
  <View style={[styles.loadingContainer, center && styles.center]}>
    <ActivityIndicator
      animating={animating}
      style={styles.loadingIcon}
      size="large"
    />
    {text && <Text style={styles.text}>{text}</Text>}
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center'
  },
  center: {
    justifyContent: 'center'
  },
  loadingIcon: {
    height: 80
  },
  text: {
    fontFamily: 'AvenirNext-Medium'
  }
});
