import React, {Component} from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import colors from '@config';

import {
  loadingAnimation,
} from '@config';

class LoadingUserListItem extends Component {
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
      <View
        style={styles.container}>
      <View style={styles.wrapper}>
        <Animated.View
          style={[
            styles.avatar, {opacity: this.state.fadeAnimValue}]}
          />

        <Animated.View
          style={[
            styles.textBar, {opacity: this.state.fadeAnimValue}]}
          />
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'transparent'
  },
  wrapper: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 34,
    height: 34,
    backgroundColor: config.colors.greyDark,
    borderRadius: 17,
    marginRight: 10,
  },
  textBar: {
    height: 7,
    width: 80,
    backgroundColor: config.colors.greyDark,
  },
});

export default LoadingUserListItem;
