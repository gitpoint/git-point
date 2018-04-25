/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  StyleSheet,
  RefreshControl,
  Share,
  ActivityIndicator,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import { RestClient } from 'api';
import {
  ViewContainer,
  LoadingRepositoryProfile,
  RepositoryProfile,
  MembersList,
  SectionList,
  ParallaxScroll,
  LoadingUserListItem,
  UserListItem,
  IssueListItem,
  LoadingMembersList,
  TopicsList,
} from 'components';
import { t, openURLInView, toOldIssueFormat, toOldUserFormat } from 'utils';
import { colors, fonts } from 'config';

const mapStateToProps = (state, ownProps) => {
  const {
    auth: { user, locale },
    entities: { gqlRepos, users, repos },
    pagination: { REPOS_GET_CONTRIBUTORS },
  } = state;

  const params = ownProps.navigation.state.params;

  const repoId =
    params.repoId ||
    params.repository.url
      .replace('https://api.github.com/repos/', '')
      .toLowerCase();

  const repository = gqlRepos[repoId] || repos[repoId] || params.repository;

  const contributorsPagination = REPOS_GET_CONTRIBUTORS[repoId] || {
    ids: [],
    isFetching: true,
  };
  const contributors = contributorsPagination.ids.map(id => users[id]);

  return {
    username: user.login,
    contributors,
    contributorsPagination,
    repository,
    repoId,
    locale,
  };
};

const mapDispatchToProps = {
  getRepoById: RestClient.graphql.getRepo,
  getContributors: RestClient.repos.getContributors,
  starRepo: RestClient.activity.starRepo,
  unstarRepo: RestClient.activity.unstarRepo,
  watchRepo: RestClient.activity.watchRepo,
  unwatchRepo: RestClient.activity.unwatchRepo,
  forkRepo: RestClient.repos.fork,
};

const LoadingMembersContainer = styled.View`
  padding: 5px;
`;

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
  listContainerStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
});

class Repository extends Component {
  props: {
    getRepoById: Function,
    getContributors: Function,
    starRepo: Function,
    unstarRepo: Function,
    watchRepo: Function,
    unwatchRepo: Function,
    forkRepo: Function,
    repository: Object,
    repoId: String,
    contributors: Array,
    contributorsPagination: Object,
    navigation: Object,
    username: string,
    locale: string,
  };

  state: {
    refreshing: boolean,
    isChangingStar: boolean,
    isChangingSubscription: boolean,
    hasError: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isChangingStar: false,
      isChangingSubscription: false,
      hasError: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    const { repoId, getRepoById, getContributors } = this.props;

    getRepoById(repoId)
      .then(() => {
        getContributors(repoId);
      })
      .catch(error => {
        this.setState({ hasError: true, errorMessage: error });
      });
  }

  showMenuActionSheet = () => {
    this.ActionSheet.show();
  };

  handlePress = index => {
    const {
      repository,
      repoId,
      forkRepo,
      starRepo,
      unstarRepo,
      watchRepo,
      unwatchRepo,
      navigation,
      username,
    } = this.props;

    const showFork = repository.owner.login !== username;

    if (index === 0) {
      this.setState({ isChangingStar: true });
      if (repository.viewerHasStarred) {
        unstarRepo(repoId).then(() => this.setState({ isChangingStar: false }));
      } else {
        starRepo(repoId).then(() => this.setState({ isChangingStar: false }));
      }
    } else if (index === 1 && showFork) {
      forkRepo(repoId).then(() => {
        navigation.navigate('Repository', {
          repoId: `${username}/${repository.name}`,
        });
      });
    } else if ((index === 2 && showFork) || (index === 1 && !showFork)) {
      this.setState({ isChangingSubscription: true });
      if (repository.viewerSubscription === 'SUBSCRIBED') {
        unwatchRepo(repoId).then(() =>
          this.setState({ isChangingSubscription: false })
        );
      } else {
        watchRepo(repoId).then(() =>
          this.setState({ isChangingSubscription: false })
        );
      }
    } else if ((index === 3 && showFork) || (index === 2 && !showFork)) {
      this.shareRepository(repository);
    } else if ((index === 4 && showFork) || (index === 3 && !showFork)) {
      openURLInView(repository.webUrl);
    }
  };

