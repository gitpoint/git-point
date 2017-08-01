/* eslint-disable no-unused-expressions */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Animated, LayoutAnimation } from 'react-native';
import { TabBarBottom, NavigationActions } from 'react-navigation';

import { animations } from 'config';

const mapStateToProps = state => {
  return {
    isTabBarVisible: state.auth.isTabBarVisible,
  };
};

class TabBarComponent extends Component {
  props: {
    isTabBarVisible: boolean,
    navigation: Object,
    jumpToIndex: Function,
  };

  state: {
    animatedHeight: Animated,
    expandedHeight: number,
  };

  constructor() {
    super();
    this.state = {
      animatedHeight: new Animated.Value(),
      expandedHeight: '',
    };
  }

  componentWillReceiveProps(nextState) {
    if (nextState.isTabBarVisible !== this.props.isTabBarVisible) {
      nextState.isTabBarVisible ? this.show() : this.hide();
    }
  }

  setExpandedHeight(event) {
    if (!this.state.expandedHeight) {
      const expandedHeight = event.nativeEvent.layout.height;

      this.state = {
        animatedHeight: new Animated.Value(expandedHeight),
        expandedHeight,
      };
    }
  }

  changeHeight(from, to) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    this.state.animatedHeight.setValue(from);

    Animated.spring(this.state.animatedHeight, {
      toValue: to,
      duration: animations.duration,
      friction: animations.friction,
    }).start();
  }

  show() {
    this.changeHeight(0, this.state.expandedHeight);
  }

  hide() {
    this.changeHeight(this.state.expandedHeight, 0);
  }

  render() {
    return (
      <Animated.View
        style={{ height: this.state.animatedHeight }}
        onLayout={event => this.setExpandedHeight(event)}
      >
        <TabBarBottom
          {...this.props}
          jumpToIndex={index => {
            const { dispatch, state } = this.props.navigation;

            if (
              state.index === index &&
              state.routes[index].routes.length > 1
            ) {
              const stackRouteName = [
                'Events',
                'Notifications',
                'Search',
                'MyProfile',
              ][index];

              dispatch(
                NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: stackRouteName }),
                  ],
                })
              );
            } else {
              this.props.jumpToIndex(index);
            }
          }}
        />
      </Animated.View>
    );
  }
}

export const TabBar = connect(mapStateToProps)(TabBarComponent);
