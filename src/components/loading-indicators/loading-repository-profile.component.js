// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Icon } from 'react-native-elements';

import { colors, fonts, normalize } from 'config';
import { loadingAnimation, t } from 'utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkenContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  profile: {
    flex: 2,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    ...fonts.fontPrimaryBold,
    fontSize: normalize(16),
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
  subtitle: {
    color: colors.white,
    ...fonts.fontPrimary,
    fontSize: normalize(12),
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'transparent',
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    minWidth: 300,
  },
  unit: {
    flex: 1,
  },
  unitText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: normalize(10),
    ...fonts.fontPrimary,
  },
  icon: {
    paddingBottom: 20,
  },
});

export class LoadingRepositoryProfile extends Component {
  props: {
    locale: string,
  };

  state: {
    fadeAnimValue: Animated,
  };

  constructor() {
    super();
    this.state = {
      fadeAnimValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    loadingAnimation(this.state.fadeAnimValue).start();
  }

  render() {
    const { locale } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.profile}>
            <Icon
              containerStyle={[styles.icon, { marginLeft: 10 }]}
              name={'repo'}
              type="octicon"
              size={45}
              color={colors.greyLight}
            />
          </View>

          <View style={styles.details}>
            <View style={styles.unit}>
              <Text style={styles.unitText}>{t('Stars', locale)}</Text>
            </View>

            <View style={styles.unit}>
              <Text style={styles.unitText}>{t('Forks', locale)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
