import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Share } from 'react-native';
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
  RepositorySectionTitle,
} from 'components';
import { colors, fonts } from 'config';
import {
  getRepositoryInfo,
  getContributors,
  getIssues,
  changeStarStatusRepo,
  forkRepo,
} from '../repository.action';

const mapStateToProps = state => ({
  username: state.auth.user.login,
  repository: state.repository.repository,
  contributors: state.repository.contributors,
  issues: state.repository.issues,
  starred: state.repository.starred,
  forked: state.repository.forked,
  isPendingRepository: state.repository.isPendingRepository,
  isPendingContributors: state.repository.isPendingContributors,
  isPendingIssues: state.repository.isPendingIssues,
  isPendingCheckStarred: state.repository.isPendingCheckStarred,
  isPendingFork: state.repository.isPendingFork,
});

const mapDispatchToProps = dispatch => ({
  getRepositoryInfoByDispatch: url => dispatch(getRepositoryInfo(url)),
  getContributorsByDispatch: url => dispatch(getContributors(url)),
  getIssuesByDispatch: url => dispatch(getIssues(url)),
  changeStarStatusRepoByDispatch: (owner, repo, starred) =>
    dispatch(changeStarStatusRepo(owner, repo, starred)),
  forkRepoByDispatch: (owner, repo) => dispatch(forkRepo(owner, repo)),
});

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
});

class Repository extends Component {
  props: {
    // selectRepositoryByDispatch: Function,
    getRepositoryInfoByDispatch: Function,
    // getIssuesByDispatch: Function,
    changeStarStatusRepoByDispatch: Function,
    forkRepoByDispatch: Function,
    // repositoryName: string,
    repository: Object,
    contributors: Array,
    issues: Array,
    starred: boolean,
    // forked: boolean,
    isPendingRepository: boolean,
    isPendingContributors: boolean,
    isPendingIssues: boolean,
    isPendingCheckStarred: boolean,
    isPendingFork: boolean,
    // isPendingCheckForked: boolean,
    navigation: Object,
    username: string,
  };

  componentDidMount() {
    const { navigation } = this.props;
    const repo = navigation.state.params.repository;
    const repoUrl = navigation.state.params.repositoryUrl;

    this.props.getRepositoryInfoByDispatch(repo ? repo.url : repoUrl);
  }

  showMenuActionSheet = () => {
    this.ActionSheet.show();
  };

  handlePress = index => {
    const {
      starred,
      repository,
      changeStarStatusRepoByDispatch,
      forkRepoByDispatch,
      navigation,
      username,
    } = this.props;
    const showFork = repository.owner.login !== username;

    if (index === 0) {
      changeStarStatusRepoByDispatch(
        repository.owner.login,
        repository.name,
        starred
      );
    } else if (index === 1 && showFork) {
      forkRepoByDispatch(repository.owner.login, repository.name).then(json => {
        navigation.navigate('Repository', { repository: json });
      });
    } else if (index === 2 || (index === 1 && !showFork)) {
      this.shareRepository(repository);
    }
  };

  shareRepository = repository => {
    const title = `Share ${repository.name}`;

    Share.share(
      {
        title,
        message: `Check out ${repository.name} on Github. ${repository.html_url}`,
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
      issues,
      starred,
      isPendingRepository,
      isPendingContributors,
      isPendingIssues,
      isPendingCheckStarred,
      isPendingFork,
      navigation,
      username,
    } = this.props;
    const initalRepository = navigation.state.params.repository;
    const pulls = issues.filter(issue => issue.hasOwnProperty('pull_request')); // eslint-disable-line no-prototype-builtins
    const pureIssues = issues.filter(issue => {
      // eslint-disable-next-line no-prototype-builtins
      return !issue.hasOwnProperty('pull_request');
    });

    const openPulls = pulls.filter(pull => pull.state === 'open');
    const closedPulls = pulls.filter(pull => pull.state === 'closed');

    const openIssues = pureIssues.filter(issue => issue.state === 'open');
    const closedIssues = pureIssues.filter(issue => issue.state === 'closed');

    const showFork =
      repository && repository.owner && repository.owner.login !== username;
    const repositoryActions = [
      starred ? 'Unstar' : 'Star',
      showFork && 'Fork',
      'Share',
    ];

    const loader = isPendingFork ? <LoadingModal /> : null;

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
                starred={
                  isPendingRepository || isPendingCheckStarred ? false : starred
                }
                loading={isPendingRepository}
                navigation={navigation}
              />
            );
          }}
          stickyTitle={repository.name}
          showMenu={!isPendingRepository && !isPendingCheckStarred}
          menuAction={() => this.showMenuActionSheet()}
          navigation={navigation}
          navigateBack
        >
          {initalRepository &&
            !initalRepository.owner &&
            isPendingRepository &&
            <SectionList title="OWNER">
              <LoadingUserListItem />
            </SectionList>}

          {!(initalRepository && initalRepository.owner) &&
            (repository && repository.owner) &&
            !isPendingRepository &&
            <SectionList title="OWNER">
              <UserListItem user={repository.owner} navigation={navigation} />
            </SectionList>}

          {initalRepository &&
            initalRepository.owner &&
            <SectionList title="OWNER">
              <UserListItem
                user={initalRepository.owner}
                navigation={navigation}
              />
            </SectionList>}

          {(isPendingRepository || isPendingContributors) &&
            <LoadingMembersList title="CONTRIBUTORS" />}

          {!isPendingContributors &&
            <MembersList
              title="CONTRIBUTORS"
              members={contributors}
              navigation={navigation}
            />}

          <SectionList title="SOURCE">
            <ListItem
              title="README"
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
            />
            <ListItem
              title="View Code"
              titleStyle={styles.listTitle}
              leftIcon={{
                name: 'code',
                color: colors.grey,
                type: 'octicon',
              }}
              onPress={() =>
                navigation.navigate('RepositoryCodeList', {
                  topLevel: true,
                })}
              underlayColor={colors.greyLight}
            />
          </SectionList>

          <SectionList
            loading={isPendingIssues}
            title={
              <RepositorySectionTitle
                text="ISSUES"
                loading={isPendingIssues || isPendingRepository}
                openCount={openIssues.length}
                closedCount={closedIssues.length}
              />
            }
            noItems={openIssues.length === 0}
            noItemsMessage={
              pureIssues.length === 0 ? 'No issues' : 'No open issues'
            }
            showButton
            buttonTitle={pureIssues.length > 0 ? 'View All' : 'New Issue'}
            buttonAction={() => {
              if (pureIssues.length > 0) {
                navigation.navigate('IssueList', {
                  type: 'issue',
                  issues: pureIssues,
                });
              } else {
                navigation.navigate('NewIssue');
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
                />
              )}
          </SectionList>

          <SectionList
            loading={isPendingIssues}
            title={
              <RepositorySectionTitle
                text="PULL REQUESTS"
                loading={isPendingIssues || isPendingRepository}
                openCount={openPulls.length}
                closedCount={closedPulls.length}
              />
            }
            noItems={openPulls.length === 0}
            noItemsMessage={
              pulls.length === 0 ? 'No pull requests' : 'No open pull requests'
            }
            showButton={pulls.length > 0}
            buttonTitle="View All"
            buttonAction={() =>
              navigation.navigate('PullList', {
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
                />
              )}
          </SectionList>
        </ParallaxScroll>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title="Repository Actions"
          options={[...repositoryActions, 'Cancel']}
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
