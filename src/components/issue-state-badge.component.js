import React from "react";
import { Text, View, StyleSheet } from "react-native";

import config from "config";

type Props = {
  issue: Object
};

export const IssueStateBadge = ({ issue }: Props) => {
  return (
    <View
      style={[
        styles.badge,
        issue.state === "open" ? styles.openIssue : styles.closedIssue
      ]}
    >
      <Text style={styles.text}>
        {issue.state === "open" ? "Open" : "Closed"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    padding: 12,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 20
  },
  openIssue: {
    backgroundColor: config.colors.green
  },
  closedIssue: {
    backgroundColor: config.colors.red
  },
  text: {
    fontSize: 14,
    fontFamily: "AvenirNext-DemiBold",
    color: config.colors.white
  }
});
