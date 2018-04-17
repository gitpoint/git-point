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
import Toast from 'react-native-simple-toast';
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
import { translate, openURLInView } from 'utils';
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
    // repositoryName: string,
    repository: Object,
    repoId: String,
    contributors: Array,
    contributorsPagination: Object,
    hasRepoExist: boolean,
    navigation: Object,
    username: string,
    locale: string,
    error: Object,
  };

  state: {
    refreshing: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    const repoId = this.props.repoId;

    this.props.getRepoById(repoId);
    this.props.getContributors(repoId);
  }

  componentDidUpdate() {
    if (false && !this.props.hasRepoExist && this.props.error.message) {
      Toast.showWithGravity(this.props.error.message, Toast.LONG, Toast.CENTER);
    }
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
      if (repository.isStarred) {
        unstarRepo(repoId);
      } else {
        starRepo(repoId);
      }
    } else if (index === 1 && showFork) {
      forkRepo(repoId).then(() => {
        navigation.navigate('Repository', {
          repoId: `${username}/${repository.name}`,
        });
      });
    } else if ((index === 2 && showFork) || (index === 1 && !showFork)) {
      if (repository.isSubscribed) {
        unwatchRepo(repoId);
      } else {
        watchRepo(repoId);
      }
    } else if ((index === 3 && showFork) || (index === 2 && !showFork)) {
      this.shareRepository(repository);
    } else if ((index === 4 && showFork) || (index === 3 && !showFork)) {
      openURLInView(repository.html_url);
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
    const title = translate('repository.main.shareRepositoryTitle', locale, {
      repoName: repository.name,
    });

    Share.share(
      {
        title,
        message: translate('repository.main.shareRepositoryMessage', locale, {
          repoName: repository.name,
          repoUrl: repository.html_url,
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
    const { refreshing } = this.state;

    const isPendingRepository =
      typeof repository.openPullRequestsPreview === 'undefined';

    const isPendingContributors =
      contributors.length === 0 && contributorsPagination.isFetching;

    const hasRepoExist = true;

    const initalRepository = navigation.state.params.repository;

    const openPulls = isPendingRepository
      ? []
      : repository.openPullRequestsPreview;
    const openIssues = isPendingRepository ? [] : repository.openIssuesPreview;

    const showFork =
      repository && repository.owner && repository.owner.login !== username;

    const repositoryActions = [
      repository.isStarred
        ? translate('repository.main.unstarAction', locale)
        : translate('repository.main.starAction', locale),
      repository.isSubscribed
        ? translate('repository.main.unwatchAction', locale)
        : translate('repository.main.watchAction', locale),
      translate('repository.main.shareAction', locale),
      translate('common.openInBrowser', locale),
    ];

    const pullRequestCount = repository.pullRequestsCount || 0;
    const pureIssuesCount = repository.issuesCount || 0;

    if (showFork) {
      repositoryActions.splice(
        1,
        0,
        translate('repository.main.forkAction', locale)
      );
    }

    const showReadMe = !isPendingRepository && repository.hasReadme;

    return (
      <ViewContainer>
        <ParallaxScroll
          renderContent={() => {
            if (isPendingRepository && !initalRepository) {
              return <LoadingRepositoryProfile locale={locale} />;
            }

            return (
              <RepositoryProfile
                repository={isPendingRepository ? initalRepository : repository}
                loading={isPendingRepository}
                navigation={navigation}
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
          stickyTitle={repository.name}
          showMenu={hasRepoExist && !isPendingRepository}
          menuAction={this.showMenuActionSheet}
          navigation={navigation}
          navigateBack
        >
          {repository.topics &&
            repository.topics.length > 0 && (
              <TopicsList
                title={translate('repository.main.topicsTitle', locale)}
                topics={repository.topics}
              />
            )}

          {initalRepository &&
            !initalRepository.owner &&
            isPendingRepository && (
              <SectionList
                title={translate('repository.main.ownerTitle', locale)}
              >
                <LoadingUserListItem />
              </SectionList>
            )}

          {!(initalRepository && initalRepository.owner) &&
            (repository && repository.owner) &&
            !isPendingRepository && (
              <SectionList
                title={translate('repository.main.ownerTitle', locale)}
              >
                <UserListItem user={repository.owner} navigation={navigation} />
              </SectionList>
            )}

          {hasRepoExist &&
            initalRepository &&
            initalRepository.owner && (
              <SectionList
                title={translate('repository.main.ownerTitle', locale)}
              >
                <UserListItem
                  user={initalRepository.owner}
                  navigation={navigation}
                />
              </SectionList>
            )}

          {(isPendingRepository || isPendingContributors) && (
            <LoadingMembersList
              title={translate('repository.main.contributorsTitle', locale)}
            />
          )}

          {!isPendingContributors && (
            <MembersList
              title={translate('repository.main.contributorsTitle', locale)}
              members={contributors}
              noMembersMessage={translate(
                'repository.main.noContributorsMessage',
                locale
              )}
              navigation={navigation}
              onEndReached={() =>
                this.props.getContributors(repoId, { loadMore: true })
              }
              onEndReachedThreshold={0.5}
              ListFooterComponent={this.renderLoadingMembers}
            />
          )}

          <SectionList title={translate('repository.main.sourceTitle', locale)}>
            {showReadMe && (
              <ListItem
                title={translate('repository.main.readMe', locale)}
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
              title={translate('repository.main.viewSource', locale)}
              titleStyle={styles.listTitle}
              containerStyle={styles.listContainerStyle}
              leftIcon={{
                name: 'code',
                color: colors.grey,
                type: 'octicon',
              }}
              onPress={() =>
                navigation.navigate('RepositoryCodeList', {
                  title: translate('repository.codeList.title', locale),
                  topLevel: true,
                  contentsUrl: repository.contents_url,
                })
              }
              underlayColor={colors.greyLight}
              disabled={isPendingRepository}
            />
          </SectionList>

          {repository.hasIssuesEnabled && (
            <SectionList
              title={translate('repository.main.issuesTitle', locale)}
              noItems={openIssues.length === 0}
              noItemsMessage={
                pureIssuesCount === 0
                  ? translate('repository.main.noIssuesMessage', locale)
                  : translate('repository.main.noOpenIssuesMessage', locale)
              }
              showButton
              buttonTitle={
                pureIssuesCount > 0
                  ? translate('repository.main.viewAllButton', locale)
                  : translate('repository.main.newIssueButton', locale)
              }
              buttonAction={() => {
                if (pureIssuesCount > 0) {
                  navigation.navigate('IssueList', {
                    title: translate('repository.issueList.title', locale),
                    type: 'issue',
                    issues: repository.issues,
                  });
                } else {
                  navigation.navigate('NewIssue', {
                    title: translate('issue.newIssue.title', locale),
                  });
                }
              }}
            >
              {openIssues
                .slice(0, 3)
                .map(item => (
                  <IssueListItem
                    key={item.id}
                    type="issue"
                    issue={item}
                    navigation={navigation}
                  />
                ))}
            </SectionList>
          )}

          <SectionList
            title={translate('repository.main.pullRequestTitle', locale)}
            noItems={openPulls.length === 0}
            noItemsMessage={
              pullRequestCount === 0
                ? translate('repository.main.noPullRequestsMessage', locale)
                : translate('repository.main.noOpenPullRequestsMessage', locale)
            }
            showButton={pullRequestCount > 0}
            buttonTitle={translate('repository.main.viewAllButton', locale)}
            buttonAction={() =>
              navigation.navigate('PullList', {
                title: translate('repository.pullList.title', locale),
                type: 'pull',
                issues: repository.pullRequests,
              })
            }
          >
            {openPulls
              .slice(0, 3)
              .map(item => (
                <IssueListItem
                  key={item.id}
                  type="pull"
                  issue={item}
                  navigation={navigation}
                  locale={locale}
                />
              ))}
          </SectionList>
        </ParallaxScroll>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={translate('repository.main.repoActions', locale)}
          options={[...repositoryActions, translate('common.cancel', locale)]}
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
