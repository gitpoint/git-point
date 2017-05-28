import React, {PropTypes} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import config from '@config';

export const DiffBlocks = (
  {
    additions,
    deletions,
    showNumbers,
    onPress,
  },
) => {
  const linesChanged = additions + deletions;

  let greenBlocks = null;
  let redBlocks = null;
  let greyBlocks = null;

  if (linesChanged <= 5) {
    greenBlocks = additions;
    redBlocks = deletions;
    greyBlocks = 5 - (greenBlocks + redBlocks);
  } else {
    greenBlocks = Math.floor(additions / linesChanged * 5);
    redBlocks = Math.floor(deletions / linesChanged * 5);
    greyBlocks = 5 - (greenBlocks + redBlocks);
  }

  let Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.container} onPress={onPress}>
      {showNumbers &&
        <View style={styles.linesChanged}>
          <Text style={styles.numAdditions}>{`+${additions}`}</Text>
          <Text style={styles.numDeletions}>{`-${deletions}`}</Text>
        </View>}

      {[...Array(greenBlocks)].map((item, i) => {
        return <View key={i} style={[styles.block, styles.greenBlock]} />;
      })}

      {[...Array(redBlocks)].map((item, i) => {
        return <View key={i} style={[styles.block, styles.redBlock]} />;
      })}

      {[...Array(greyBlocks)].map((item, i) => {
        return <View key={i} style={[styles.block, styles.greyBlock]} />;
      })}
    </Component>
  );
};

DiffBlocks.propTypes = {
  additions: PropTypes.number,
  deletions: PropTypes.number,
  showNumbers: PropTypes.bool,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linesChanged: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numAdditions: {
    marginRight: 3,
    fontFamily: 'AvenirNext-DemiBold',
    color: config.colors.green,
    letterSpacing: 1,
  },
  numDeletions: {
    marginRight: 2,
    fontFamily: 'AvenirNext-DemiBold',
    color: config.colors.red,
    letterSpacing: 1,
  },
  block: {
    width: 7,
    height: 7,
    marginLeft: 1,
  },
  greenBlock: {
    backgroundColor: config.colors.green,
  },
  redBlock: {
    backgroundColor: config.colors.darkRed,
  },
  greyBlock: {
    backgroundColor: config.colors.greyMid,
  },
});