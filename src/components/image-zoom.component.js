import React, { Component } from 'react';
import { Image, Modal, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components';
import PhotoView from 'react-native-photo-view';
import SvgUri from 'react-native-svg-from-uri';

import { colors } from 'config';

const Touchable = styled.TouchableHighlight`
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  flex: 1;
  background-color: ${colors.black};
  justify-content: center;
  align-items: center;
`;

const StyledPhotoView = styled(PhotoView).attrs({
  resizeMode: 'contain',
  minimumZoomScale: 0.5,
  maximumZoomScale: 3,
})`
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

const CloseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  position: absolute;
  top: 30px;
  right: 10px;
`;

const CloseIcon = styled(Icon).attrs({
  color: colors.white,
  size: 28,
  name: 'x',
  type: 'octicon',
})``;

export class ImageZoom extends Component {
  props: {
    uri: string,
    style: Object,
  };

  constructor(props) {
    super(props);
    this.state = {
      imgZoom: false,
      imgFailed: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ imgZoom: true });
  }

  closeModal() {
    this.setState({ imgZoom: false });
  }

  render() {
    const { uri, style } = this.props;

    if (this.state.imgZoom) {
      return (
        <Modal
          nativeId="image-zoom-modal"
          animationType="fade"
          onRequestClose={this.closeModal}
        >
          <ModalContainer>
            <StyledPhotoView
              nativeId="image-zoom-photo-view"
              onTap={this.closeModal}
              source={uri}
            />

            <CloseButton
              nativeId="image-zoom-close-button"
              onPress={this.closeModal}
            >
              <CloseIcon />
            </CloseButton>
          </ModalContainer>
        </Modal>
      );
    }

    if (this.state.imgFailed) {
      return <SvgUri style={style} source={uri} />;
    }

    return (
      <Touchable
        nativeId="image-zoom-clickable-img"
        onPress={this.openModal}
        underlayColor="transparent"
      >
        <Image
          style={style}
          source={uri}
          onError={() => this.setState({ imgFailed: true })}
        />
      </Touchable>
    );
  }
}
