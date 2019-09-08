import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  RefreshControl,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import {
  ViewContainer,
  UserProfile,
  SectionList,
  ParallaxScroll,
  UserListItem,
  EntityInfo,
} from 'components';
import { colors, fonts, normalize, getHeaderForceInset } from 'config';
import { getUser, getOrgs, getStarCount } from 'auth';
import { emojifyText, openURLInView, t } from 'utils';

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

const StyledSafeAreaView = styled(SafeAreaView).attrs({
  forceInset: getHeaderForceInset('MyProfile'),
})`
  background-color: ${colors.primaryDark};
`;

const Note = styled.Text`
  font-size: ${normalize(11)};
  color: ${colors.primaryDark};
  ${fonts.fontPrimaryLight};
  text-align: center;
  padding: 10px;
`;

const NoteLink = styled.Text`
  ${fonts.fontPrimarySemiBold};
`;

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
        <StyledSafeAreaView />

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
              title: t('Options', locale),
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
              <SectionList title={t('BIO', locale)}>
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
                title={t('ORGANIZATIONS', locale)}
                noItems={orgs.length === 0}
                noItemsMessage={t('No organizations', locale)}
              >
                {orgs.map(item => (
                  <UserListItem
                    key={item.id}
                    user={item}
                    navigation={navigation}
                  />
                ))}
                <Note>
                  {t("Can't see all your organizations?", locale)}
                  {'\n'}
                  <NoteLink
                    onPress={() =>
                      openURLInView('https://github.com/settings/applications')
                    }
                  >
                    {t('You may have to request approval for them.', locale)}
                  </NoteLink>
                </Note>
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
