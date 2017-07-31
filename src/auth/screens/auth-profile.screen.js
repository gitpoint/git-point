import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import codePush from 'react-native-code-push';

import {
  ViewContainer,
  UserProfile,
  SectionList,
  ParallaxScroll,
  UserListItem,
  EntityInfo,
} from 'components';
import { colors, fonts, normalize } from 'config';
import { getUser, getOrgs, signOut } from 'auth';
import { emojifyText, openURLInView, translate } from 'utils';
import { version } from 'package.json';

const mapStateToProps = state => ({
  user: state.auth.user,
  orgs: state.auth.orgs,
  language: state.auth.language,
  isPendingUser: state.auth.isPendingUser,
  isPendingOrgs: state.auth.isPendingOrgs,
  hasInitialUser: state.auth.hasInitialUser,
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
});

const updateText = lang => ({
  check: translate('auth.profile.codePushCheck', lang),
  checking: translate('auth.profile.codePushChecking', lang),
  updated: translate('auth.profile.codePushUpdated', lang),
  available: translate('auth.profile.codePushAvailable', lang),
  notApplicable: translate('auth.profile.codePushNotApplicable', lang),
});

class AuthProfile extends Component {
  props: {
    getUserByDispatch: Function,
    getOrgsByDispatch: Function,
    user: Object,
    orgs: Array,
    language: string,
    isPendingUser: boolean,
    isPendingOrgs: boolean,
    hasInitialUser: boolean,
    navigation: Object,
  };

  constructor(props) {
    super(props);

    this.state = {
      updateText: updateText(props.language).check,
    };
  }

  componentDidMount() {
    this.refreshProfile();
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

  refreshProfile = () => {
    this.props.getUserByDispatch();
    this.props.getOrgsByDispatch();
  };

  render() {
    const {
      user,
      orgs,
      isPendingUser,
      isPendingOrgs,
      language,
      navigation,
      hasInitialUser,
    } = this.props;

    const loading = isPendingUser || isPendingOrgs;

    return (
      <ViewContainer>
        <ParallaxScroll
          renderContent={() =>
            <UserProfile
              type="user"
              initialUser={hasInitialUser ? user : {}}
              user={hasInitialUser ? user : {}}
              language={language}
              navigation={navigation}
            />}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.refreshProfile}
            />
          }
          stickyTitle={user.login}
          showMenu
          menuIcon="gear"
          menuAction={() =>
            navigation.navigate('UserOptions', {
              title: translate('auth.userOptions.title', language),
            })}
        >
          {hasInitialUser &&
            user.bio &&
            user.bio !== '' &&
            <SectionList title={translate('common.bio', language)}>
              <ListItem
                subtitle={emojifyText(user.bio)}
                subtitleStyle={styles.listSubTitle}
                hideChevron
              />
            </SectionList>}

          {!loading &&
            <EntityInfo entity={user} orgs={orgs} navigation={navigation} />}

          {!isPendingOrgs &&
            <SectionList
              title={translate('common.orgs', language)}
              noItems={orgs.length === 0}
              noItemsMessage={translate('common.noOrgsMessage', language)}
            >
              {orgs.map(item =>
                <UserListItem
                  key={item.id}
                  user={item}
                  navigation={navigation}
                />
              )}
              <Text style={styles.note}>
                {translate('auth.profile.orgsRequestApprovalTop', language)}
                {'\n'}
                <Text
                  style={styles.noteLink}
                  onPress={() =>
                    openURLInView('https://github.com/settings/applications')}
                >
                  {translate(
                    'auth.profile.orgsRequestApprovalBottom',
                    language
                  )}
                </Text>
              </Text>
            </SectionList>}

          <TouchableOpacity style={styles.update} onPress={this.checkForUpdate}>
            <Text style={styles.updateText}>
              GitPoint v{version}
            </Text>
            <Text style={[styles.updateText, styles.updateTextSub]}>
              {this.state.updateText}
            </Text>
          </TouchableOpacity>
        </ParallaxScroll>
      </ViewContainer>
    );
  }
}

export const AuthProfileScreen = connect(mapStateToProps, mapDispatchToProps)(
  AuthProfile
);
