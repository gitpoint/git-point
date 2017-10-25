import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import moment from 'moment/min/moment-with-locales.min';
import styled from 'styled-components/native';

import { colors, fonts, normalize } from 'config';
import { translate } from 'utils';

type Props = {
  type: string,
  issue: Object,
  navigation: Object,
  locale: string,
};

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding-right: 10;
  padding: 5;
  border-bottom-width: 1;
  border-bottom-color: ${colors.greyLight};
`;

const CommentsContainer = styled.View`
  flex-direction: row;
  padding-top: 13;
`;

const Comments = styled.Text`
  padding-left: 5;
  font-size: ${normalize(12)}
  color: ${colors.greyBlue}
`;

const styles = StyleSheet.create({
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
});

const getIconName = (type, issue) => {
  if (type === 'issue') {
    return issue.state === 'closed' ? 'issue-closed' : 'issue-opened';
  }

  return 'git-pull-request';
};

export const IssueListItem = ({ type, issue, navigation, locale }: Props) => (
  <TouchableHighlight
    style={issue.state === 'closed' && styles.closedIssue}
    onPress={() =>
      navigation.navigate('Issue', {
        issue,
        isPR: !!issue.pull_request,
        locale,
      })}
    underlayColor={colors.greyLight}
  >
    <Container>
      <ListItem
        containerStyle={styles.listItemContainer}
        title={issue.title}
        subtitle={
          issue.state === 'open'
            ? translate('issue.main.openIssueSubTitle', locale, {
                number: issue.number,
                user: issue.user.login,
                time: moment(issue.created_at).fromNow(),
              })
            : translate('issue.main.closedIssueSubTitle', locale, {
                number: issue.number,
                user: issue.user.login,
                time: moment(issue.closed_at).fromNow(),
              })
        }
        leftIcon={{
          name: getIconName(type, issue),
          size: 36,
          color: issue.state === 'open' ? colors.green : colors.red,
          type: 'octicon',
        }}
        hideChevron
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
      />
      <CommentsContainer>
        <Icon name="comment" type="octicon" size={18} color={colors.grey} />
        <Comments>{issue.comments}</Comments>
      </CommentsContainer>
    </Container>
  </TouchableHighlight>
);
