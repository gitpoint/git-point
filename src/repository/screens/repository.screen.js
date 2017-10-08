/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, RefreshControl, Share } from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';

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
} from 'components';
import { translate, openURLInView } from 'utils';
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
  language: state.auth.language,
  repository: state.repository.repository,
  contributors: state.repository.contributors,
  issues: state.repository.issues,
  starred: state.repository.starred,
  forked: state.repository.forked,
  subscribed: state.repository.subscribed,
  hasReadMe: state.repository.hasReadMe,
  isPendingRepository: state.repository.isPendingRepository,
  isPendingContributors: state.repository.isPendingContributors,
  isPendingIssues: state.repository.isPendingIssues,
  isPendingCheckReadMe: state.repository.isPendingCheckReadMe,
  isPendingCheckStarred: state.repository.isPendingCheckStarred,
  isPendingFork: state.repository.isPendingFork,
  isPendingSubscribe: state.repository.isPendingSubscribe,
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
});

class Repository extends Component {
  props: {
    getRepositoryInfo: Function,
    changeStarStatusRepo: Function,
    forkRepo: Function,
    // repositoryName: string,
    repository: Object,
    contributors: Array,
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
    isPendingSubscribe: boolean,
    // isPendingCheckForked: boolean,
    navigation: Object,
    username: string,
    language: string,
    subscribed: boolean,
    subscribeToRepo: Function,
    unSubscribeToRepo: Function,
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
    this.props.getRepositoryInfo(repo ? repo.url : repoUrl).then(() => {
      this.setState({ refreshing: false });
    });
  };

  shareRepository = repository => {
    const { language } = this.props;
    const title = translate('repository.main.shareRepositoryTitle', language, {
      repoName: repository.name,
    });

    Share.share(
      {
        title,
        message: translate('repository.main.shareRepositoryMessage', language, {
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

  render() {
    const {
      repository,
      contributors,
      hasReadMe,
      issues,
      starred,
      language,
      isPendingRepository,
      isPendingContributors,
      isPendingCheckReadMe,
      isPendingIssues,
      isPendingCheckStarred,
      isPendingFork,
      isPendingSubscribe,
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
    const openIssues = pureIssues.filter(issue => issue.state === 'OPEN');
    const showFork =
      repository && repository.owner && repository.owner.login !== username;

    const repositoryActions = [
      starred
        ? translate('repository.main.unstarAction', language)
        : translate('repository.main.starAction', language),
      subscribed
        ? translate('repository.main.unwatchAction', language)
        : translate('repository.main.watchAction', language),
      translate('repository.main.shareAction', language),
      translate('common.openInBrowser', language),
    ];

    if (showFork) {
      repositoryActions.splice(
        1,
        0,
        translate('repository.main.forkAction', language)
      );
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
              return <LoadingRepositoryProfile language={language} />;
            }

            return (
              <RepositoryProfile
                repository={isPendingRepository ? initalRepository : repository}
                starred={isStarred}
                loading={isPendingRepository}
                navigation={navigation}
                subscribed={isSubscribed}
                language={language}
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
          showMenu={!isPendingRepository && !isPendingCheckStarred}
          menuAction={this.showMenuActionSheet}
          navigation={navigation}
          navigateBack
        >
          {initalRepository &&
            !initalRepository.owner &&
            isPendingRepository &&
            <SectionList
              title={translate('repository.main.ownerTitle', language)}
            >
              <LoadingUserListItem />
            </SectionList>}

          {!(initalRepository && initalRepository.owner) &&
            (repository && repository.owner) &&
            !isPendingRepository &&
            <SectionList
              title={translate('repository.main.ownerTitle', language)}
            >
              <UserListItem user={repository.owner} navigation={navigation} />
            </SectionList>}

          {initalRepository &&
            initalRepository.owner &&
            <SectionList
              title={translate('repository.main.ownerTitle', language)}
            >
              <UserListItem
                user={initalRepository.owner}
                navigation={navigation}
              />
            </SectionList>}

          {(isPendingRepository || isPendingContributors) &&
            <LoadingMembersList
              title={translate('repository.main.contributorsTitle', language)}
            />}

          {!isPendingContributors &&
            <MembersList
              title={translate('repository.main.contributorsTitle', language)}
              members={contributors}
              noMembersMessage={translate(
                'repository.main.noContributorsMessage',
                language
              )}
              navigation={navigation}
            />}

          <SectionList
            title={translate('repository.main.sourceTitle', language)}
          >
            {showReadMe &&
              <ListItem
                title={translate('repository.main.readMe', language)}
                leftIcon={{
                  name: 'book',
                  color: colors.grey,
                  type: 'octicon',
                }}
                titleStyle={styles.listTitle}
                onPress={() =>
                  navigation.navigate('ReadMe', {
                    repository,
                  })}
                underlayColor={colors.greyLight}
              />}
            <ListItem
              title={translate('repository.main.viewSource', language)}
              titleStyle={styles.listTitle}
              leftIcon={{
                name: 'code',
                color: colors.grey,
                type: 'octicon',
              }}
              onPress={() =>
                navigation.navigate('RepositoryCodeList', {
                  title: translate('repository.codeList.title', language),
                  topLevel: true,
                })}
              underlayColor={colors.greyLight}
            />
          </SectionList>

          {!repository.fork &&
            repository.has_issues &&
            <SectionList
              loading={isPendingIssues}
              title={translate('repository.main.issuesTitle', language)}
              noItems={openIssues.length === 0}
              noItemsMessage={
                pureIssues.length === 0
                  ? translate('repository.main.noIssuesMessage', language)
                  : translate('repository.main.noOpenIssuesMessage', language)
              }
              showButton
              buttonTitle={
                pureIssues.length > 0
                  ? translate('repository.main.viewAllButton', language)
                  : translate('repository.main.newIssueButton', language)
              }
              buttonAction={() => {
                if (pureIssues.length > 0) {
                  navigation.navigate('IssueList', {
                    title: translate('repository.issueList.title', language),
                    type: 'issue',
                    issues: pureIssues,
                  });
                } else {
                  navigation.navigate('NewIssue', {
                    title: translate('issue.newIssue.title', language),
                  });
                }
              }}
            >
              {openIssues
                .slice(0, 3)
                .map(item =>
                  <IssueListItem
                    key={item.id}
                    type="issue"
                    issue={item}
                    navigation={navigation}
                    language={language}
                  />
                )}
            </SectionList>}

          <SectionList
            loading={isPendingIssues}
            title={translate('repository.main.pullRequestTitle', language)}
            noItems={openPulls.length === 0}
            noItemsMessage={
              pulls.length === 0
                ? translate('repository.main.noPullRequestsMessage', language)
                : translate(
                    'repository.main.noOpenPullRequestsMessage',
                    language
                  )
            }
            showButton={pulls.length > 0}
            buttonTitle={translate('repository.main.viewAllButton', language)}
            buttonAction={() =>
              navigation.navigate('PullList', {
                title: translate('repository.pullList.title', language),
                type: 'pull',
                issues: pulls,
              })}
          >
            {openPulls
              .slice(0, 3)
              .map(item =>
                <IssueListItem
                  key={item.id}
                  type="pull"
                  issue={item}
                  navigation={navigation}
                  language={language}
                />
              )}
          </SectionList>
        </ParallaxScroll>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={translate('repository.main.repoActions', language)}
          options={[...repositoryActions, translate('common.cancel', language)]}
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
