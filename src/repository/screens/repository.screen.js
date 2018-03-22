/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, RefreshControl, Share } from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import Toast from 'react-native-simple-toast';
import { withI18n } from '@lingui/react';
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
  LoadingModal,
  TopicsList,
} from 'components';
import { openURLInView } from 'utils';
import { colors, fonts } from 'config';
import {
  getRepositoryInfo,
  changeStarStatusRepo,
  forkRepo,
  subscribeToRepo,
  unSubscribeToRepo,
} from '../repository.action';

const mapStateToProps = state => ({
  username: state.auth.user.login,
  repository: state.repository.repository,
  contributors: state.repository.contributors,
  issues: state.repository.issues,
  starred: state.repository.starred,
  forked: state.repository.forked,
  subscribed: state.repository.subscribed,
  hasRepoExist: state.repository.hasRepoExist,
  hasReadMe: state.repository.hasReadMe,
  isPendingRepository: state.repository.isPendingRepository,
  isPendingContributors: state.repository.isPendingContributors,
  isPendingIssues: state.repository.isPendingIssues,
  isPendingCheckReadMe: state.repository.isPendingCheckReadMe,
  isPendingCheckStarred: state.repository.isPendingCheckStarred,
  isPendingFork: state.repository.isPendingFork,
  isPendingTopics: state.repository.isPendingTopics,
  isPendingSubscribe: state.repository.isPendingSubscribe,
  topics: state.repository.topics,
  error: state.repository.error,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRepositoryInfo,
      changeStarStatusRepo,
      forkRepo,
      subscribeToRepo,
      unSubscribeToRepo,
    },
    dispatch
  );

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
    getRepositoryInfo: Function,
    changeStarStatusRepo: Function,
    forkRepo: Function,
    // repositoryName: string,
    repository: Object,
    contributors: Array,
    hasRepoExist: boolean,
    hasReadMe: boolean,
    issues: Array,
    starred: boolean,
    // forked: boolean,
    isPendingRepository: boolean,
    isPendingContributors: boolean,
    isPendingCheckReadMe: boolean,
    isPendingIssues: boolean,
    isPendingCheckStarred: boolean,
    isPendingFork: boolean,
    isPendingTopics: boolean,
    isPendingSubscribe: boolean,
    // isPendingCheckForked: boolean,
    navigation: Object,
    username: string,
    i18n: Object,
    subscribed: boolean,
    subscribeToRepo: Function,
    unSubscribeToRepo: Function,
    topics: Array,
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
    const {
      repository: repo,
      repositoryUrl: repoUrl,
    } = this.props.navigation.state.params;

    this.props.getRepositoryInfo(repo ? repo.url : repoUrl);
  }

  componentDidUpdate() {
    if (!this.props.hasRepoExist && this.props.error.message) {
      Toast.showWithGravity(this.props.error.message, Toast.LONG, Toast.CENTER);
    }
  }

  showMenuActionSheet = () => {
    this.ActionSheet.show();
  };

  handlePress = index => {
    const {
      starred,
      subscribed,
      repository,
      changeStarStatusRepo,
      forkRepo,
      navigation,
      username,
    } = this.props;

    const showFork = repository.owner.login !== username;

    if (index === 0) {
      changeStarStatusRepo(repository.owner.login, repository.name, starred);
    } else if (index === 1 && showFork) {
      forkRepo(repository.owner.login, repository.name).then(json => {
        navigation.navigate('Repository', { repository: json });
      });
    } else if ((index === 2 && showFork) || (index === 1 && !showFork)) {
      const subscribeMethod = !subscribed
        ? this.props.subscribeToRepo
        : this.props.unSubscribeToRepo;

      subscribeMethod(repository.owner.login, repository.name);
    } else if ((index === 3 && showFork) || (index === 2 && !showFork)) {
      this.shareRepository(repository);
    } else if ((index === 4 && showFork) || (index === 3 && !showFork)) {
      openURLInView(repository.html_url);
    }
  };

  fetchRepoInfo = () => {
    const {
      repository: repo,
      repositoryUrl: repoUrl,
    } = this.props.navigation.state.params;

    this.setState({ refreshing: true });
    this.props.getRepositoryInfo(repo ? repo.url : repoUrl).finally(() => {
      this.setState({ refreshing: false });
    });
  };

  shareRepository = repository => {
    const { i18n } = this.props;
    const title = i18n.t`Share ${repository.name}`;

    Share.share(
      {
        title,
        message: i18n.t`Check out ${repository.name} on GitHub. ${
          repository.html_url
        }`,
        url: undefined,
      },
      {
        dialogTitle: title,
        excludedActivityTypes: [],
      }
    );
  };

  render() {
    const {
      repository,
      contributors,
      hasRepoExist,
      hasReadMe,
      issues,
      topics,
      starred,
      i18n,
      isPendingRepository,
      isPendingContributors,
      isPendingCheckReadMe,
      isPendingIssues,
      isPendingCheckStarred,
      isPendingFork,
      isPendingSubscribe,
      isPendingTopics,
      navigation,
      username,
      subscribed,
    } = this.props;
    const { refreshing } = this.state;

    const initalRepository = navigation.state.params.repository;
    const pulls = issues.filter(issue => issue.hasOwnProperty('pull_request')); // eslint-disable-line no-prototype-builtins
    const pureIssues = issues.filter(issue => {
      // eslint-disable-next-line no-prototype-builtins
      return !issue.hasOwnProperty('pull_request');
    });

    const openPulls = pulls.filter(pull => pull.state === 'open');
    const openIssues = pureIssues.filter(issue => issue.state === 'open');
    const showFork =
      repository && repository.owner && repository.owner.login !== username;

    const repositoryActions = [
      starred ? i18n.t`Unstar` : i18n.t`Star`,
      subscribed ? i18n.t`Unwatch` : i18n.t`Watch`,
      i18n.t`Share`,
      i18n.t`Open in Browser`,
    ];

    if (showFork) {
      repositoryActions.splice(1, 0, i18n.t`Fork`);
    }

    const loader = isPendingFork ? <LoadingModal /> : null;
    const isSubscribed =
      isPendingRepository || isPendingSubscribe ? false : subscribed;
    const isStarred =
      isPendingRepository || isPendingCheckStarred ? false : starred;

    const showReadMe = !isPendingCheckReadMe && hasReadMe;

    return (
      <ViewContainer>
        {loader}

        <ParallaxScroll
          renderContent={() => {
            if (isPendingRepository && !initalRepository) {
              return <LoadingRepositoryProfile />;
            }

            return (
              <RepositoryProfile
                repository={isPendingRepository ? initalRepository : repository}
                starred={isStarred}
                loading={isPendingRepository}
                navigation={navigation}
                subscribed={isSubscribed}
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
          showMenu={
            hasRepoExist && !isPendingRepository && !isPendingCheckStarred
          }
          menuAction={this.showMenuActionSheet}
          navigation={navigation}
          navigateBack
        >
          {!isPendingTopics &&
            topics.length > 0 && (
              <TopicsList title={i18n.t`TOPICS`} topics={topics} />
            )}

          {initalRepository &&
            !initalRepository.owner &&
            isPendingRepository && (
              <SectionList title={i18n.t`OWNER`}>
                <LoadingUserListItem />
              </SectionList>
            )}

          {!(initalRepository && initalRepository.owner) &&
            (repository && repository.owner) &&
            !isPendingRepository && (
              <SectionList title={i18n.t`OWNER`}>
                <UserListItem user={repository.owner} navigation={navigation} />
              </SectionList>
            )}

          {hasRepoExist &&
            initalRepository &&
            initalRepository.owner && (
              <SectionList title={i18n.t`OWNER`}>
                <UserListItem
                  user={initalRepository.owner}
                  navigation={navigation}
                />
              </SectionList>
            )}

          {(isPendingRepository || isPendingContributors) && (
            <LoadingMembersList title={i18n.t`CONTRIBUTORS`} />
          )}

          {!isPendingContributors && (
            <MembersList
              title={i18n.t`CONTRIBUTORS`}
              members={contributors}
              noMembersMessage={i18n.t`No contributors found`}
              navigation={navigation}
            />
          )}

          <SectionList title={i18n.t`SOURCE`}>
            {showReadMe && (
              <ListItem
                title={i18n.t`README`}
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
              title={i18n.t`View Code`}
              titleStyle={styles.listTitle}
              containerStyle={styles.listContainerStyle}
              leftIcon={{
                name: 'code',
                color: colors.grey,
                type: 'octicon',
              }}
              onPress={() =>
                navigation.navigate('RepositoryCodeList', {
                  title: i18n.t`Code`,
                  topLevel: true,
                })
              }
              underlayColor={colors.greyLight}
              disabled={!hasRepoExist}
            />
          </SectionList>

          {!repository.fork &&
            repository.has_issues && (
              <SectionList
                loading={isPendingIssues}
                title={i18n.t`ISSUES`}
                noItems={openIssues.length === 0}
                noItemsMessage={
                  pureIssues.length === 0
                    ? i18n.t`No issues`
                    : i18n.t`No open issues`
                }
                showButton
                buttonTitle={
                  pureIssues.length > 0 ? i18n.t`View All` : i18n.t`New Issue`
                }
                buttonAction={() => {
                  if (pureIssues.length > 0) {
                    navigation.navigate('IssueList', {
                      title: i18n.t`Issues`,
                      type: 'issue',
                      issues: pureIssues,
                    });
                  } else {
                    navigation.navigate('NewIssue', {
                      title: i18n.t`New Issue`,
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
            loading={isPendingIssues}
            title={i18n.t`PULL REQUESTS`}
            noItems={openPulls.length === 0}
            noItemsMessage={
              pulls.length === 0
                ? i18n.t`No pull requests`
                : i18n.t`No open pull requests`
            }
            showButton={pulls.length > 0}
            buttonTitle={i18n.t`View All`}
            buttonAction={() =>
              navigation.navigate('PullList', {
                title: i18n.t`Pull Requests`,
                type: 'pull',
                issues: pulls,
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
                />
              ))}
          </SectionList>
        </ParallaxScroll>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={i18n.t`Repository Actions`}
          options={[...repositoryActions, i18n.t`Cancel`]}
          cancelButtonIndex={repositoryActions.length}
          onPress={this.handlePress}
        />
      </ViewContainer>
    );
  }
}

export const RepositoryScreen = connect(mapStateToProps, mapDispatchToProps)(
  withI18n()(Repository)
);
