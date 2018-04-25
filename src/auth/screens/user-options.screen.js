/* eslint-disable no-shadow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import CookieManager from 'react-native-cookies';

import { ViewContainer, SectionList } from 'components';
import { colors, fonts, normalize } from 'config';
import { resetNavigationTo, openURLInView, t } from 'utils';
import { version } from 'package.json';
import codePush from 'react-native-code-push';
import { signOut } from 'auth';

const mapStateToProps = state => ({
  locale: state.auth.locale,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signOut,
    },
    dispatch
  );

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
  check: t('Check for update', locale),
  checking: t('Checking for update...', locale),
  updated: t('App is up to date', locale),
  available: t('Update is available!', locale),
  notApplicable: t('Not applicable in debug mode', locale),
});

class UserOptions extends Component {
  props: {
    locale: string,
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
          title: t('Options', nextState.locale),
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
    const { locale, navigation } = this.props;

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList>
            <StyledListItem
              title={t('Language', locale)}
              onPress={() =>
                navigation.navigate('LanguageSettings', {
                  title: t('Language', locale),
                  locale,
                })
              }
            />
            <StyledListItem
              title={t('Open in Browser', locale)}
              onPress={() => openURLInView(this.props.user.html_url)}
            />

            <StyledListItem
              title={t('Privacy Policy', locale)}
              onPress={() =>
                navigation.navigate('PrivacyPolicy', {
                  title: t('Privacy Policy', locale),
                  locale,
                })
              }
            />
            <StyledListItem
              title={t('Make a donation', locale)}
              onPress={() =>
                openURLInView('https://opencollective.com/git-point')
              }
            />
            <StyledListItem
              title={t('Sign Out', locale)}
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
