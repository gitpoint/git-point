// @flow
import React, { Component } from 'react';
import { View, Keyboard, Platform } from 'react-native';

type Props = {
  onKeyboardStateChange: (state: string, event: any) => void,
  style?: Object | Array<Object>,
  children: Object,
};

class KeyboardAwareContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.keyboardWillShowSub = null;
    this.keyboardWillHideSub = null;
    this.keyboardDidHideSub = null;
    this.keyboardDidShowSub = null;
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', e => {
      if (Platform.OS === 'ios') {
        this.props.onKeyboardStateChange('show', e);
      }
    });
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', e => {
      if (Platform.OS === 'ios') {
        this.props.onKeyboardStateChange('hide', e);
      }
    });
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', e => {
      if (Platform.OS === 'android') {
        this.props.onKeyboardStateChange('show', e);
      }
    });
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', e => {
      if (Platform.OS === 'android') {
        this.props.onKeyboardStateChange('hide', e);
      }
    });
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  render() {
    return <View style={this.props.style}>{this.props.children}</View>;
  }
}

export default KeyboardAwareContainer;
