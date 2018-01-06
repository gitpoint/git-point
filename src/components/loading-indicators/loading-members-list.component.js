import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

import { colors, fonts } from 'config';
import { loadingAnimation } from 'utils';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    padding: 15,
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: 15,
    height: 30,
    width: 30,
    backgroundColor: colors.grey,
    marginRight: 5,
  },
  sectionTitle: {
    color: colors.black,
    ...fonts.fontPrimaryBold,
    marginBottom: 10,
  },
});

export class LoadingMembersList extends Component {
  props: {
    title: string,
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
    const { title } = this.props;

    return (
      <View style={styles.wrapper}>
        <Text style={styles.sectionTitle}>{title}</Text>

        <View style={styles.avatarContainer}>
          {[...Array(10)].map((item, index) => {
            return (
              <Animated.View
                key={index} // eslint-disable-line react/no-array-index-key
                style={[styles.avatar, { opacity: this.state.fadeAnimValue }]}
              />
            );
          })}
        </View>
      </View>
    );
  }
}
