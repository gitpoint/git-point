import React, {PropTypes} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import colors from '../config/colors';

const ViewContainer = (
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
    backgroundColor: colors.white,
  },
});

export default ViewContainer;
