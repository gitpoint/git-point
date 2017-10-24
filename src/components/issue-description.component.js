import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import { ListItem } from 'react-native-elements';

import Parse from 'parse-diff';
import moment from 'moment/min/moment-with-locales.min';

import {
  StateBadge,
  MembersList,
  LabelButton,
  DiffBlocks,
  Button,
} from 'components';
import { translate } from 'utils';
import { colors, fonts, normalize } from 'config';
import { v3 } from 'api';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
  },
  title: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
  },
  titleSmall: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
    fontSize: normalize(10),
  },
  listItemContainer: {
    borderBottomWidth: 0,
    flex: 1,
  },
  diffBlocksContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  badge: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  labelButtonGroup: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: 54,
    paddingBottom: 15,
  },
  assigneesSection: {
    marginLeft: 54,
    paddingBottom: 5,
  },
  mergeButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
});

export class IssueDescription extends Component {
  props: {
    issue: Object,
    diff: string,
    commits: Array,
    isMergeable: boolean,
    isMerged: boolean,
    isPendingDiff: boolean,
    isPendingCommit: boolean,
    isPendingCheckMerge: boolean,
    onRepositoryPress: Function,
    userHasPushPermission: boolean,
    locale: string,
    navigation: Object,
  };

  navigateToCommitList = () => {
    const { commits } = this.props;

    if (commits.length > 1) {
      this.props.navigation.navigate('CommitList', {
        title: translate('repository.commitList.title', this.props.language),
        commits,
      });
    } else {
      this.props.navigation.navigate('Commit', {
        commit: commits[0],
        title: commits[0].sha.substring(0, 7),
      });
    }
  };

  renderLabelButtons = labels => {
    return labels
      .slice(0, 3)
      .map(label => <LabelButton key={label.id} label={label} />);
  };

  render() {
    const {
      diff,
      issue,
      commits,
      isMergeable,
      isMerged,
      isPendingDiff,
      isPendingCommit,
      isPendingCheckMerge,
      onRepositoryPress,
      userHasPushPermission,
      locale,
      navigation,
    } = this.props;

    const filesChanged = Parse(diff);

    let lineAdditions = 0;
    let lineDeletions = 0;

    filesChanged.forEach(file => {
      lineAdditions += file.additions;
      lineDeletions += file.deletions;
    });

    return (
      <View style={(styles.container, styles.borderBottom)}>
        {issue.repository_url &&
          <ListItem
            title={issue.repository_url.replace(`${v3.root}/repos/`, '')}
            titleStyle={styles.titleSmall}
            leftIcon={{
              name: 'repo',
              size: 17,
              color: colors.grey,
              type: 'octicon',
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
              name: issue.pull_request ? 'git-pull-request' : 'issue-opened',
              size: 36,
              color: colors.grey,
              type: 'octicon',
            }}
            hideChevron
          />

          {!issue.pull_request ||
            (issue.pull_request &&
              !isPendingCheckMerge &&
              <StateBadge
                style={styles.badge}
                issue={issue}
                isMerged={isMerged && issue.pull_request}
                locale={locale}
              />)}
        </View>

        {issue.pull_request &&
          <View style={styles.diffBlocksContainer}>
            {isPendingCommit &&
              <ActivityIndicator animating={isPendingCommit} size="small" />}

            {isPendingDiff &&
              <ActivityIndicator animating={isPendingDiff} size="small" />}

            {!isPendingCommit &&
              <TouchableHighlight
                onPress={() => this.navigateToCommitList()}
                underlayColor={colors.greyLight}
              >
                <Text>{`${commits.length} commits`}</Text>
              </TouchableHighlight>}

            {!isPendingDiff &&
              (lineAdditions !== 0 || lineDeletions !== 0) &&
              <DiffBlocks
                additions={lineAdditions}
                deletions={lineDeletions}
                showNumbers
                onPress={() =>
                  navigation.navigate('PullDiff', {
                    title: translate('repository.pullDiff.title', locale),
                    locale,
                    diff,
                  })}
              />}
          </View>}

        {issue.labels &&
          issue.labels.length > 0 &&
          <View style={styles.labelButtonGroup}>
            {this.renderLabelButtons(issue.labels)}
          </View>}
        {issue.assignees &&
          issue.assignees.length > 0 &&
          <View style={styles.assigneesSection}>
            <MembersList
              title={translate('issue.main.assignees', locale)}
              members={issue.assignees}
              containerStyle={{ marginTop: 0, paddingTop: 0, paddingLeft: 0 }}
              smallTitle
              navigation={navigation}
            />
          </View>}

        {issue.pull_request &&
          !isMerged &&
          issue.state === 'open' &&
          userHasPushPermission &&
          <View style={styles.mergeButtonContainer}>
            <Button
              type={isMergeable ? 'success' : 'default'}
              icon={{ name: 'git-merge', type: 'octicon' }}
              disabled={!isMergeable}
              onPress={() =>
                navigation.navigate('PullMerge', {
                  title: translate('issue.pullMerge.title', locale),
                })}
              title={translate('issue.main.mergeButton', locale)}
            />
          </View>}
      </View>
    );
  }
}
