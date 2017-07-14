import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import {
  ViewContainer,
  UserProfile,
  SectionList,
  LoadingContainer,
  ParallaxScroll,
  UserListItem
} from 'components';

import { colors } from 'config';
import Communications from 'react-native-communications';

import { connect } from 'react-redux';
import { getUser, getOrgs } from 'auth';

const mapStateToProps = state => ({
  user: state.auth.user,
  orgs: state.auth.orgs,
  isPendingUser: state.auth.isPendingUser,
  isPendingOrgs: state.auth.isPendingOrgs
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  getOrgs: () => dispatch(getOrgs())
});

class AuthProfile extends Component {
  props: {
    getUser: Function,
    getOrgs: Function,
    user: Object,
    orgs: Array,
    isPendingUser: boolean,
    isPendingOrgs: boolean,
    navigation: Object
  };

  componentDidMount() {
    this.props.getUser();
    this.props.getOrgs();
  }

  getUserBlog(url) {
    const prefix = 'http';
    return url.substr(0, prefix.length) === prefix ? url : `http://${url}`;
  }

  render() {
    const { user, orgs, isPendingUser, isPendingOrgs, navigation } = this.props;
    const loading = isPendingUser || isPendingOrgs;

    return (
      <ViewContainer>
        {loading && <LoadingContainer animating={loading} center />}

        {!loading &&
          <ParallaxScroll
            renderContent={() => (
              <UserProfile
                type="user"
                initialUser={user}
                user={user}
                navigation={navigation}
              />
            )}
            stickyTitle={user.login}
          >

            {user.bio && user.bio !== '' &&
              <SectionList
                title="BIO"
              >
                <ListItem
                  subtitle={user.bio}
                  subtitleStyle={styles.listSubTitle}
                  hideChevron
                />
              </SectionList>
            }

            <SectionList
              title="EMAIL"
              noItems={!user.email || user.email === ''}
              noItemsMessage={'No email associated with account'}
            >
              <ListItem
                title="Email"
                titleStyle={styles.listTitle}
                leftIcon={{
                  name: 'mail',
                  color: colors.grey,
                  type: 'octicon'
                }}
                subtitle={user.email}
                subtitleStyle={styles.listSubTitle}
                onPress={() =>
                  Communications.email([user.email], null, null, 'Hi!', '')}
                underlayColor={colors.greyLight}
              />
            </SectionList>

            <SectionList
              title="WEBSITE"
              noItems={!user.blog || user.blog === ''}
              noItemsMessage={'No website associated with account'}
            >
              <ListItem
                title="Website"
                titleStyle={styles.listTitle}
                leftIcon={{
                  name: 'link',
                  color: colors.grey,
                  type: 'octicon'
                }}
                subtitle={user.blog}
                subtitleStyle={styles.listSubTitle}
                onPress={() => Communications.web(this.getUserBlog(user.blog))}
                underlayColor={colors.greyLight}
              />
            </SectionList>

            <SectionList
              title="ORGANIZATIONS"
              noItems={orgs.length === 0}
              noItemsMessage={'No organizations'}
            >
              {orgs.map((item, i) => (
                <UserListItem key={i} user={item} navigation={navigation} />
              ))}
            </SectionList>
          </ParallaxScroll>}
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium'
  },
  listSubTitle: {
    color: colors.greyDark,
    fontFamily: 'AvenirNext-Medium'
  }
});

export const AuthProfileScreen = connect(mapStateToProps, mapDispatchToProps)(
  AuthProfile
);
