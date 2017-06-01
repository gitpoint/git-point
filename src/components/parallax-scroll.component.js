import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

import ParallaxScrollView from "react-native-parallax-scroll-view";
import { Icon } from "react-native-elements";

import config from "config";

const window = Dimensions.get("window");
const PARALLAX_HEADER_HEIGHT = window.height / 2;
const STICKY_HEADER_HEIGHT = 62;

type Props = {
  renderContent: any,
  stickyTitle: string,
  navigateBack?: boolean,
  showMenu?: boolean,
  menuAction?: Function,
  navigation: Object,
  children?: React.Element<*>
};

export const ParallaxScroll = ({
  renderContent,
  stickyTitle,
  navigateBack,
  showMenu,
  menuAction,
  navigation,
  children
}: Props) => (
  <ParallaxScrollView
    backgroundColor={config.colors.primarydark}
    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
    backgroundSpeed={10}
    renderBackground={() => (
      <View key="background">
        <View style={styles.background} />
      </View>
    )}
    renderForeground={renderContent}
    renderStickyHeader={() => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{stickyTitle}</Text>
      </View>
    )}
    renderFixedHeader={() => (
      <View key="fixed-header">
        {navigateBack &&
          <View style={styles.fixedSectionLeft}>
            <Icon
              style={styles.headerIcon}
              name="chevron-left"
              size={42}
              color={config.colors.white}
              onPress={() => navigation.goBack()}
              underlayColor="transparent"
            />
          </View>}

        {showMenu &&
          <View style={styles.fixedSectionRight}>
            <Icon
              style={styles.headerIcon}
              name="ellipsis-h"
              type="font-awesome"
              onPress={menuAction}
              color={config.colors.white}
              underlayColor="transparent"
            />
          </View>}
      </View>
    )}
  >
    {children}
  </ParallaxScrollView>
);

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    width: window.width,
    backgroundColor: config.colors.primarydark,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: config.colors.primarydark,
    width: window.width,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  stickySectionText: {
    color: config.colors.white,
    fontFamily: "AvenirNext-Bold",
    fontSize: 18,
    fontWeight: "bold",
    margin: 10
  },
  fixedSectionLeft: {
    position: "absolute",
    bottom: 0
  },
  fixedSectionRight: {
    position: "absolute",
    bottom: 10,
    right: 10
  }
});
