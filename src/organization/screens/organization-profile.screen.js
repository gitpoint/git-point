import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import { RestClient } from 'api';
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

const DescriptionListItem = styled(ListItem).attrs({
  subtitleStyle: {
    color: colors.greyDark,
    ...fonts.fontPrimary,
  },
})``;

class OrganizationProfile extends Component {
  props: {
    org: Object,
    orgId: String,
    orgMembers: Array,
    orgMembersPagination: Object,
    navigation: Object,
    locale: string,
    getOrgById: Function,
    getOrgMembers: Function,
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
    const { org, orgId, getOrgById, getOrgMembers } = this.props;

    if (!org.name) {
      getOrgById(orgId);
    }
    getOrgMembers(orgId);
  }

  componentWillReceiveProps() {
    this.setState({ refreshing: false });
  }

  refresh = () => {
    this.setState({ refreshing: true });
    const { orgId, getOrgById, getOrgMembers } = this.props;

    getOrgById(orgId);
    getOrgMembers(orgId, { forceRefresh: true });
  };

  showMenuActionSheet = () => {
    this.ActionSheet.show();
  };

  handleActionSheetPress = index => {
    if (index === 0) {
      openURLInView(this.props.org.html_url);
    }
  };

  render() {
    const {
      org,
      orgMembers,
      orgMembersPagination,
      navigation,
      locale,
    } = this.props;
    const { refreshing } = this.state;
    const initialOrganization = this.props.navigation.state.params.organization;
    const organizationActions = [translate('common.openInBrowser', locale)];

    const isPendingMembers =
      orgMembers.length === 0 && orgMembersPagination.isFetching;

    return (
      <ViewContainer>
        <ParallaxScroll
          renderContent={() => (
            <UserProfile
              type="org"
              initialUser={initialOrganization}
              user={
                initialOrganization.login === org.login
                  ? org
                  : initialOrganization
              }
              navigation={navigation}
            />
          )}
          refreshControl={
            <RefreshControl onRefresh={this.refresh} refreshing={refreshing} />
          }
          stickyTitle={org.name}
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
              members={orgMembers}
              navigation={navigation}
            />
          )}

          {!!org.description &&
            org.description !== '' && (
              <SectionList
                title={translate('organization.main.descriptionTitle', locale)}
              >
                <DescriptionListItem
                  subtitle={emojifyText(org.description)}
                  hideChevron
                />
              </SectionList>
            )}

          {org && (
            <EntityInfo entity={org} navigation={navigation} locale={locale} />
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

const mapStateToProps = (state, ownProps) => {
  const {
    auth: { user, locale },
    pagination: { ORGS_GET_MEMBERS },
    entities: { orgs, users },
  } = state;

  const orgId = ownProps.navigation.state.params.organization.login;
  const org = orgs[orgId] || ownProps.navigation.state.params.organization;

  const orgMembersPagination = ORGS_GET_MEMBERS[orgId] || {
    ids: [],
    isFetching: true,
  };
  const orgMembers = orgMembersPagination.ids.map(id => users[id]);

  return {
    user,
    org,
    orgId,
    orgMembers,
    orgMembersPagination,
    locale,
  };
};

const mapDispatchToProps = {
  getOrgById: RestClient.orgs.getById,
  getOrgMembers: RestClient.orgs.getMembers,
};

export const OrganizationProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationProfile);
