import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import config from '@config';

import {loadingAnimation} from '@utils';

export class LoadingMembersList extends Component {
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
    const {title} = this.props;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.sectionTitle}>{title}</Text>

        <View style={styles.avatarContainer}>
          {[...Array(10)].map((item, i) => {
            return (
              <Animated.View key={i} style={[styles.avatar, {opacity: this.state.fadeAnimValue}]} />
            );
          })}
        </View>
      </View>
    );
  }
}

LoadingMembersList.propTypes = {
  title: PropTypes.string,
};

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
    backgroundColor: config.colors.grey,
    marginRight: 5,
  },
  sectionTitle: {
    color: config.colors.black,
    fontFamily: 'AvenirNext-Bold',
    marginBottom: 10,
  },
});