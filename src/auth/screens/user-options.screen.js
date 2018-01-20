/* eslint-disable no-shadow */
import React, { Component } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import CookieManager from 'react-native-cookies';

import { ViewContainer, SectionList } from 'components';
import { colors, fonts, normalize } from 'config';
import {
  resetNavigationTo,
  openURLInView,
  translate,
  emojifyText,
} from 'utils';
import { version } from 'package.json';
import codePush from 'react-native-code-push';
import { signOut, changeLocale } from 'auth';
import languages from './language-settings';

const mapStateToProps = state => ({
  locale: state.auth.locale,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signOut,
      changeLocale,
    },
    dispatch
  );

const ListTitle = styled.Text`
  color: ${colors.black};
  ${fonts.fontPrimary};
`;

const Update = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  margin-vertical: 40;
`;

const UpdateText = styled.Text`
  color: ${colors.greyDark};
  ${fonts.fontPrimary};
`;

const UpdateTextSub = UpdateText.extend`
  font-size: ${normalize(11)};
`;

const Language = styled.View`
  flex-direction: row;
`;

const Flag = styled.Text`
  padding-right: 7;
  color: ${colors.black}; // random any color for the correct display emoji
`;

const StyledListItem = styled(ListItem).attrs({
  containerStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  titleStyle: props => ({
    color: props.signOut ? colors.red : colors.black,
    ...fonts.fontPrimary,
  }),
  underlayColor: colors.greyLight,
  hideChevron: props => props.hideChevron,
})``;

const updateText = locale => ({
  check: translate('auth.profile.codePushCheck', locale),
  checking: translate('auth.profile.codePushChecking', locale),
  updated: translate('auth.profile.codePushUpdated', locale),
  available: translate('auth.profile.codePushAvailable', locale),
  notApplicable: translate('auth.profile.codePushNotApplicable', locale),
});

class UserOptions extends Component {
  props: {
    locale: string,
    changeLocale: () => void,
    signOut: () => void,
    navigation: Object,
    user: Object,
  };

  constructor(props) {
    super(props);

    this.state = {
      updateText: updateText(props.locale).check,
    };
  }

  componentWillReceiveProps(nextState) {
    if (nextState.locale !== this.props.locale) {
      this.setState({
        updateText: updateText(nextState.locale).check,
      });

      const navigationParams = NavigationActions.setParams({
        params: {
          title: translate('auth.userOptions.title', nextState.locale),
        },
        key: nextState.navigation.state.key,
      });

      nextState.navigation.dispatch(navigationParams);
    }
  }

  checkForUpdate = () => {
    if (__DEV__) {
      this.setState({
        updateText: updateText(this.props.locale).notApplicable,
      });
    } else {
      this.setState({ updateText: updateText(this.props.locale).checking });
      codePush
        .sync({
          updateDialog: true,
          installMode: codePush.InstallMode.IMMEDIATE,
        })
        .then(update => {
          this.setState({
            updateText: update
              ? updateText(this.props.locale).available
              : updateText(this.props.locale).updated,
          });
        });
    }
  };

  signOutUser() {
    const { signOut, navigation } = this.props;

    signOut().then(() => {
      CookieManager.clearAll().then(() => {
        resetNavigationTo('Login', navigation);
      });
    });
  }

  render() {
    const { locale, changeLocale, navigation } = this.props;

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList title={translate('auth.userOptions.language', locale)}>
            <FlatList
              data={languages}
              renderItem={({ item }) => {
                return (
                  <StyledListItem
                    title={
                      <Language>
                        <Flag>{emojifyText(item.emojiCode)}</Flag>
                        <ListTitle>{item.name}</ListTitle>
                      </Language>
                    }
                    hideChevron={locale !== item.code}
                    rightIcon={{ name: 'check' }}
                    onPress={() => changeLocale(item.code)}
                  />
                );
              }}
              keyExtractor={(item, index) => index}
              extraData={locale}
            />
          </SectionList>

          <SectionList>
            <StyledListItem
              title={translate('common.openInBrowser', locale)}
              onPress={() => openURLInView(this.props.user.html_url)}
            />

            <StyledListItem
              title={translate('auth.userOptions.privacyPolicy', locale)}
              onPress={() =>
                navigation.navigate('PrivacyPolicy', {
                  title: translate('auth.privacyPolicy.title', locale),
                  locale,
                })}
            />
            <StyledListItem
              title={translate('auth.userOptions.donate', locale)}
              onPress={() =>
                openURLInView('https://opencollective.com/git-point')}
            />
            <StyledListItem
              title={translate('auth.userOptions.signOut', locale)}
              hideChevron
              onPress={() => this.signOutUser()}
              signOut
            />
          </SectionList>

          <Update onPress={this.checkForUpdate}>
            <UpdateText>GitPoint v{version}</UpdateText>
            <UpdateTextSub>{this.state.updateText}</UpdateTextSub>
          </Update>
        </ScrollView>
      </ViewContainer>
    );
  }
}

export const UserOptionsScreen = connect(mapStateToProps, mapDispatchToProps)(
  UserOptions
);
