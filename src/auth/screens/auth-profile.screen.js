import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
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
  update: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 40,
  },
  updateText: {
    color: colors.grey,
    fontFamily: 'AvenirNext-Medium',
  },
  updateTextSub: {
    fontSize: 11,
  },
  note: {
    fontSize: 14,
    color: colors.grey,
    ...fonts.fontPrimary,
    textAlign: 'center',
    padding: 10,
  },
  noteLink: {
    ...fonts.fontPrimaryBold,
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
    getUser: Function,
    getOrgs: Function,
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
    this.props.getUser();
    this.props.getOrgs();
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
              <Text style={styles.note}>
                Can&apos;t see all your organizations? You may have to
                <Text
                  style={styles.noteLink}
                  onPress={() =>
                    Linking.openURL('https://github.com/settings/applications')}
                >
                  {' '}request approval{' '}
                </Text>
                <Text>for them.</Text>
              </Text>
            </SectionList>

            <View style={styles.update}>
              <Text style={styles.updateText}>GitPoint v1.1</Text>
              <TouchableOpacity onPress={this.checkForUpdate}>
                <Text style={[styles.updateText, styles.updateTextSub]}>
                  {this.state.updateText}
                </Text>
              </TouchableOpacity>
            </View>
          </ParallaxScroll>}
      </ViewContainer>
    );
  }
}

export const AuthProfileScreen = connect(mapStateToProps, mapDispatchToProps)(
  AuthProfile
);
