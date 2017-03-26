import React, {PropTypes} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import colors from '../config/colors';

const LoadingContainer = (
  {
    animating,
  },
) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator
      animating={animating}
      style={styles.loadingIcon}
      size="large"
    />
  </View>
);

LoadingContainer.propTypes = {
  animating: PropTypes.bool,
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    height: 80,
  },
});

export default LoadingContainer;
