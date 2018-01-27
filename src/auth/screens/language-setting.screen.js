/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { colors, fonts } from 'config';
import { changeLocale } from 'auth';
import { bindActionCreators } from 'redux';
import { emojifyText, translate } from 'utils';
import { NavigationActions } from 'react-navigation';
import { ViewContainer } from 'components';
import languages from './language-settings';

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
  language: {
    flexDirection: 'row',
  },
  flag: {
    paddingRight: 7,
    color: colors.black, // random any color for the correct display emoji
  },
});

const StyledListItem = styled(ListItem).attrs({
  containerStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
  },
  titleStyle: props => ({
    color: props.signOut ? colors.red : colors.black,
    ...fonts.fontPrimary,
  }),
  underlayColor: colors.greyLight,
  hideChevron: props => props.hideChevron,
})``;

class LanguageSettings extends Component {
  props: {
    locale: string,
    changeLocale: () => void,
  };

  componentWillReceiveProps(nextState) {
    if (nextState.locale !== this.props.locale) {
      const navigationParams = NavigationActions.setParams({
        params: {
          title: translate('auth.userOptions.language', nextState.locale),
        },
        key: nextState.navigation.state.key,
      });

      nextState.navigation.dispatch(navigationParams);
    }
  }

  render() {
    const { locale, changeLocale } = this.props;

    return (
      <ViewContainer>
        <FlatList
          data={languages}
          renderItem={({ item }) => {
            return (
              <StyledListItem
                title={
                  <View style={styles.language}>
                    <Text style={styles.flag}>
                      {emojifyText(item.emojiCode)}
                    </Text>
                    <Text style={styles.listTitle}>{item.name}</Text>
                  </View>
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
      </ViewContainer>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.auth.locale,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeLocale,
    },
    dispatch
  );

export const LanguageSettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageSettings);
