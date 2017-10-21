import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Image, Modal, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import PhotoView from 'react-native-photo-view';

import { colors } from 'config';

const Touchable = styled.Text`
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.Text`
  flex: 1;
  background-color: ${colors.black};
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.Text`
  position: absolute;
  top: 30;
  right: 10;
`;

export class ImageZoom extends Component {
  props: {
    uri: string,
    style: Object,
  };

  constructor() {
    super();
    this.state = {
      imgZoom: false,
    };
  }

  openModal() {
    this.setState({ imgZoom: true });
  }

  closeModal() {
    this.setState({ imgZoom: false });
  }

  render() {
    const window = Dimensions.get('window');
    const { uri, style } = this.props;

    if (this.state.imgZoom) {
      return (
        <Modal animationType={'fade'} onRequestClose={() => null}>
          <ModalContainer>
            <PhotoView
              resizeMode={'contain'}
              onTap={() => this.closeModal()}
              source={uri}
              minimumZoomScale={0.5}
              maximumZoomScale={3}
              style={{ width: window.width, height: window.height }}
            />

            <CloseButton activeOpacity={0.5} onPress={() => this.closeModal()}>
              <Icon color={colors.white} size={28} name="x" type="octicon" />
            </CloseButton>
          </ModalContainer>
        </Modal>
      );
    }

    return (
      <Touchable onPress={() => this.openModal()} underlayColor="transparent">
        <Image style={style} source={uri} />
      </Touchable>
    );
  }
}
