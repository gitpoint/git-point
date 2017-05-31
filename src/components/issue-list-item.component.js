import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { ListItem } from "react-native-elements";

import { IssueStateBadge } from "components";

import config from "config";
import moment from "moment";

type Props = {
  type: string,
  issue: Object,
  userHasPushPermission: boolean,
  navigation: Object
};

export const IssueListItem = ({
  type,
  issue,
  userHasPushPermission,
  navigation
}: Props) => (
  <TouchableHighlight
    style={issue.state === "closed" && styles.closedIssue}
    onPress={() =>
      navigation.navigate("Issue", {
        issue: issue,
        userHasPushPermission: userHasPushPermission
      })}
    underlayColor={config.colors.greyLight}
  >
    <View style={styles.container}>
      <ListItem
        containerStyle={styles.listItemContainer}
        title={issue.title}
        subtitle={moment(issue.created_at).fromNow()}
        leftIcon={{
          name: type === "issue" ? "issue-opened" : "git-pull-request",
          size: 36,
          color: config.colors.grey,
          type: "octicon"
        }}
        hideChevron
        titleStyle={styles.title}
      />
      <IssueStateBadge style={styles.badge} issue={issue} />
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: config.colors.greyLight
  },
  closedIssue: {
    backgroundColor: config.colors.greyVeryLight,
    opacity: 0.6
  },
  listItemContainer: {
    flex: 1,
    borderBottomWidth: 0
  },
  title: {
    color: config.colors.primarydark,
    fontFamily: "AvenirNext-Medium"
  },
  badge: {
    flex: 0.15,
    alignItems: "flex-end",
    justifyContent: "center"
  }
});
