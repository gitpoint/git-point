import React, {PropTypes} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ListItem, Button} from 'react-native-elements';

import IssueStateBadge from './IssueStateBadge';
import MembersList from './MembersList';
import LabelButton from './LabelButton';

import colors from '../config/colors';
import moment from 'moment';

const IssueDescriptionListItem = (
  {
    issue,
    isPendingDiff,
    navigation
  }
) => (
  <View style={styles.container, styles.borderBottom}>
    <View style={styles.headerContainer}>
      <ListItem
        title={issue.title}
        titleStyle={styles.title}
        subtitle={moment(issue.created_at).fromNow()}
        containerStyle={styles.listItemContainer}
        leftIcon={{name: issue.pull_request ? 'git-pull-request' : 'issue-opened', size: 36, color: colors.grey, type: 'octicon'}}
        hideChevron
      />
      <IssueStateBadge style={styles.badge} issue={issue} />
    </View>

    {!isPendingDiff && issue.pull_request && (
        <Button
          title='Diff'
        />
      )
    }

    {issue.labels.length > 0 &&
      <View style={styles.labelButtonGroup}>
        {renderLabelButtons(issue.labels)}
      </View>
    }
    {issue.assignees.length > 0 &&
      <View style={styles.assigneesSection}>
        <MembersList
          title="Assignees"
          members={issue.assignees}
          containerStyle={{marginTop: 0, paddingTop: 0, paddingLeft: 0}}
          smallTitle
          navigation={navigation}
        />
      </View>
    }
  </View>
);

const renderLabelButtons = labels => {
  return labels
    .slice(0, 3)
    .map((label, i) => <LabelButton key={i} label={label} />);
};

IssueDescriptionListItem.propTypes = {
  issue: PropTypes.object,
  isPendingDiff: PropTypes.bool,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    // paddingBottom: 5,
    // borderBottomWidth: 2,
    // borderBottomColor: colors.greyLight,
  },
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
    color: colors.primarydark,
    fontFamily: 'AvenirNext-DemiBold',
  },
  listItemContainer: {
    borderBottomWidth: 0,
    flex: 1,
  },
  badge: {
    flex: 0.15,
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
  }
});

export default IssueDescriptionListItem;
