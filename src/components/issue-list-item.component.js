import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import moment from 'moment/min/moment-with-locales.min';

import { colors, fonts, normalize } from 'config';
import { translate } from 'utils';

type Props = {
  type: string,
  issue: Object,
  navigation: Object,
  language: string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    ...fonts.fontPrimarySemiBold,
  },
  subtitle: {
    marginTop: 2,
    marginRight: -30,
    fontSize: normalize(12),
    fontWeight: '400',
    color: colors.greyBlue,
  },
  commentsContainer: {
    flexDirection: 'row',
    paddingTop: 13,
  },
  comments: {
    paddingLeft: 5,
    fontSize: normalize(12),
    color: colors.greyBlue,
  },
});

const getIconName = (type, issue) => {
  if (type === 'issue') {
    return issue.state === 'CLOSED' ? 'issue-closed' : 'issue-opened';
  }

  return 'git-pull-request';
};

export const IssueListItem = ({ type, issue, navigation, language }: Props) =>
  <TouchableHighlight
    style={issue.state === 'CLOSED' && styles.closedIssue}
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
          issue.state === 'OPEN'
            ? translate('issue.main.openIssueSubTitle', language, {
                number: issue.number,
                user: issue.author.login,
                time: moment(issue.createdAt).fromNow(),
              })
            : translate('issue.main.closedIssueSubTitle', language, {
                number: issue.number,
                user: issue.author.login,
                time: moment(issue.lastEditedAt).fromNow(),
              })
        }
        leftIcon={{
          name: getIconName(type, issue),
          size: 36,
          color: issue.state === 'OPEN' ? colors.green : colors.red,
          type: 'octicon',
        }}
        hideChevron
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
      />
      <View style={styles.commentsContainer}>
        <Icon name="comment" type="octicon" size={18} color={colors.grey} />
        <Text style={styles.comments}>
          {issue.comments.totalCount}
        </Text>
      </View>
    </View>
  </TouchableHighlight>;
