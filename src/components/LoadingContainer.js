import React, {PropTypes} from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';

import colors from '../config/colors';

const LoadingContainer = (
  {
    animating,
    text,
    center,
  },
) => (
  <View style={[styles.loadingContainer, center && styles.center]}>
    <ActivityIndicator
      animating={animating}
      style={styles.loadingIcon}
      size="large"
    />
    {text && <Text style={styles.text}>{text}</Text>}
  </View>
);

LoadingContainer.propTypes = {
  animating: PropTypes.bool,
  text: PropTypes.string,
  center: PropTypes.bool,
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
  loadingIcon: {
    height: 80,
  },
  text: {
    fontFamily: 'AvenirNext-Medium',
  }
});

export default LoadingContainer;
