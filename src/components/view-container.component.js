import React, {PropTypes} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import config from '@config';

export const ViewContainer = (
  {
    barColor,
    children,
  }
) => (
  <View style={styles.viewContainer}>
    <StatusBar
      barStyle={barColor === 'light ' ? 'light-content' : 'dark-content'}
    />
    {children}
  </View>
);

ViewContainer.propTypes = {
  barColor: PropTypes.string,
  children: PropTypes.any,
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: config.colors.white,
  },
});