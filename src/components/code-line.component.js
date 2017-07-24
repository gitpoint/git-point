// @flow
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { getLanguage } from 'lowlight';
import { github as GithubStyle } from 'react-syntax-highlighter/dist/styles';
import { colors, fonts, normalize } from 'config';

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
    ...fonts.fontCode,
    fontSize: normalize(11),
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
    ...fonts.fontCode,
    fontSize: normalize(11),
    flex: 1,
    alignItems: 'center',
    color: colors.grey,
  },
});

export class CodeLine extends Component {
  props: {
    newChunk: boolean,
    change: Object,
    filename: string,
  };

  isKnownType(language) {
    return language && getLanguage(language) && !this.props.newChunk;
  }

  render() {
    const { newChunk, change, filename } = this.props;
    const language = (filename || []).split('.').pop();
    // SyntaxHighlighter doesn't allow Stylesheet class style
    const customStyle = {
      backgroundColor: 'transparent',
      padding: 0,
    };

    return (
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
            {(newChunk || !this.isKnownType(language)) &&
              <Text style={[styles.codeLine, newChunk && styles.newChunkLine]}>
                {change.content}
              </Text>}

            {this.isKnownType(language) &&
              <SyntaxHighlighter
                language={language}
                style={GithubStyle}
                CodeTag={Text}
                codeTagProps={{ style: styles.codeLine }}
                customStyle={customStyle}
                fontFamily={fonts.fontCode.fontFamily}
                fontSize={styles.codeLine.fontSize}
              >
                {change.content}
              </SyntaxHighlighter>}
          </View>
        </View>
      </View>
    );
  }
}
