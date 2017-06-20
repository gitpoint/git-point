// @flow

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from 'config';

type Props = {
  additions: number,
  deletions: number,
  showNumbers: boolean,
  onPress: Function
};

export const DiffBlocks = ({
  additions,
  deletions,
  showNumbers,
  onPress
}: Props) => {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  linesChanged: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  numAdditions: {
    marginRight: 3,
    fontFamily: 'AvenirNext-DemiBold',
    color: colors.green,
    letterSpacing: 1
  },
  numDeletions: {
    marginRight: 2,
    fontFamily: 'AvenirNext-DemiBold',
    color: colors.red,
    letterSpacing: 1
  },
  block: {
    width: 7,
    height: 7,
    marginLeft: 1
  },
  greenBlock: {
    backgroundColor: colors.green
  },
  redBlock: {
    backgroundColor: colors.darkRed
  },
  greyBlock: {
    backgroundColor: colors.greyMid
  }
});
