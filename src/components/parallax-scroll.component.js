import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Icon } from 'react-native-elements';

import { colors, fonts, normalize } from 'config';

const STICKY_HEADER_HEIGHT = 62;

type Props = {
  renderContent: any,
  stickyTitle: string,
  navigateBack?: boolean,
  showMenu?: boolean,
  menuAction?: Function,
  menuIcon?: string,
  navigation: Object,
  children?: React.Element<*>,
  refreshControl?: React.Element<*>,
};

type State = {
  parallaxHeaderHeight: number,
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    width: window.width,
    backgroundColor: colors.primaryDark,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: colors.primaryDark,
    width: window.width,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  stickySectionText: {
    color: colors.white,
    ...fonts.fontPrimaryBold,
    fontSize: normalize(16),
    margin: 10,
  },
  fixedSectionLeft: {
    position: 'absolute',
    bottom: 0,
  },
  fixedSectionRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export class ParallaxScroll extends Component {
  props: Props;

  state: State;

  constructor() {
    super();
    this.state = {
      parallaxHeaderHeight: this.getParallaxHeaderHeight(),
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.dimensionsDidChange);
  }

  getParallaxHeaderHeight = (window = Dimensions.get('window')) => {
    let devider = 2;

    if (window.width > window.height) {
      devider = Platform.OS === 'ios' ? 1.2 : 1.4;
    }

    return window.height / devider;
  };

  dimensionsDidChange = ({ window }) => {
    this.setState({
      parallaxHeaderHeight: this.getParallaxHeaderHeight(window),
    });
  };

  render() {
    const {
      renderContent,
      stickyTitle,
      navigateBack,
      showMenu,
      menuIcon,
      menuAction,
      navigation,
      children,
      refreshControl,
    } = this.props;

    return (
      <ParallaxScrollView
        backgroundColor={colors.primaryDark}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={this.state.parallaxHeaderHeight}
        backgroundSpeed={10}
        renderBackground={() =>
          <View key="background">
            <View
              style={[
                styles.background,
                { height: this.state.parallaxHeaderHeight },
              ]}
            />
          </View>}
        renderForeground={renderContent}
        renderStickyHeader={() =>
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>
              {stickyTitle}
            </Text>
          </View>}
        renderFixedHeader={() =>
          <View key="fixed-header">
            {navigateBack &&
              <View style={styles.fixedSectionLeft}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={42}
                    color={colors.white}
                    underlayColor="transparent"
                  />
                </TouchableOpacity>
              </View>}

            {showMenu &&
              <View style={styles.fixedSectionRight}>
                <TouchableOpacity onPress={menuAction}>
                  <Icon
                    name={menuIcon}
                    type="font-awesome"
                    color={colors.white}
                    underlayColor="transparent"
                  />
                </TouchableOpacity>
              </View>}
          </View>}
        refreshControl={refreshControl}
      >
        {children}
      </ParallaxScrollView>
    );
  }
}

ParallaxScroll.defaultProps = {
  navigateBack: false,
  showMenu: false,
  menuIcon: 'ellipsis-h',
  menuAction: undefined,
  children: null,
  refreshControl: null,
};
