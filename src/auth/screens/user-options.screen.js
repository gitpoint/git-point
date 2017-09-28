/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ScrollView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import CookieManager from 'react-native-cookies';

import { ViewContainer, SectionList } from 'components';
import { colors, fonts, normalize } from 'config';
import { resetNavigationTo, translate, emojifyText } from 'utils';
import { version } from 'package.json';
import codePush from 'react-native-code-push';
import { signOut, changeLanguage } from 'auth';
import languages from './language-settings';

const mapStateToProps = state => ({
  language: state.auth.language,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signOut,
      changeLanguage,
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
  language: {
    flexDirection: 'row',
  },
  flag: {
    paddingRight: 7,
    color: colors.black, // random any color for the correct display emoji
  },
  containerStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
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
    changeLanguage: () => void,
    signOut: () => void,
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
    const { signOut, navigation } = this.props;

    signOut().then(() => {
      CookieManager.clearAll().then(() => {
        resetNavigationTo('Login', navigation);
      });
    });
  }

  render() {
    const { language, changeLanguage, navigation } = this.props;

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList title={translate('auth.userOptions.language', language)}>
            <FlatList
              data={languages}
              renderItem={({ item }) => {
                return (
                  <ListItem
                    title={
                      <View style={styles.language}>
                        <Text style={styles.flag}>
                          {emojifyText(item.emojiCode)}
                        </Text>
                        <Text style={styles.listTitle}>
                          {item.name}
                        </Text>
                      </View>
                    }
                    titleStyle={styles.listTitle}
                    containerStyle={styles.containerStyle}
                    hideChevron={language !== item.code}
                    rightIcon={{ name: 'check' }}
                    onPress={() => changeLanguage(item.code)}
                    underlayColor={colors.greyLight}
                  />
                );
              }}
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
