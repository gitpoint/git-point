import React, {PropTypes} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';

import colors from '../config/colors';

const CodeLine = (
  {
    newChunk,
    change,
  }
) => (
  <View style={styles.container}>
    <ScrollView
      automaticallyAdjustContentInsets={false}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={[
        styles.wrapper,
        newChunk && styles.newChunkLine,
        change.type === 'add' && styles.addLine,
        change.type === 'del' && styles.delLine,
      ]}
    >
      <View
        style={[
          styles.lineNumbers,
          newChunk && styles.newChunkLineNumbers,
          change.type === 'add' && styles.addLineNumbers,
          change.type === 'del' && styles.delLineNumbers,
        ]}
      >
        <Text style={styles.codeLineNumber}>{change.type === 'del' ? change.ln : (change.type === 'normal' ? change.ln1 : (change.type === 'add' ? '' : '...'))}</Text>
        <Text style={styles.codeLineNumber}>{change.type === 'add' ? change.ln : (change.type === 'normal' ? change.ln2 : (change.type === 'del' ? '' : '...'))}</Text>
      </View>

      <View>
        <Text style={styles.codeLine}>{change.content}</Text>
      </View>
    </ScrollView>
  </View>
);

CodeLine.propTypes = {
  newChunk: PropTypes.bool,
  chunkContent: PropTypes.string,
  change: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  wrapper: {
    flexDirection: 'row',
  },
  codeLine: {
    fontFamily: 'Menlo',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  newChunkLineNumbers: {
    backgroundColor: colors.codeChunkLineNumberBlue,
  },
  newChunkLine: {
    backgroundColor: colors.codeChunkBlue,
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
    width: 60,
    flex: 0.15,
    paddingLeft: 10,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeLineNumber: {
    fontFamily: 'Menlo',
    fontSize: 12,
    flex: 1,
    color: colors.grey,
  },
});

export default CodeLine;
