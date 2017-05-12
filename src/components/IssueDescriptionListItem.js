import React, { PropTypes } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { ListItem } from "react-native-elements";

import IssueStateBadge from "./IssueStateBadge";
import MembersList from "./MembersList";
import LabelButton from "./LabelButton";
import DiffBlocks from "../components/DiffBlocks";

import colors from "../config/colors";
import Parse from "parse-diff";
import moment from "moment";

const IssueDescriptionListItem = ({
  issue,
  diff,
  isPendingDiff,
  onRepositoryPress,
  navigation
}) => {
  const filesChanged = Parse(diff);

  let lineAdditions = 0;
  let lineDeletions = 0;

  filesChanged.forEach(function(file) {
    lineAdditions = lineAdditions + file.additions;
    lineDeletions = lineDeletions + file.deletions;
  });

  return (
    <View style={(styles.container, styles.borderBottom)}>
      <ListItem
        title={issue.repository_url.replace(
          "https://api.github.com/repos/",
          ""
        )}
        titleStyle={styles.titleSmall}
        leftIcon={{
          name: "repo",
          color: colors.grey,
          type: "octicon"
        }}
        onPress={() => onRepositoryPress(issue.repository_url)}
        hideChevron
      />

      <View style={styles.headerContainer}>
        <ListItem
          title={issue.title}
          titleStyle={styles.title}
          subtitle={moment(issue.created_at).fromNow()}
          containerStyle={styles.listItemContainer}
          leftIcon={{
            name: issue.pull_request ? "git-pull-request" : "issue-opened",
            size: 36,
            color: colors.grey,
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

IssueDescriptionListItem.propTypes = {
  issue: PropTypes.object,
  diff: PropTypes.string,
  onRepositoryPress: PropTypes.func,
  isPendingDiff: PropTypes.bool,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    // paddingBottom: 5,
    // borderBottomWidth: 2,
    // borderBottomColor: colors.greyLight,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight
  },
  title: {
    color: colors.primarydark,
    fontFamily: "AvenirNext-DemiBold"
  },
  titleSmall: {
    color: colors.primarydark,
    fontFamily: "AvenirNext-DemiBold",
    fontSize: 14
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

export default IssueDescriptionListItem;
