import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import { createStructuredSelector } from 'reselect';
import ActionSheet from 'react-native-actionsheet';
import { withI18n } from '@lingui/react';

import {
  ViewContainer,
  UserProfile,
  LoadingMembersList,
  MembersList,
  SectionList,
  ParallaxScroll,
  EntityInfo,
} from 'components';
import { emojifyText, openURLInView } from 'utils';
import { colors, fonts } from 'config';
import {
  // actions
  fetchOrganizations,
  fetchOrganizationMembers,
  // Selectors
  getOrganization,
  getOrganizationRepositories,
  getOrganizationMembers,
  getOrganizationIsPendingOrg,
  getOrganizationIsPendingRepos,
  getOrganizationIsPendingMembers,
} from '../index';

const selectors = createStructuredSelector({
  organization: getOrganization,
  repositories: getOrganizationRepositories,
  members: getOrganizationMembers,
  isPendingOrg: getOrganizationIsPendingOrg,
  isPendingRepos: getOrganizationIsPendingRepos,
  isPendingMembers: getOrganizationIsPendingMembers,
});

const actionCreators = {
  fetchOrganizations,
  fetchOrganizationMembers,
};

const actions = dispatch => bindActionCreators(actionCreators, dispatch);

const DescriptionListItem = styled(ListItem).attrs({
  subtitleStyle: {
    color: colors.greyDark,
    ...fonts.fontPrimary,
  },
})``;

class OrganizationProfile extends Component {
  props: {
    fetchOrganizations: Function,
    // getOrgReposByDispatch: Function,
    fetchOrganizationMembers: Function,
    organization: Object,
    // repositories: Array,
    members: Array,
    isPendingOrg: boolean,
    // isPendingRepos: boolean,
    isPendingMembers: boolean,
    navigation: Object,
    i18n: Object,
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
    const organization = this.props.navigation.state.params.organization;

    this.props.fetchOrganizations(organization.login);
    this.props.fetchOrganizationMembers(organization.login);
  }

  getOrgData = () => {
    const organization = this.props.navigation.state.params.organization;

    this.setState({ refreshing: true });
    Promise.all([
      this.props.fetchOrganizations(organization.login),
      this.props.fetchOrganizationMembers(organization.login),
    ]).then(() => {
      this.setState({ refreshing: false });
    });
  };

  showMenuActionSheet = () => {
    this.ActionSheet.show();
  };

  handleActionSheetPress = index => {
    if (index === 0) {
      openURLInView(this.props.organization.html_url);
    }
  };

  render() {
    const {
      organization,
      members,
      isPendingOrg,
      isPendingMembers,
      navigation,
      i18n,
    } = this.props;
    const { refreshing } = this.state;
    const initialOrganization = this.props.navigation.state.params.organization;
    const organizationActions = [i18n.t`Open in Browser`];

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
          refreshControl={
            <RefreshControl
              onRefresh={this.getOrgData}
              refreshing={refreshing}
            />
          }
          stickyTitle={organization.name}
          navigateBack
          navigation={navigation}
          showMenu
          menuAction={() => this.showMenuActionSheet()}
        >
          {isPendingMembers && <LoadingMembersList title={i18n.t`MEMBERS`} />}

          {!isPendingMembers && (
            <MembersList
              title={i18n.t`MEMBERS`}
              members={members}
              navigation={navigation}
            />
          )}

          {!!organization.description &&
            organization.description !== '' && (
              <SectionList title={i18n.t`DESCRIPTION`}>
                <DescriptionListItem
                  subtitle={emojifyText(organization.description)}
                  hideChevron
                />
              </SectionList>
            )}

          {!isPendingOrg && (
            <EntityInfo entity={organization} navigation={navigation} />
          )}
        </ParallaxScroll>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={i18n.t`Organization Actions`}
          options={[...organizationActions, i18n.t`Cancel`]}
          cancelButtonIndex={1}
          onPress={this.handleActionSheetPress}
        />
      </ViewContainer>
    );
  }
}

export const OrganizationProfileScreen = connect(selectors, actions)(
  withI18n()(OrganizationProfile)
);
