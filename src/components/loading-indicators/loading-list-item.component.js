import React, { Component } from 'react';
import { StyleSheet, Animated, View } from 'react-native';

import { colors } from 'config';
import { loadingAnimation } from 'utils';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  wrapper: {
    flexDirection: 'row',
    marginLeft: 10,
    height: 34,
    alignItems: 'center',
  },
  textBar: {
    paddingLeft: 34,
    height: 7,
    width: 150,
    backgroundColor: colors.greyDark,
  },
});

export class LoadingListItem extends Component {
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
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Animated.View style={{ opacity: this.state.fadeAnimValue }} />

          <Animated.View
            style={[styles.textBar, { opacity: this.state.fadeAnimValue }]}
          />
        </View>
      </View>
    );
  }
}
