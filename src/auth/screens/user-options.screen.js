/* eslint-disable no-shadow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import CookieManager from 'react-native-cookies';
import { withI18n } from '@lingui/react';

import { ViewContainer, SectionList } from 'components';
import { colors, fonts, normalize } from 'config';
import { resetNavigationTo, openURLInView } from 'utils';
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

class UserOptions extends Component {
  props: {
    locale: string,
    signOut: () => void,
    i18n: Object,
    navigation: Object,
    user: Object,
  };

  constructor(props) {
    super(props);

    const { i18n } = props;

    this.state = {
      updateText: i18n.t`Check for update`,
    };
  }

  componentWillReceiveProps(nextState) {
    if (nextState.locale !== this.props.locale) {
      const { i18n } = this.props;

      this.setState({
        updateText: i18n.t`Check for update`,
      });

      const navigationParams = NavigationActions.setParams({
        params: {
          title: i18n.t`Options`,
        },
        key: nextState.navigation.state.key,
      });

      nextState.navigation.dispatch(navigationParams);
    }
  }

  checkForUpdate = () => {
    const { i18n } = this.props;

    if (__DEV__) {
      this.setState({
        updateText: i18n.t`Not applicable in debug mode`,
      });
    } else {
      this.setState({ updateText: i18n.t`Checking for update...` });
      codePush
        .sync({
          updateDialog: true,
          installMode: codePush.InstallMode.IMMEDIATE,
        })
        .then(update => {
          this.setState({
            updateText: update
              ? i18n.t`Update is available!`
              : i18n.t`App is up to date`,
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
    const { locale, i18n, navigation } = this.props;

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList>
            <StyledListItem
              title={i18n.t`Language`}
              onPress={() =>
                navigation.navigate('LanguageSettings', {
                  title: i18n.t`Language`,
                  locale,
                })
              }
            />
            <StyledListItem
              title={i18n.t`Open in Browser`}
              onPress={() => openURLInView(this.props.user.html_url)}
            />

            <StyledListItem
              title={i18n.t`Privacy Policy`}
              onPress={() =>
                navigation.navigate('PrivacyPolicy', {
                  title: i18n.t`Privacy Policy`,
                  locale,
                })
              }
            />
            <StyledListItem
              title={i18n.t`Make a donation`}
              onPress={() =>
                openURLInView('https://opencollective.com/git-point')
              }
            />
            <StyledListItem
              title={i18n.t`Sign Out`}
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
  withI18n()(UserOptions)
);
