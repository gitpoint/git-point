import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import moment from 'moment/min/moment-with-locales.min';

import { StateBadge } from 'components';
import { colors, fonts, normalize } from 'config';

type Props = {
  type: string,
  issue: Object,
  navigation: Object,
  language: string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
  },
  closedIssue: {
    backgroundColor: colors.greyVeryLight,
    opacity: 0.6,
  },
  listItemContainer: {
    flex: 1,
    borderBottomWidth: 0,
  },
  title: {
    color: colors.primaryDark,
    ...fonts.fontPrimary,
  },
  commentsContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },
  comments: {
    paddingLeft: 5,
    fontSize: normalize(12),
    color: colors.greyBlue,
  },
  description: {
    marginTop: 2,
    fontSize: normalize(12),
    color: colors.greyBlue,
  },
  badge: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export const IssueListItem = ({ type, issue, navigation, language }: Props) => (
  <TouchableHighlight
    style={issue.state === 'closed' && styles.closedIssue}
    onPress={() =>
      navigation.navigate('Issue', {
        issue,
        isPR: !!issue.pull_request,
        language,
      })}
    underlayColor={colors.greyLight}
  >
    <View style={styles.container}>
      <ListItem
        containerStyle={styles.listItemContainer}
        title={issue.title}
        subtitle={
          <View>
            {!!issue.comments && (
              <View style={styles.commentsContainer}>
                <Icon
                  name="comment"
                  type="octicon"
                  size={15}
                  color={colors.greyDark}
                />
                <Text style={styles.comments}>{issue.comments}</Text>
              </View>
            )}
            <Text style={styles.description} numberOfLines={2}>
              {`#${issue.number} opened ${moment(
                issue.created_at
              ).fromNow()} ago by ${issue.user.login}`}
            </Text>
          </View>
        }
        leftIcon={{
          name: type === 'issue' ? 'issue-opened' : 'git-pull-request',
          size: 36,
          color: colors.grey,
          type: 'octicon',
        }}
        hideChevron
        titleStyle={styles.title}
      />
      <StateBadge style={styles.badge} issue={issue} language={language} />
    </View>
  </TouchableHighlight>
);
