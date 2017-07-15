import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ActionSheetIOS } from 'react-native';
import { ListItem } from 'react-native-elements';

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
import { colors } from 'config';
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
    fontFamily: 'AvenirNext-Medium',
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

  showMenuActionSheet() {
    const {
      starred,
      repository,
      changeStarStatusRepoByDispatch,
      forkRepoByDispatch,
      navigation,
      username,
    } = this.props;
    const repositoryActions = [starred ? '★ Unstar' : '★ Star'];
    const showFork = repository.owner.login !== username;

    if (showFork) {
      repositoryActions.push('Fork');
    }

    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Repository Actions',
        options: [...repositoryActions, 'Cancel'],
        cancelButtonIndex: repositoryActions.length,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          changeStarStatusRepoByDispatch(
            repository.owner.login,
            repository.name,
            starred
          );
        }
        if (buttonIndex === 1 && showFork) {
          forkRepoByDispatch(
            repository.owner.login,
            repository.name
          ).then(json => {
            navigation.navigate('Repository', { repository: json });
          });
        }
      }
    );
  }
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
    } = this.props;
    const initalRepository = navigation.state.params.repository;
    const pulls = issues.filter(issue => issue.hasOwnProperty('pull_request')); // eslint-disable-line no-prototype-builtins
    const pureIssues = issues.filter(issue => {
      // eslint-disable-next-line no-prototype-builtins
      return !issue.hasOwnProperty('pull_request');
    });
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

          {isPendingContributors && <LoadingMembersList title="CONTRIBUTORS" />}

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
            title="ISSUES"
            noItems={
              pureIssues.filter(issue => issue.state === 'open').length === 0
            }
            noItemsMessage={
              pureIssues.length === 0 ? 'No issues' : 'No open issues'
            }
            showButton={pureIssues.length > 0}
            buttonTitle="View All"
            buttonAction={() =>
              navigation.navigate('IssueList', {
                type: 'issue',
                issues: pureIssues,
              })}
          >
            {pureIssues
              .filter(issue => issue.state === 'open')
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
            title="PULL REQUESTS"
            noItems={pulls.filter(issue => issue.state === 'open').length === 0}
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
            {pulls
              .filter(issue => issue.state === 'open')
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
      </ViewContainer>
    );
  }
}

export const RepositoryScreen = connect(mapStateToProps, mapDispatchToProps)(
  Repository
);
