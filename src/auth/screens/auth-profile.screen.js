import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import codePush from 'react-native-code-push';

import {
  ViewContainer,
  UserProfile,
  SectionList,
  LoadingContainer,
  ParallaxScroll,
  UserListItem,
  EntityInfo,
} from 'components';
import { colors, fonts, normalize } from 'config';
import { getUser, getOrgs, signOut } from 'auth';
import { emojifyText, openURLInView, resetNavigationTo } from 'utils';
import { version } from 'package.json';

const mapStateToProps = state => ({
  user: state.auth.user,
  orgs: state.auth.orgs,
  isPendingUser: state.auth.isPendingUser,
  isPendingOrgs: state.auth.isPendingOrgs,
});

const mapDispatchToProps = dispatch => ({
  getUserByDispatch: () => dispatch(getUser()),
  getOrgsByDispatch: () => dispatch(getOrgs()),
  signOutByDispatch: () => dispatch(signOut()),
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
  update: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 40,
  },
  updateText: {
    color: colors.greyDark,
    ...fonts.fontPrimary,
  },
  updateTextSub: {
    fontSize: normalize(11),
  },
  note: {
    fontSize: normalize(11),
    color: colors.primaryDark,
    ...fonts.fontPrimaryLight,
    textAlign: 'center',
    padding: 10,
  },
  noteLink: {
    ...fonts.fontPrimarySemiBold,
  },
  logoutTitle: {
    color: colors.red,
    ...fonts.fontPrimary,
  },
});

const updateText = {
  check: 'Check for update',
  checking: 'Checking for update...',
  updated: 'App is up to date',
  available: 'Update is available!',
  notApplicable: 'Not applicable in debug mode',
};

class AuthProfile extends Component {
  props: {
    getUserByDispatch: Function,
    getOrgsByDispatch: Function,
    signOutByDispatch: Function,
    user: Object,
    orgs: Array,
    isPendingUser: boolean,
    isPendingOrgs: boolean,
    navigation: Object,
  };

  state = {
    updateText: updateText.check,
  };

  componentDidMount() {
    this.props.getUserByDispatch();
    this.props.getOrgsByDispatch();
  }

  checkForUpdate = () => {
    if (__DEV__) {
      this.setState({ updateText: updateText.notApplicable });
    } else {
      this.setState({ updateText: updateText.checking });
      codePush
        .sync({
          updateDialog: true,
          installMode: codePush.InstallMode.IMMEDIATE,
        })
        .then(update => {
          this.setState({
            updateText: update ? updateText.available : updateText.updated,
          });
        });
    }
  };

  signOutUser() {
    const { signOutByDispatch, navigation } = this.props;

    signOutByDispatch().then(() => {
      const url = 'https://github.com/logout';

      openURLInView(url);
      resetNavigationTo('Login', navigation);
    });
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
                  subtitle={emojifyText(user.bio)}
                  subtitleStyle={styles.listSubTitle}
                  hideChevron
                />
              </SectionList>}

            <EntityInfo entity={user} orgs={orgs} navigation={navigation} />

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
              <Text style={styles.note}>
                Can&apos;t see all your organizations?{'\n'}
                <Text
                  style={styles.noteLink}
                  onPress={() =>
                    openURLInView('https://github.com/settings/applications')}
                >
                  You may have to request approval for them.
                </Text>
              </Text>
            </SectionList>

            <SectionList>
              <ListItem
                title="Privacy Policy"
                titleStyle={styles.listTitle}
                onPress={() => navigation.navigate('PrivacyPolicy')}
              />

              <ListItem
                title="Sign Out"
                titleStyle={styles.logoutTitle}
                hideChevron
                onPress={() => this.signOutUser()}
              />
            </SectionList>

            <TouchableOpacity
              style={styles.update}
              onPress={this.checkForUpdate}
            >
              <Text style={styles.updateText}>
                GitPoint v{version}
              </Text>
              <Text style={[styles.updateText, styles.updateTextSub]}>
                {this.state.updateText}
              </Text>
            </TouchableOpacity>
          </ParallaxScroll>}
      </ViewContainer>
    );
  }
}

export const AuthProfileScreen = connect(mapStateToProps, mapDispatchToProps)(
  AuthProfile
);
