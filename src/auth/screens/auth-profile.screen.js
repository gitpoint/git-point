import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  RefreshControl,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { ListItem } from 'react-native-elements';

import {
  ViewContainer,
  UserProfile,
  SectionList,
  ParallaxScroll,
  UserListItem,
  EntityInfo,
} from 'components';
import { colors, fonts, normalize } from 'config';
import { getUser, getOrgs, getStarCount } from 'auth';
import { emojifyText, openURLInView, translate } from 'utils';

const mapStateToProps = state => ({
  user: state.auth.user,
  orgs: state.auth.orgs,
  language: state.auth.language,
  starCount: state.auth.starCount,
  isPendingUser: state.auth.isPendingUser,
  isPendingOrgs: state.auth.isPendingOrgs,
  hasInitialUser: state.auth.hasInitialUser,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUser,
      getOrgs,
      getStarCount,
    },
    dispatch
  );

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

class AuthProfile extends Component {
  props: {
    getUser: Function,
    getOrgs: Function,
    getStarCount: Function,
    user: Object,
    orgs: Array,
    language: string,
    starCount: string,
    isPendingUser: boolean,
    isPendingOrgs: boolean,
    hasInitialUser: boolean,
    navigation: Object,
  };

  componentDidMount() {
    this.refreshProfile();
  }

  refreshProfile = () => {
    this.props.getUser();
    this.props.getOrgs();
    this.props.getStarCount();
  };

  render() {
    const {
      user,
      orgs,
      isPendingUser,
      isPendingOrgs,
      language,
      starCount,
      navigation,
      hasInitialUser,
    } = this.props;

    const isPending = isPendingUser || isPendingOrgs;

    return (
      <ViewContainer>
        <ParallaxScroll
          renderContent={() => (
            <UserProfile
              type="user"
              initialUser={hasInitialUser ? user : {}}
              user={hasInitialUser ? user : {}}
              starCount={hasInitialUser ? starCount : ''}
              language={language}
              navigation={navigation}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isPendingUser}
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
          {isPending && (
            <ActivityIndicator
              animating={isPending}
              style={{ height: Dimensions.get('window').height / 3 }}
              size="large"
            />
          )}

          {hasInitialUser &&
            user.bio &&
            user.bio !== '' && (
              <SectionList title={translate('common.bio', language)}>
                <ListItem
                  subtitle={emojifyText(user.bio)}
                  subtitleStyle={styles.listSubTitle}
                  hideChevron
                />
              </SectionList>
            )}

          {!isPending && (
            <EntityInfo entity={user} orgs={orgs} navigation={navigation} />
          )}

          {!isPending && (
            <View>
              <SectionList
                title={translate('common.orgs', language)}
                noItems={orgs.length === 0}
                noItemsMessage={translate('common.noOrgsMessage', language)}
              >
                {orgs.map(item => (
                  <UserListItem
                    key={item.id}
                    user={item}
                    navigation={navigation}
                  />
                ))}
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
              </SectionList>
            </View>
          )}
        </ParallaxScroll>
      </ViewContainer>
    );
  }
}

export const AuthProfileScreen = connect(mapStateToProps, mapDispatchToProps)(
  AuthProfile
);
