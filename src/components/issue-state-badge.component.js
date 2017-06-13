import React from "react";
import { Text, View, StyleSheet } from "react-native";

import config from "config";

type Props = {
  issue: Object,
  isMerged: boolean
};

export const IssueStateBadge = ({ issue, isMerged }: Props) => {
  return (
    <View
      style={[
        styles.badge,
        isMerged && styles.mergedIssue,
        issue.state === "open" && !isMerged && styles.openIssue,
        issue.state === "closed" && !isMerged && styles.closedIssue
      ]}
    >
      {isMerged &&
        <Text style={styles.text}>
          Merged
        </Text>}

      {!isMerged &&
        <Text style={styles.text}>
          {issue.state === "open" ? "Open" : "Closed"}
        </Text>}
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
  mergedIssue: {
    backgroundColor: config.colors.purple
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
