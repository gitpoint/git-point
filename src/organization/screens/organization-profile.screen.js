import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import {
  ViewContainer,
  UserProfile,
  LoadingMembersList,
  MembersList,
  SectionList,
  ParallaxScroll
} from 'components';

import { colors } from 'config';
import Communications from 'react-native-communications';

import { connect } from 'react-redux';
import { getOrg, getOrgRepos, getOrgMembers } from '../';

const mapStateToProps = state => ({
  organization: state.organization.organization,
  repositories: state.organization.repositories,
  members: state.organization.members,
  isPendingOrg: state.organization.isPendingOrg,
  isPendingRepos: state.organization.isPendingRepos,
  isPendingMembers: state.organization.isPendingMembers
});

const mapDispatchToProps = dispatch => ({
  getOrg: orgName => dispatch(getOrg(orgName)),
  getOrgRepos: url => dispatch(getOrgRepos(url)),
  getOrgMembers: orgName => dispatch(getOrgMembers(orgName))
});

class OrganizationProfile extends Component {
  props: {
    getOrg: Function,
    getOrgRepos: Function,
    getOrgMembers: Function,
    organization: Object,
    repositories: Array,
    members: Array,
    isPendingOrg: boolean,
    isPendingRepos: boolean,
    isPendingMembers: boolean,
    navigation: Object
  };

  componentDidMount() {
    const organization = this.props.navigation.state.params.organization;

    this.props.getOrg(organization.login);
    this.props.getOrgMembers(organization.login);
  }

  render() {
    const {
      organization,
      members,
      isPendingOrg,
      isPendingMembers,
      navigation
    } = this.props;

    const initialOrganization = this.props.navigation.state.params.organization;

    return (
      <ViewContainer>

        <ParallaxScroll
          renderContent={() => (
            <UserProfile
              type="org"
              initialUser={initialOrganization}
              user={
                initialOrganization.login === organization.login
                  ? organization
                  : initialOrganization
              }
              navigation={navigation}
            />
          )}
          stickyTitle={organization.name}
          navigateBack
          navigation={navigation}
        >

          {isPendingMembers && <LoadingMembersList title="MEMBERS" />}

          {!isPendingMembers &&
            <MembersList
              title="MEMBERS"
              members={members}
              navigation={navigation}
            />}

          {!!(!isPendingOrg &&
            organization.blog &&
            organization.blog !== null &&
            organization.blog !== '') &&
            <SectionList title="LINKS">
              <ListItem
                title="Website"
                titleStyle={styles.listTitle}
                leftIcon={{ name: 'link', color: colors.grey }}
                subtitle={organization.blog}
                onPress={() => Communications.web(organization.blog)}
                underlayColor={colors.greyLight}
              />
            </SectionList>}
        </ParallaxScroll>
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium'
  }
});

export const OrganizationProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationProfile);
