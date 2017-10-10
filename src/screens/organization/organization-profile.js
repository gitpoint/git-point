import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, RefreshControl, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import {
  ViewContainer,
  OrgProfile,
  SectionList,
  ParallaxScroll,
  LoadingMembersList,
  EntityInfo,
  UsersAvatarList,
} from 'components';
import { emojifyText, translate, openURLInView } from 'utils';
import { colors, fonts } from 'config';
import { getById, getMembers } from 'api/rest/providers/github/endpoints/orgs';

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
  listSubTitle: {
    color: colors.greyDark,
    ...fonts.fontPrimary,
  },
});

/* eslint-disable no-shadow */
const loadData = ({ orgId, getById, getMembers }) => {
  getById(orgId, { requiredFields: ['name'] });
  getMembers(orgId);
};

const mapStateToProps = (state, ownProps) => {
  // TODO: This should be normalized to params.id
  const orgId = ownProps.navigation.state.params.organization.login.toLowerCase();

  const { pagination: { membersByOrg }, entities: { orgs, users } } = state;

  const membersPagination = membersByOrg[orgId] || {
    ids: [],
    isFetching: true,
  };
  const members = membersPagination.ids.map(id => users[id]);

  if (ownProps.navigation.state.params.refreshing) {
    // We were asked to refresh and we're here, so we're done.
    ownProps.navigation.setParams({ refreshing: false });
  }

  return {
    orgId,
    members,
    membersPagination,
    // normalized attribute
    entity: orgs[orgId],
  };
};

class OrganizationProfile extends Component {
  props: {
    orgId: String,
    entity: Object,
    members: Array,
    membersPagination: Object,
    navigation: Object,
    language: string,
    getMembers: Function,
    getById: Function,
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

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orgId !== this.props.orgId) {
      loadData(nextProps);
    }
  }

  refreshData = () => {
    const { navigation, getMembers, getById } = this.props;
    const orgId = navigation.state.params.organization.login;

    navigation.setParams({ refreshing: true });
    getById(orgId, { forceRefresh: true });
    getMembers(orgId, { forceRefresh: true });
  };

  loadMoreMembers = () => {
    const { orgId, getMembers } = this.props;

    getMembers(orgId, { loadMore: true });
  };

  showMenuActionSheet = () => {
    this.ActionSheet.show();
  };

  handleActionSheetPress = index => {
    if (index === 0) {
      openURLInView(this.props.entity._entityUrl);
    }
  };

  render() {
    const {
      orgId,
      entity,
      members,
      membersPagination,
      navigation,
      language,
    } = this.props;
    const { refreshing } = this.state;
    const organizationActions = [translate('common.openInBrowser', language)];

    if (!entity) {
      return (
        <Text>
          Loading organization {orgId} .. TODO: Make me look nicer
        </Text>
      );
    }

    return (
      <ViewContainer>
        <ParallaxScroll
          renderContent={() =>
            <OrgProfile org={entity} navigation={navigation} />}
          refreshControl={
            <RefreshControl
              onRefresh={() => this.refreshData()}
              refreshing={refreshing}
            />
          }
          stickyTitle={orgId}
          navigateBack
          navigation={navigation}
          showMenu
          menuAction={() => this.showMenuActionSheet()}
        >
          {membersPagination.isFetching &&
            !membersPagination.pageCount &&
            <LoadingMembersList
              title={translate('organization.main.membersTitle', language)}
            />}

          {(!membersPagination.isFetching || membersPagination.pageCount > 0) &&
            <UsersAvatarList
              title={translate('organization.main.membersTitle', language)}
              members={members}
              loadMore={this.loadMoreMembers}
              navigation={navigation}
            />}

          {!!entity.description &&
            entity.description !== '' &&
            <SectionList
              title={translate('organization.main.descriptionTitle', language)}
            >
              <ListItem
                subtitle={emojifyText(entity.description)}
                subtitleStyle={styles.listSubTitle}
                hideChevron
              />
            </SectionList>}
          <EntityInfo entity={entity} navigation={navigation} />
        </ParallaxScroll>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={translate('organization.organizationActions', language)}
          options={[
            ...organizationActions,
            translate('common.cancel', language),
          ]}
          cancelButtonIndex={1}
          onPress={this.handleActionSheetPress}
        />
      </ViewContainer>
    );
  }
}

export const OrganizationProfileScreen = connect(mapStateToProps, {
  getById,
  getMembers,
})(OrganizationProfile);
