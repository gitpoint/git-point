import React, {PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';

import colors from '../config/colors';

const DiffBlocks = (
  {
    additions,
    deletions,
  }
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
    greenBlocks = Math.floor((additions / linesChanged) * 5);
    redBlocks = Math.floor((deletions / linesChanged) * 5);
    greyBlocks = 5 - (greenBlocks + redBlocks);
  }

  return (
    <View style={styles.container}>

      {[...Array(greenBlocks)].map((item, i) => {
        return (
          <View key={i} style={[styles.block, styles.greenBlock]} />
        );
      })}

      {[...Array(redBlocks)].map((item, i) => {
        return (
          <View key={i} style={[styles.block, styles.redBlock]} />
        );
      })}

      {[...Array(greyBlocks)].map((item, i) => {
        return (
          <View key={i} style={[styles.block, styles.greyBlock]} />
        );
      })}
    </View>
  )
};

DiffBlocks.propTypes = {
  additions: PropTypes.number,
  deletions: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    width: 7,
    height: 7,
    marginLeft: 1,
  },
  greenBlock: {
    backgroundColor: colors.green,
  },
  redBlock: {
    backgroundColor: colors.darkRed,
  },
  greyBlock: {
    backgroundColor: colors.greyMid,
  }
});

export default DiffBlocks;
