import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Collapsible from 'react-native-collapsible';

export class ToggleView extends Component {
  props: {
    children: any,
    TouchableView: any,
  };

  state: {
    collapsed: boolean,
  };

  constructor() {
    super();

    this.state = {
      collapsed: true,
    };
  }

  _toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this._toggle()}>
          {this.props.TouchableView}
        </TouchableOpacity>
        <Collapsible collapsed={this.state.collapsed}>
          {this.props.children}
        </Collapsible>
      </View>
    );
  }
}

ToggleView.defaultProps = {
  TouchableView: <Text>…</Text>,
};
