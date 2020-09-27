import React, { Component } from 'react';
import { View, Dimensions, Platform, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Icon } from 'react-native-elements';
import styled from 'styled-components';

import { colors, normalize, fonts } from 'config';

const STICKY_HEADER_HEIGHT = 44;

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

const Background = styled.View`
  position: absolute;
  top: 0;
  background-color: ${colors.primaryDark};
  height: ${props => props.height};
`;

const StickySection = styled.View`
  height: ${STICKY_HEADER_HEIGHT};
  background-color: ${colors.primaryDark};
  align-items: center;
  justify-content: flex-end;
`;

const StickySectionText = styled.Text`
  color: ${colors.white};
  font-size: ${normalize(16)};
  margin: 10px;
  ${fonts.fontPrimaryBold};
`;

const FixedSectionLeft = styled.View`
  position: absolute;
  bottom: 0;
`;

const FixedSectionRight = styled.View`
  position: absolute;
  bottom: 10;
  right: 10;
`;

export class ParallaxScroll extends Component {
  props: Props;

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      parallaxHeaderHeight: this.getParallaxHeaderHeight(),
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.dimensionsDidChange);
  }

  getParallaxHeaderHeight = (window = Dimensions.get('window')) => {
    let divider = 2;

    if (window.width > window.height) {
      divider = Platform.OS === 'ios' ? 1.2 : 1.4;
    }

    return window.height / divider;
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
        renderBackground={() => (
          <View key="background">
            <Background height={this.state.parallaxHeaderHeight} />
          </View>
        )}
        renderForeground={renderContent}
        renderStickyHeader={() => (
          <StickySection key="sticky-header">
            <StickySectionText>{stickyTitle}</StickySectionText>
          </StickySection>
        )}
        renderFixedHeader={() => (
          <View key="fixed-header">
            {navigateBack && (
              <FixedSectionLeft>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={42}
                    color={colors.white}
                    underlayColor="transparent"
                  />
                </TouchableOpacity>
              </FixedSectionLeft>
            )}

            {showMenu && (
              <FixedSectionRight>
                <TouchableOpacity onPress={menuAction}>
                  <Icon
                    name={menuIcon}
                    type="font-awesome"
                    color={colors.white}
                    underlayColor="transparent"
                  />
                </TouchableOpacity>
              </FixedSectionRight>
            )}
          </View>
        )}
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
