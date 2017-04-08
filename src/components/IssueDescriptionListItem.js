import React, {PropTypes} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ListItem, Button} from 'react-native-elements';

import IssueStateBadge from './IssueStateBadge';
import colors from '../config/colors';
import moment from 'moment';

const IssueDescriptionListItem = (
  {
    issue,
  }
) => (
  <View style={styles.container}>
    <ListItem
      title={issue.title}
      titleStyle={styles.title}
      subtitle={`Opened 4 days ago `}
      containerStyle={styles.listItemContainer}
      leftIcon={{name: 'issue-opened', size: 36, color: colors.grey, type: 'octicon'}}
      hideChevron
    />
    <IssueStateBadge style={styles.badge} issue={issue} />
  </View>
);

IssueDescriptionListItem.propTypes = {
  issue: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
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
  }
});

export default IssueDescriptionListItem;
