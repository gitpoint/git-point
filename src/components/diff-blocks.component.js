// @flow

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colors, fonts } from 'config';

type Props = {
  additions: number,
  deletions: number,
  showNumbers: boolean,
  onPress: Function,
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
    ...fonts.fontPrimarySemiBold,
    color: colors.green,
    letterSpacing: 1,
  },
  numDeletions: {
    marginRight: 2,
    ...fonts.fontPrimarySemiBold,
    color: colors.red,
    letterSpacing: 1,
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
  },
});

export const DiffBlocks = ({
  additions,
  deletions,
  showNumbers,
  onPress,
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

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.container} onPress={onPress}>
      {showNumbers && (
        <View style={styles.linesChanged}>
          <Text style={styles.numAdditions}>{`+${additions}`}</Text>
          <Text style={styles.numDeletions}>{`-${deletions}`}</Text>
        </View>
      )}

      {[...Array(greenBlocks)].map((item, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <View key={index} style={[styles.block, styles.greenBlock]} />;
      })}

      {[...Array(redBlocks)].map((item, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <View key={index} style={[styles.block, styles.redBlock]} />;
      })}

      {[...Array(greyBlocks)].map((item, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <View key={index} style={[styles.block, styles.greyBlock]} />;
      })}
    </Component>
  );
};
