import React, { Component } from 'react';
import { Text, ActivityIndicator, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';

import Parse from 'parse-diff';
import styled from 'styled-components';

import {
  StateBadge,
  MembersList,
  InlineLabel,
  DiffBlocks,
  Button,
} from 'components';
import { t, relativeTimeToNow } from 'utils';
import { colors, fonts, normalize } from 'config';
import { v3 } from 'api';

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 10;
`;

const ContainerBorderBottom = styled.View`
  border-bottom-width: 1;
  border-bottom-color: ${colors.greyLight};
`;

const RepoLink = styled(ListItem).attrs({
  titleStyle: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
    fontSize: normalize(10),
  },
  leftIconContainerStyle: {
    flex: 0,
  },
  containerStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
})``;

const IssueTitle = styled(ListItem).attrs({
  titleStyle: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
  },
  containerStyle: {
    borderBottomWidth: 0,
    flex: 1,
  },
  titleNumberOfLines: 0,
})``;

const DiffBlocksContainer = styled.View`
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  padding-left: 10;
  padding-right: 10;
  padding-bottom: 10;
`;

const LabelButtonGroup = styled.View`
  flex-flow: row wrap;
  margin-left: 54;
  padding-bottom: 15;
`;

const AssigneesSection = styled.View`
  margin-left: 54;
  padding-bottom: 5;
`;

const MergeButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 15;
  padding-bottom: 15;
`;

export class IssueDescription extends Component {
  props: {
    issue: Object,
    repository: Object,
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
    const { commits, locale } = this.props;

    if (commits.length > 1) {
      this.props.navigation.navigate('CommitList', {
        title: t('Commits', locale),
        commits,
        locale,
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
      .map(label => <InlineLabel key={label.id} label={label} />);
  };

  render() {
    const {
      diff,
      issue,
      commits,
      repository,
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
      <ContainerBorderBottom>
        {issue.repository_url && (
          <RepoLink
            title={issue.repository_url.replace(`${v3.root}/repos/`, '')}
            leftIcon={{
              name: 'repo',
              size: 17,
              color: colors.grey,
              type: 'octicon',
            }}
            onPress={() => onRepositoryPress(issue.repository_url)}
            hideChevron
          />
        )}

        <HeaderContainer>
          <IssueTitle
            title={issue.title}
            subtitle={relativeTimeToNow(issue.created_at)}
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
              !isPendingCheckMerge && (
                <StateBadge
                  issue={issue}
                  isMerged={isMerged && issue.pull_request}
                  locale={locale}
                />
              ))}
        </HeaderContainer>

        {issue.pull_request && (
          <DiffBlocksContainer>
            {isPendingCommit && (
              <ActivityIndicator animating={isPendingCommit} size="small" />
            )}

            {isPendingDiff && (
              <ActivityIndicator animating={isPendingDiff} size="small" />
            )}

            {!isPendingCommit && (
              <TouchableHighlight
                onPress={() => this.navigateToCommitList()}
                underlayColor={colors.greyLight}
              >
                <Text>{`${commits.length} commits`}</Text>
              </TouchableHighlight>
            )}

            {!isPendingDiff &&
              (lineAdditions !== 0 || lineDeletions !== 0) && (
                <DiffBlocks
                  additions={lineAdditions}
                  deletions={lineDeletions}
                  showNumbers
                  onPress={() =>
                    navigation.navigate('PullDiff', {
                      title: t('Diff', locale),
                      locale,
                      diff,
                    })
                  }
                />
              )}
          </DiffBlocksContainer>
        )}

        {issue.labels &&
          issue.labels.length > 0 && (
            <LabelButtonGroup>
              {this.renderLabelButtons(issue.labels)}
            </LabelButtonGroup>
          )}
        {issue.assignees &&
          issue.assignees.length > 0 && (
            <AssigneesSection>
              <MembersList
                title={t('Assignees', locale)}
                members={issue.assignees}
                containerStyle={{ marginTop: 0, paddingTop: 0, paddingLeft: 0 }}
                smallTitle
                navigation={navigation}
              />
            </AssigneesSection>
          )}

        {issue.pull_request &&
          !isMerged &&
          issue.state === 'open' &&
          userHasPushPermission && (
            <MergeButtonContainer>
              <Button
                type={isMergeable ? 'success' : 'default'}
                icon={{ name: 'git-merge', type: 'octicon' }}
                disabled={!isMergeable}
                onPress={() =>
                  navigation.navigate('PullMerge', {
                    title: t('Merge Pull Request', locale),
                    issue,
                    repository,
                  })
                }
                title={t('Merge Pull Request', locale)}
              />
            </MergeButtonContainer>
          )}
      </ContainerBorderBottom>
    );
  }
}
