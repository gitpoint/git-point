// @flow

import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { ListItem } from "react-native-elements";

import {
  IssueStateBadge,
  MembersList,
  LabelButton,
  DiffBlocks
} from "components";

import config from "config";
import Parse from "parse-diff";
import moment from "moment";

type Props = {
  issue: Object,
  diff: string,
  isPendingDiff: boolean,
  onRepositoryPress: Function,
  navigation: Object
};

export const IssueDescription = ({
  issue,
  diff,
  isPendingDiff,
  onRepositoryPress,
  navigation
}: Props) => {
  const filesChanged = Parse(diff);

  let lineAdditions = 0;
  let lineDeletions = 0;

  filesChanged.forEach(function(file) {
    lineAdditions = lineAdditions + file.additions;
    lineDeletions = lineDeletions + file.deletions;
  });

  return (
    <View style={(styles.container, styles.borderBottom)}>

      {issue.repository_url &&
        <ListItem
          title={issue.repository_url.replace(
            "https://api.github.com/repos/",
            ""
          )}
          titleStyle={styles.titleSmall}
          leftIcon={{
            name: "repo",
            size: 17,
            color: config.colors.grey,
            type: "octicon"
          }}
          onPress={() => onRepositoryPress(issue.repository_url)}
          hideChevron
        />}

      <View style={styles.headerContainer}>
        <ListItem
          title={issue.title}
          titleStyle={styles.title}
          subtitle={moment(issue.created_at).fromNow()}
          containerStyle={styles.listItemContainer}
          leftIcon={{
            name: issue.pull_request ? "git-pull-request" : "issue-opened",
            size: 36,
            color: config.colors.grey,
            type: "octicon"
          }}
          hideChevron
        />
        <IssueStateBadge style={styles.badge} issue={issue} />
      </View>

      {issue.pull_request &&
        <View style={styles.diffBlocksContainer}>

          {isPendingDiff &&
            <ActivityIndicator animating={isPendingDiff} size="small" />}

          {!isPendingDiff &&
            (lineAdditions !== 0 || lineDeletions !== 0) &&
            <DiffBlocks
              additions={lineAdditions}
              deletions={lineDeletions}
              showNumbers
              onPress={() =>
                navigation.navigate("PullDiff", {
                  diff: diff
                })}
            />}
        </View>}

      {issue.labels &&
        issue.labels.length > 0 &&
        <View style={styles.labelButtonGroup}>
          {renderLabelButtons(issue.labels)}
        </View>}
      {issue.assignees &&
        issue.assignees.length > 0 &&
        <View style={styles.assigneesSection}>
          <MembersList
            title="Assignees"
            members={issue.assignees}
            containerStyle={{ marginTop: 0, paddingTop: 0, paddingLeft: 0 }}
            smallTitle
            navigation={navigation}
          />
        </View>}
    </View>
  );
};

const renderLabelButtons = labels => {
  return labels
    .slice(0, 3)
    .map((label, i) => <LabelButton key={i} label={label} />);
};

const styles = StyleSheet.create({
  container: {
    // paddingBottom: 5,
    // borderBottomWidth: 2,
    // borderBottomColor: config.colors.greyLight,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: config.colors.greyLight
  },
  title: {
    color: config.colors.primarydark,
    fontFamily: "AvenirNext-DemiBold"
  },
  titleSmall: {
    color: config.colors.primarydark,
    fontFamily: "AvenirNext-DemiBold",
    fontSize: 12
  },
  listItemContainer: {
    borderBottomWidth: 0,
    flex: 1
  },
  diffBlocksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
    paddingBottom: 10
  },
  badge: {
    flex: 0.15,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  labelButtonGroup: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginLeft: 54,
    paddingBottom: 15
  },
  assigneesSection: {
    marginLeft: 54,
    paddingBottom: 5
  }
});
