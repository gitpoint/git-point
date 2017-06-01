import React, { Component } from "react";
import { StyleSheet, ActionSheetIOS } from "react-native";
import { ListItem } from "react-native-elements";

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
  LoadingMembersList
} from "components";

import config from "config";

import { connect } from "react-redux";
import {
  getRepositoryInfo,
  getContributors,
  getIssues
} from "../repository.action";

const mapStateToProps = state => ({
  repository: state.repository.repository,
  contributors: state.repository.contributors,
  issues: state.repository.issues,
  starred: state.repository.starred,
  isPendingRepository: state.repository.isPendingRepository,
  isPendingContributors: state.repository.isPendingContributors,
  isPendingIssues: state.repository.isPendingIssues,
  isPendingCheckStarred: state.repository.isPendingCheckStarred
});

const mapDispatchToProps = dispatch => ({
  getRepositoryInfo: url => dispatch(getRepositoryInfo(url)),
  getContributors: url => dispatch(getContributors(url)),
  getIssues: url => dispatch(getIssues(url))
});

class Repository extends Component {
  props: {
    selectRepository: Function,
    getRepositoryInfo: Function,
    getIssues: Function,
    repositoryName: string,
    repository: Object,
    contributors: Array,
    issues: Array,
    starred: boolean,
    isPendingRepository: boolean,
    isPendingContributors: boolean,
    isPendingIssues: boolean,
    isPendingCheckStarred: boolean,
    navigation: Object
  };

  componentDidMount() {
    const { navigation } = this.props;
    const repo = navigation.state.params.repository;
    const repoUrl = navigation.state.params.repositoryUrl;

    this.props.getRepositoryInfo(repo ? repo.url : repoUrl);
  }

  showMenuActionSheet() {
    const { starred } = this.props;
    const repositoryActions = ["Watch", starred ? "★ Unstar" : "★ Star"];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: "Repository Actions",
        options: [...repositoryActions, "Cancel"],
        cancelButtonIndex: 2
      },
      buttonIndex => {
        console.log(repositoryActions[buttonIndex]);
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
      navigation
    } = this.props;
    const initalRepository = navigation.state.params.repository;
    const pulls = issues.filter(issue => issue.hasOwnProperty("pull_request"));
    const pureIssues = issues.filter(
      issue => !issue.hasOwnProperty("pull_request")
    );
    return (
      <ViewContainer barColor="light">

        <ParallaxScroll
          renderContent={() => {
            if (isPendingRepository && !initalRepository) {
              return <LoadingRepositoryProfile />;
            } else {
              return (
                <RepositoryProfile
                  repository={
                    isPendingRepository ? initalRepository : repository
                  }
                  starred={
                    isPendingRepository || isPendingCheckStarred
                      ? false
                      : starred
                  }
                  navigation={navigation}
                />
              );
            }
          }}
          stickyTitle={repository.name}
          navigateBack
          showMenu={!isPendingRepository && !isPendingCheckStarred}
          menuAction={() => this.showMenuActionSheet()}
          navigation={navigation}
        >

          {initalRepository &&
            !initalRepository.owner &&
            isPendingRepository &&
            <SectionList title="OWNER">
              <LoadingUserListItem />
            </SectionList>}

          {!(initalRepository && initalRepository.owner) &&
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
                name: "book",
                color: config.colors.grey,
                type: "octicon"
              }}
              titleStyle={styles.listTitle}
              onPress={() =>
                navigation.navigate("ReadMe", {
                  repository: repository
                })}
              underlayColor={config.colors.greyLight}
            />
            <ListItem
              title="View Code"
              titleStyle={styles.listTitle}
              leftIcon={{
                name: "code",
                color: config.colors.grey,
                type: "octicon"
              }}
              onPress={() =>
                navigation.navigate("RepositoryCodeList", {
                  topLevel: true
                })}
              underlayColor={config.colors.greyLight}
            />
          </SectionList>

          <SectionList
            loading={isPendingIssues}
            title="ISSUES"
            noItems={
              pureIssues.filter(issue => issue.state === "open").length === 0
            }
            noItemsMessage={
              pureIssues.length === 0 ? "No issues" : "No open issues"
            }
            showButton={pureIssues.length > 3}
            buttonTitle="View All"
            buttonAction={() =>
              navigation.navigate("IssueList", {
                type: "issue",
                userHasPushPermission: repository.permissions.admin ||
                  repository.permissions.push,
                issues: pureIssues
              })}
          >
            {pureIssues
              .filter(issue => issue.state === "open")
              .slice(0, 3)
              .map((item, i) => (
                <IssueListItem
                  key={i}
                  type="issue"
                  issue={item}
                  userHasPushPermission={
                    repository.permissions.admin || repository.permissions.push
                  }
                  navigation={navigation}
                />
              ))}
          </SectionList>

          <SectionList
            loading={isPendingIssues}
            title="PULL REQUESTS"
            noItems={pulls.filter(issue => issue.state === "open").length === 0}
            noItemsMessage={
              pulls.length === 0 ? "No pull requests" : "No open pull requests"
            }
            showButton={pulls.length > 3}
            buttonTitle="View All"
            buttonAction={() =>
              navigation.navigate("PullList", {
                type: "pull",
                userHasPushPermission: repository.permissions.admin ||
                  repository.permissions.push,
                issues: pulls
              })}
          >
            {pulls
              .filter(issue => issue.state === "open")
              .slice(0, 3)
              .map((item, i) => (
                <IssueListItem
                  key={i}
                  type="pull"
                  issue={item}
                  userHasPushPermission={
                    repository.permissions.admin || repository.permissions.push
                  }
                  navigation={navigation}
                />
              ))}
          </SectionList>
        </ParallaxScroll>
      </ViewContainer>
    );
  }
}
const styles = StyleSheet.create({
  listTitle: {
    color: config.colors.black,
    fontFamily: "AvenirNext-Medium"
  }
});
export const RepositoryScreen = connect(mapStateToProps, mapDispatchToProps)(
  Repository
);
