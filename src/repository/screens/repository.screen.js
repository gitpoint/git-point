import React, {Component, PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

import {
  ViewContainer,
  RepositoryProfile,
  MembersList,
  SectionList,
  ParallaxScroll,
  UserListItem,
  IssueListItem,
  LoadingMembersList
} from "@components";

import config from '@config';

import {connect} from 'react-redux';
import {
  getRepositoryInfo,
  getContributors,
  getIssues,
} from '../repository.action';

const mapStateToProps = state => ({
  repository: state.repository.repository,
  contributors: state.repository.contributors,
  issues: state.repository.issues,
  isPendingRepository: state.repository.isPendingRepository,  
  isPendingContributors: state.repository.isPendingContributors,
  isPendingIssues: state.repository.isPendingIssues,
});

const mapDispatchToProps = dispatch => ({
  getRepositoryInfo: url => dispatch(getRepositoryInfo(url)),
  getContributors: url => dispatch(getContributors(url)),
  getIssues: url => dispatch(getIssues(url)),
});

class Repository extends Component {
  componentDidMount() {
    const {navigation} = this.props;
    const repo = navigation.state.params.repository;
    const repoUrl = navigation.state.params.repositoryUrl;
    
    this.props.getRepositoryInfo(repo ? repo.url : repoUrl);
  }

  render() {
    const {
      repository,
      contributors,
      issues,
      isPendingRepository,
      isPendingContributors,
      isPendingIssues,
      navigation,
    } = this.props;

    const isPendingAny = isPendingRepository ||
      isPendingContributors ||
      isPendingIssues;

    const initalRepository = navigation.state.params.repository;

    const pulls = issues.filter(issue => issue.hasOwnProperty('pull_request'));
    const pureIssues = issues.filter(
      issue => !issue.hasOwnProperty('pull_request')
    );

    return (
      <ViewContainer barColor="light">

        <ParallaxScroll
          renderContent={() => (
            <RepositoryProfile
              repository={isPendingRepository ? initalRepository : repository}
              navigation={navigation}
            />
          )}
          stickyTitle={repository.name}
          navigateBack
          navigation={navigation}
        >

          <SectionList title="OWNER">
            {[initalRepository ? initalRepository.owner : repository.owner].map((item, i) => (
              <UserListItem key={i} user={item} navigation={navigation} />
            ))}
          </SectionList>

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
                leftIcon={{name: 'book', color: config.colors.grey, type: 'octicon'}}
                titleStyle={styles.listTitle}
                onPress={() => navigation.navigate('ReadMe', {
                  repository: repository,
                })}
                underlayColor={config.colors.greyLight}
              />
              <ListItem
                title="View Code"
                titleStyle={styles.listTitle}
                leftIcon={{name: 'code', color: config.colors.grey, type: 'octicon'}}
                onPress={() =>
                  navigation.navigate('RepositoryCodeList', {
                    topLevel: true,
                  })}
                underlayColor={config.colors.greyLight}
              />
            </SectionList>

          {!isPendingIssues &&
            <SectionList
              title="ISSUES"
              noItems={pureIssues.filter(issue => issue.state === 'open').length === 0}
              noItemsMessage={pureIssues.length === 0 ? "No issues" : "No open issues"}
              showButton={pureIssues.length > 3}
              buttonTitle="View All"
              buttonAction={() => navigation.navigate('IssueList', {
                type: 'issue',
                userHasPushPermission: repository.permissions.admin || repository.permissions.push,
                issues: pureIssues,
              })}
            >
              {pureIssues
                .filter(issue => issue.state === 'open')
                .slice(0, 3)
                .map((item, i) => (
                  <IssueListItem key={i} type="issue" issue={item} userHasPushPermission={repository.permissions.admin || repository.permissions.push} navigation={navigation} />
                ))}
            </SectionList>}

          {!isPendingIssues &&
            <SectionList
              title="PULL REQUESTS"
              noItems={pulls.filter(issue => issue.state === 'open').length === 0}
              noItemsMessage={pulls.length === 0 ? "No pull requests" : "No open pull requests"}
              showButton={pulls.length > 3}
              buttonTitle="View All"
              buttonAction={() => navigation.navigate('PullList', {
                type: 'pull',
                userHasPushPermission: repository.permissions.admin || repository.permissions.push,
                issues: pulls,
              })}
            >
              {pulls
                .filter(issue => issue.state === 'open')
                .slice(0, 3)
                .map((item, i) => (
                  <IssueListItem key={i} type="pull" issue={item} userHasPushPermission={repository.permissions.admin || repository.permissions.push} navigation={navigation} />
                ))}
            </SectionList>}
        </ParallaxScroll>
      </ViewContainer>
    );
  }
}

Repository.propTypes = {
  selectRepository: PropTypes.func,
  getRepositoryInfo: PropTypes.func,
  getIssues: PropTypes.func,
  repositoryName: PropTypes.string,
  repository: PropTypes.object,
  contributors: PropTypes.array,
  issues: PropTypes.array,
  isPendingRepository: PropTypes.bool,
  isPendingContributors: PropTypes.bool,
  isPendingIssues: PropTypes.bool,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  listTitle: {
    color: config.colors.black,
    fontFamily: 'AvenirNext-Medium',
  },
});

export const RepositoryScreen = connect(mapStateToProps, mapDispatchToProps)(Repository);
