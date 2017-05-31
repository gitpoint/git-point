// @flow

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import config from "config";

type Props = { newChunk: boolean, change: Object };

export const CodeLine = ({ newChunk, change }: Props) => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <View
        style={[
          styles.lineNumbers,
          newChunk && styles.newChunkLineNumbers,
          change.type === "add" && styles.addLineNumbers,
          change.type === "del" && styles.delLineNumbers
        ]}
      >
        <Text style={styles.codeLineNumber}>
          {change.type === "del"
            ? change.ln
            : change.type === "normal"
                ? change.ln1
                : change.type === "add" ? "" : "..."}
        </Text>
        <Text style={styles.codeLineNumber}>
          {change.type === "add"
            ? change.ln
            : change.type === "normal"
                ? change.ln2
                : change.type === "del" ? "" : "..."}
        </Text>
      </View>

      <View
        style={[
          styles.codeLineContainer,
          newChunk && styles.newChunkLineContainer,
          change.type === "add" && styles.addLine,
          change.type === "del" && styles.delLine
        ]}
      >
        <Text style={[styles.codeLine, newChunk && styles.newChunkLine]}>
          {change.content}
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  wrapper: {
    flexDirection: "row",
    flex: 1
  },
  codeLineContainer: {
    minWidth: Dimensions.get("window").width - 60,
    flex: 0.85
  },
  codeLine: {
    fontFamily: "Menlo",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  newChunkLineNumbers: {
    backgroundColor: config.colors.codeChunkLineNumberBlue
  },
  newChunkLineContainer: {
    backgroundColor: config.colors.codeChunkBlue
  },
  newChunkLine: {
    color: config.colors.grey
  },
  addLine: {
    backgroundColor: config.colors.addCodeGreen
  },
  addLineNumbers: {
    backgroundColor: config.colors.addCodeLineNumberGreen
  },
  delLine: {
    backgroundColor: config.colors.delCodeRed
  },
  delLineNumbers: {
    backgroundColor: config.colors.delCodeLineNumberRed
  },
  lineNumbers: {
    width: 60,
    paddingLeft: 10,
    paddingVertical: 3,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  codeLineNumber: {
    fontFamily: "Menlo",
    fontSize: 12,
    flex: 1,
    color: config.colors.grey
  }
});