  fetchRepoInfo = () => {
    const { repoId } = this.props;

    this.setState({ refreshing: true });
    Promise.all([
      this.props.getRepoById(repoId),
      this.props.getContributors(repoId, { forceRefresh: true }),
    ]).then(() => {
      this.setState({ refreshing: false });
    });
  };

  shareRepository = repository => {
    const { locale } = this.props;
    const title = t('Share {repoName}', locale, {
      repoName: repository.name,
    });

    Share.share(
      {
        title,
        message: t('Check out {repoName} on GitHub. {repoUrl}', locale, {
          repoName: repository.name,
          repoUrl: repository.webUrl,
        }),
        url: undefined,
      },
      {
        dialogTitle: title,
        excludedActivityTypes: [],
      }
    );
  };

  renderLoadingMembers = () => {
    if (this.props.contributorsPagination.nextPageUrl === null) {
      return null;
    }

    return (
      <LoadingMembersContainer>
        <ActivityIndicator animating size="small" />
      </LoadingMembersContainer>
    );
  };

  render() {
    const {
      repository,
      repoId,
      contributors,
      contributorsPagination,
      locale,
      navigation,
      username,
    } = this.props;
    const { refreshing, hasError } = this.state;

    const isPendingRepository =
      !repository || typeof repository.openPullRequestsPreview === 'undefined';

    const isPendingContributors =
      contributors.length === 0 && contributorsPagination.isFetching;

    const openPulls = isPendingRepository
      ? []
      : repository.openPullRequestsPreview.nodes;
    const openIssues = isPendingRepository
      ? []
      : repository.openIssuesPreview.nodes;

    const showFork =
      repository && repository.owner && repository.owner.login !== username;

    const repositoryActions = repository
      ? [
          repository.viewerHasStarred ? t('Unstar', locale) : t('Star', locale),
          repository.viewerSubscription === 'SUBSCRIBED'
            ? t('Unwatch', locale)
            : t('Watch', locale),
          t('Share', locale),
          t('Open in Browser', locale),
        ]
      : [];

    const pullRequestCount =
      !isPendingRepository && repository.pullRequests
        ? repository.pullRequests.totalCount
        : 0;
    const pureIssuesCount =
      !isPendingRepository && repository.issues
        ? repository.issues.totalCount
        : 0;

    if (showFork) {
      repositoryActions.splice(1, 0, t('Fork', locale));
    }

    const showReadMe = !isPendingRepository && repository.README !== null;

    return (
      <ViewContainer>
        <ParallaxScroll
          renderContent={() => {
            if (isPendingRepository) {
              return <LoadingRepositoryProfile locale={locale} />;
            }

            return (
              <RepositoryProfile
                repository={repository}
                isChangingStar={this.state.isChangingStar}
                isChangingSubscription={this.state.isChangingSubscription}
                navigation={navigation}
                hasError={hasError}
                locale={locale}
              />
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.fetchRepoInfo}
            />
          }
          stickyTitle={isPendingRepository ? repoId : repository.name}
          showMenu={!isPendingRepository}
          menuAction={this.showMenuActionSheet}
          navigation={navigation}
          navigateBack
        >
          {!hasError &&
            !isPendingRepository &&
            repository.repositoryTopics &&
            repository.repositoryTopics.nodes.length > 0 && (
              <TopicsList
                title={t('TOPICS', locale)}
                topics={repository.repositoryTopics.nodes.map(
                  topic => topic.topic.name
                )}
              />
            )}

          {!hasError &&
            isPendingRepository && (
              <SectionList title={t('OWNER', locale)}>
                <LoadingUserListItem />
              </SectionList>
            )}

          {!hasError &&
            !isPendingRepository && (
              <SectionList title={t('OWNER', locale)}>
                <UserListItem
                  user={toOldUserFormat(repository.owner)}
                  navigation={navigation}
                />
              </SectionList>
            )}

          {!hasError &&
            (isPendingRepository || isPendingContributors) && (
              <LoadingMembersList title={t('CONTRIBUTORS', locale)} />
            )}

          {!hasError &&
            !isPendingContributors && (
              <MembersList
                title={t('CONTRIBUTORS', locale)}
                members={contributors}
                noMembersMessage={t('No contributors found', locale)}
                navigation={navigation}
                onEndReached={() =>
                  this.props.getContributors(repoId, { loadMore: true })
                }
                onEndReachedThreshold={0.5}
                ListFooterComponent={this.renderLoadingMembers}
              />
            )}

          {!hasError && (
            <SectionList title={t('SOURCE', locale)}>
              {showReadMe && (
                <ListItem
                  title={t('README', locale)}
                  leftIcon={{
                    name: 'book',
                    color: colors.grey,
                    type: 'octicon',
                  }}
                  titleStyle={styles.listTitle}
                  containerStyle={styles.listContainerStyle}
                  onPress={() =>
                    navigation.navigate('ReadMe', {
                      repository,
                    })
                  }
                  underlayColor={colors.greyLight}
                />
              )}
              <ListItem
                title={t('View Code', locale)}
                titleStyle={styles.listTitle}
                containerStyle={styles.listContainerStyle}
                leftIcon={{
                  name: 'code',
                  color: colors.grey,
                  type: 'octicon',
                }}
                onPress={() =>
                  navigation.navigate('RepositoryCodeList', {
                    title: t('Code', locale),
                    topLevel: true,
                    contentsUrl: `https://api.github.com/repos/${repoId}/contents`,
                  })
                }
                underlayColor={colors.greyLight}
                disabled={isPendingRepository}
              />
            </SectionList>
          )}

          {!hasError &&
            !isPendingRepository &&
            repository.hasIssuesEnabled && (
              <SectionList
                title={t('ISSUES', locale)}
                noItems={openIssues.length === 0}
                noItemsMessage={
                  pureIssuesCount === 0
                    ? t('No issues', locale)
                    : t('No open issues', locale)
                }
                showButton
                buttonTitle={
                  pureIssuesCount > 0
                    ? t('View All', locale)
                    : t('New Issue', locale)
                }
                buttonAction={() => {
                  if (pureIssuesCount > 0) {
                    navigation.navigate('IssueList', {
                      title: t('Issues', locale),
                      type: 'issue',
                      issues: repository.issues.nodes.map(issue =>
                        toOldIssueFormat(issue)
                      ),
                    });
                  } else {
                    navigation.navigate('NewIssue', {
                      title: t('New Issue', locale),
                    });
                  }
                }}
              >
                {openIssues.map(item => (
                  <IssueListItem
                    key={item.id}
                    type="issue"
                    issue={toOldIssueFormat(item, repoId)}
                    navigation={navigation}
                  />
                ))}
              </SectionList>
            )}

          {!hasError &&
            !isPendingRepository && (
              <SectionList
                title={t('PULL REQUESTS', locale)}
                noItems={openPulls.length === 0}
                noItemsMessage={
                  pullRequestCount === 0
                    ? t('No pull requests', locale)
                    : t('No open pull requests', locale)
                }
                showButton={pullRequestCount > 0}
                buttonTitle={t('View All', locale)}
                buttonAction={() =>
                  navigation.navigate('PullList', {
                    title: t('Pull Requests', locale),
                    type: 'pull',
                    issues: repository.pullRequests.nodes.map(issue =>
                      toOldIssueFormat(issue, repoId, true)
                    ),
                  })
                }
              >
                {openPulls.map(item => (
                  <IssueListItem
                    key={item.id}
                    type="pull"
                    issue={toOldIssueFormat(item, repoId, true)}
                    navigation={navigation}
                    locale={locale}
                  />
                ))}
              </SectionList>
            )}
        </ParallaxScroll>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={t('Repository Actions', locale)}
          options={[...repositoryActions, t('Cancel', locale)]}
          cancelButtonIndex={repositoryActions.length}
          onPress={this.handlePress}
        />
      </ViewContainer>
    );
  }
}

export const RepositoryScreen = connect(mapStateToProps, mapDispatchToProps)(
  Repository
);
