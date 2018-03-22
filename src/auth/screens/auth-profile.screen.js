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
import { Trans, withI18n } from '@lingui/react';

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
import { emojifyText, openURLInView } from 'utils';

const mapStateToProps = state => ({
  user: state.auth.user,
  orgs: state.auth.orgs,
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
    starCount: string,
    isPendingUser: boolean,
    isPendingOrgs: boolean,
    i18n: Object,
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
      i18n,
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
              title: i18n.t`Options`,
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
              <SectionList title={i18n.t`BIO`}>
                <BioListItem
                  titleNumberOfLines={0}
                  title={emojifyText(user.bio)}
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
                title={i18n.t`ORGANIZATIONS`}
                noItems={orgs.length === 0}
                noItemsMessage={i18n.t`No organizations`}
              >
                {orgs.map(item => (
                  <UserListItem
                    key={item.id}
                    user={item}
                    navigation={navigation}
                  />
                ))}
                <Note>
                  <Trans>Can't see all your organizations?</Trans>
                  {'\n'}
                  <NoteLink
                    onPress={() =>
                      openURLInView('https://github.com/settings/applications')
                    }
                  >
                    {i18n.t`You may have to request approval for them.`}
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
  withI18n()(AuthProfile)
);
