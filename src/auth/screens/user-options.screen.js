import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import { ViewContainer, SectionList } from 'components';
import { colors, fonts } from 'config';
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
});

class UserOptions extends Component {
  props: {
    language: string,
    changeLanguageByDispatch: () => void,
    signOutByDispatch: () => void,
    navigation: Object,
  };

  componentWillReceiveProps(nextState) {
    if (nextState.language !== this.props.language) {
      const navigationParams = NavigationActions.setParams({
        params: {
          title: translate('auth.userOptions.title', nextState.language),
        },
        key: nextState.navigation.state.key,
      });

      nextState.navigation.dispatch(navigationParams);
    }
  }

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
        </ScrollView>
      </ViewContainer>
    );
  }
}

export const UserOptionsScreen = connect(mapStateToProps, mapDispatchToProps)(
  UserOptions
);
