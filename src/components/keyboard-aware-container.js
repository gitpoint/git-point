// @flow
import React, { Component } from 'react';
import { View, Keyboard, Platform } from 'react-native';

type Props = {
  onKeyboardStateChange: (state: string, event: any) => void,
  style?: Object | Array<Object>,
  children: Object,
};

export class KeyboardAwareContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.keyboardWillShowSub = null;
    this.keyboardWillHideSub = null;
  }

  componentWillMount() {
    const keyboardShowEventName =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardHideEventName =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    this.keyboardWillShowSub = Keyboard.addListener(
      keyboardShowEventName,
      e => {
        this.props.onKeyboardStateChange('show', e);
      }
    );

    this.keyboardWillHideSub = Keyboard.addListener(
      keyboardHideEventName,
      e => {
        this.props.onKeyboardStateChange('hide', e);
      }
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  render() {
    return <View style={this.props.style}>{this.props.children}</View>;
  }
}

KeyboardAwareContainer.defaultProps = {
  style: {},
};
