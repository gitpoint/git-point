import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import {
  ViewContainer,
  UserProfile,
  SectionList,
  LoadingContainer,
  ParallaxScroll,
  UserListItem,
  EntityInfo,
} from 'components';
import { colors, fonts } from 'config';
import { getUser, getOrgs } from 'auth';

const mapStateToProps = state => ({
  user: state.auth.user,
  orgs: state.auth.orgs,
  isPendingUser: state.auth.isPendingUser,
  isPendingOrgs: state.auth.isPendingOrgs,
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  getOrgs: () => dispatch(getOrgs()),
});

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

class AuthProfile extends Component {
  props: {
    getUser: Function,
    getOrgs: Function,
    user: Object,
    orgs: Array,
    isPendingUser: boolean,
    isPendingOrgs: boolean,
    navigation: Object,
  };

  componentDidMount() {
    this.props.getUser();
    this.props.getOrgs();
  }

  render() {
    const { user, orgs, isPendingUser, isPendingOrgs, navigation } = this.props;
    const loading = isPendingUser || isPendingOrgs;

    return (
      <ViewContainer>
        {loading && <LoadingContainer animating={loading} center />}

        {!loading &&
          <ParallaxScroll
            renderContent={() =>
              <UserProfile
                type="user"
                initialUser={user}
                user={user}
                navigation={navigation}
              />}
            stickyTitle={user.login}
          >
            {user.bio &&
              user.bio !== '' &&
              <SectionList title="BIO">
                <ListItem
                  subtitle={user.bio}
                  subtitleStyle={styles.listSubTitle}
                  hideChevron
                />
              </SectionList>}

            <EntityInfo entity={user} />

            <SectionList
              title="ORGANIZATIONS"
              noItems={orgs.length === 0}
              noItemsMessage={'No organizations'}
            >
              {orgs.map(item =>
                <UserListItem
                  key={item.id}
                  user={item}
                  navigation={navigation}
                />
              )}
            </SectionList>
          </ParallaxScroll>}
      </ViewContainer>
    );
  }
}

export const AuthProfileScreen = connect(mapStateToProps, mapDispatchToProps)(
  AuthProfile
);
