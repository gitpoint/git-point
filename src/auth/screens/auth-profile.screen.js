import React, { Component } from 'react';
import styled from 'styled-components/native';
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
  locale: state.auth.locale,
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

const BioListItem = styled(ListItem).attrs({
  containerStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  titleStyle: {
    color: colors.greyDark,
    ...fonts.fontPrimary,
  },
})``;

class AuthProfile extends Component {
  props: {
    getUser: Function,
    getOrgs: Function,
    getStarCount: Function,
    user: Object,
    orgs: Array,
    locale: string,
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
      locale,
      starCount,
      navigation,
      hasInitialUser,
    } = this.props;

    const hasBackButton = navigation.state.routeName === 'AuthProfile';

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
              locale={locale}
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
          navigateBack={hasBackButton}
          navigation={navigation}
          showMenu
          menuIcon="gear"
          menuAction={() =>
            navigation.navigate('UserOptions', {
              title: translate('auth.userOptions.title', locale),
            })
          }
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
              <SectionList title={translate('common.bio', locale)}>
                <BioListItem
                  titleNumberOfLines={0}
                  title={emojifyText(user.bio)}
                  hideChevron
                />
              </SectionList>
            )}

          {!isPending && (
            <EntityInfo
              entity={user}
              orgs={orgs}
              navigation={navigation}
              locale={locale}
            />
          )}

          {!isPending && (
            <View>
              <SectionList
                title={translate('common.orgs', locale)}
                noItems={orgs.length === 0}
                noItemsMessage={translate('common.noOrgsMessage', locale)}
              >
                {orgs.map(item => (
                  <UserListItem
                    key={item.id}
                    user={item}
                    navigation={navigation}
                  />
                ))}
                <Text style={styles.note}>
                  {translate('auth.profile.orgsRequestApprovalTop', locale)}
                  {'\n'}
                  <Text
                    style={styles.noteLink}
                    onPress={() =>
                      openURLInView('https://github.com/settings/applications')
                    }
                  >
                    {translate(
                      'auth.profile.orgsRequestApprovalBottom',
                      locale
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
