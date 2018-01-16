import React, { Component } from 'react';
import styled from 'styled-components/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import { createStructuredSelector } from 'reselect';
import ActionSheet from 'react-native-actionsheet';
import { getAuthLocale } from 'auth';
import {
  ViewContainer,
  UserProfile,
  LoadingMembersList,
  MembersList,
  SectionList,
  ParallaxScroll,
  EntityInfo,
} from 'components';
import { emojifyText, translate, openURLInView } from 'utils';
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
  locale: getAuthLocale,
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
    locale: string,
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
      locale,
    } = this.props;
    const { refreshing } = this.state;
    const initialOrganization = this.props.navigation.state.params.organization;
    const organizationActions = [translate('common.openInBrowser', locale)];

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
          {isPendingMembers && (
            <LoadingMembersList
              title={translate('organization.main.membersTitle', locale)}
            />
          )}

          {!isPendingMembers && (
            <MembersList
              title={translate('organization.main.membersTitle', locale)}
              members={members}
              navigation={navigation}
            />
          )}

          {!!organization.description &&
            organization.description !== '' && (
              <SectionList
                title={translate('organization.main.descriptionTitle', locale)}
              >
                <DescriptionListItem
                  subtitle={emojifyText(organization.description)}
                  hideChevron
                />
              </SectionList>
            )}

          {!isPendingOrg && (
            <EntityInfo
              entity={organization}
              navigation={navigation}
              locale={locale}
            />
          )}
        </ParallaxScroll>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={translate('organization.organizationActions', locale)}
          options={[...organizationActions, translate('common.cancel', locale)]}
          cancelButtonIndex={1}
          onPress={this.handleActionSheetPress}
        />
      </ViewContainer>
    );
  }
}

export const OrganizationProfileScreen = connect(selectors, actions)(
  OrganizationProfile
);
