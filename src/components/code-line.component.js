// @flow
/* eslint-disable no-nested-ternary */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { colors, normalize } from 'config';

type Props = { newChunk: boolean, change: Object };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  wrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  codeLineContainer: {
    minWidth: Dimensions.get('window').width - 80,
    flex: 0.85,
  },
  codeLine: {
    fontFamily: 'Menlo',
    fontSize: normalize(10),
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  newChunkLineNumbers: {
    backgroundColor: colors.codeChunkLineNumberBlue,
  },
  newChunkLineContainer: {
    backgroundColor: colors.codeChunkBlue,
  },
  newChunkLine: {
    color: colors.grey,
  },
  addLine: {
    backgroundColor: colors.addCodeGreen,
  },
  addLineNumbers: {
    backgroundColor: colors.addCodeLineNumberGreen,
  },
  delLine: {
    backgroundColor: colors.delCodeRed,
  },
  delLineNumbers: {
    backgroundColor: colors.delCodeLineNumberRed,
  },
  lineNumbers: {
    width: 80,
    paddingLeft: 10,
    paddingVertical: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeLineNumber: {
    fontFamily: 'Menlo',
    fontSize: normalize(10),
    flex: 1,
    alignItems: 'center',
    color: colors.grey,
  },
});

export const CodeLine = ({ newChunk, change }: Props) =>
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <View
        style={[
          styles.lineNumbers,
          newChunk && styles.newChunkLineNumbers,
          change.type === 'add' && styles.addLineNumbers,
          change.type === 'del' && styles.delLineNumbers,
        ]}
      >
        <Text style={styles.codeLineNumber}>
          {change.type === 'del'
            ? change.ln
            : change.type === 'normal'
              ? change.ln1
              : change.type === 'add' ? '' : '...'}
        </Text>
        <Text style={styles.codeLineNumber}>
          {change.type === 'add'
            ? change.ln
            : change.type === 'normal'
              ? change.ln2
              : change.type === 'del' ? '' : '...'}
        </Text>
      </View>

      <View
        style={[
          styles.codeLineContainer,
          newChunk && styles.newChunkLineContainer,
          change.type === 'add' && styles.addLine,
          change.type === 'del' && styles.delLine,
        ]}
      >
        <Text style={[styles.codeLine, newChunk && styles.newChunkLine]}>
          {change.content}
        </Text>
      </View>
    </View>
  </View>;
