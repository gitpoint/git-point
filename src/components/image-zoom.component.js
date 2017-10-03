import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PhotoView from 'react-native-photo-view';

import { colors } from 'config';

const styles = StyleSheet.create({
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
});

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
          <View style={styles.modalContainer}>
            <PhotoView
              resizeMode={'contain'}
              onTap={() => this.closeModal()}
              source={uri}
              minimumZoomScale={0.5}
              maximumZoomScale={3}
              style={{ width: window.width, height: window.height }}
            />

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.closeModal()}
              style={styles.closeButton}
            >
              <Icon color={colors.white} size={28} name="x" type="octicon" />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    }

    return (
      <TouchableHighlight
        onPress={() => this.openModal()}
        underlayColor="transparent"
        style={styles.touchable}
      >
        <Image style={style} source={uri} />
      </TouchableHighlight>
    );
  }
}
