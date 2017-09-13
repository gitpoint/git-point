import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { version } from 'package.json';
import codePush from 'react-native-code-push';

import { ViewContainer, SectionList } from 'components';
import { colors, fonts, normalize } from 'config';
import { openURLInView, resetNavigationTo, translate } from 'utils';
import { signOut, changeLanguage } from 'auth';
import languages from './language-settings';

const mapStateToProps = state => ({
  language: state.auth.language,
});

const mapDispatchToProps = dispatch => ({
  signOutByDispatch: () => dispatch(signOut()),
  changeLanguageByDispatch: lang => dispatch(changeLanguage(lang)),
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
  logoutTitle: {
    color: colors.red,
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
});

const updateText = lang => ({
  check: translate('auth.profile.codePushCheck', lang),
  checking: translate('auth.profile.codePushChecking', lang),
  updated: translate('auth.profile.codePushUpdated', lang),
  available: translate('auth.profile.codePushAvailable', lang),
  notApplicable: translate('auth.profile.codePushNotApplicable', lang),
});

class UserOptions extends Component {
  props: {
    language: string,
    changeLanguageByDispatch: () => void,
    signOutByDispatch: () => void,
    navigation: Object,
  };

  constructor(props) {
    super(props);

    this.state = {
      updateText: updateText(props.language).check,
    };
  }

  componentWillReceiveProps(nextState) {
    if (nextState.language !== this.props.language) {
      this.setState({
        updateText: updateText(nextState.language).check,
      });

      const navigationParams = NavigationActions.setParams({
        params: {
          title: translate('auth.userOptions.title', nextState.language),
        },
        key: nextState.navigation.state.key,
      });

      nextState.navigation.dispatch(navigationParams);
    }
  }

  checkForUpdate = () => {
    if (__DEV__) {
      this.setState({
        updateText: updateText(this.props.language).notApplicable,
      });
    } else {
      this.setState({ updateText: updateText(this.props.language).checking });
      codePush
        .sync({
          updateDialog: true,
          installMode: codePush.InstallMode.IMMEDIATE,
        })
        .then(update => {
          this.setState({
            updateText: update
              ? updateText(this.props.language).available
              : updateText(this.props.language).updated,
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
    const { language, changeLanguageByDispatch, navigation } = this.props;

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList title={translate('auth.userOptions.language', language)}>
            <FlatList
              data={languages}
              renderItem={({ item }) =>
                <ListItem
                  title={item.name}
                  titleStyle={styles.listTitle}
                  hideChevron={language !== item.code}
                  rightIcon={{ name: 'check' }}
                  onPress={() => changeLanguageByDispatch(item.code)}
                  underlayColor={colors.greyLight}
                />}
              keyExtractor={(item, index) => index}
              extraData={this.props.language}
            />
          </SectionList>

          <SectionList>
            <ListItem
              title={translate('auth.userOptions.privacyPolicy', language)}
              titleStyle={styles.listTitle}
              onPress={() =>
                navigation.navigate('PrivacyPolicy', {
                  title: translate('auth.privacyPolicy.title', language),
                  language,
                })}
              underlayColor={colors.greyLight}
            />

            <ListItem
              title={translate('auth.userOptions.signOut', language)}
              titleStyle={styles.logoutTitle}
              hideChevron
              onPress={() => this.signOutUser()}
              underlayColor={colors.greyLight}
            />
          </SectionList>

          <TouchableOpacity style={styles.update} onPress={this.checkForUpdate}>
            <Text style={styles.updateText}>
              GitPoint v{version}
            </Text>
            <Text style={[styles.updateText, styles.updateTextSub]}>
              {this.state.updateText}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ViewContainer>
    );
  }
}

export const UserOptionsScreen = connect(mapStateToProps, mapDispatchToProps)(
  UserOptions
);
