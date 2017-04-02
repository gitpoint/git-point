import React, { Component } from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';

import colors from '../config/colors';

class CommentInput extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      height: 0
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Icon style={styles.icon} name="send" color={colors.grey} />

          <TextInput
            placeholder="Add a comment..."
            multiline={true}
            onChangeText={(text) => {
              this.setState({text});
            }}
            onContentSizeChange={(event) => {
              this.setState({height: event.nativeEvent.contentSize.height});
            }}
            placeholderTextColor={colors.grey}
            style={[styles.textInput, {height: Math.max(30, this.state.height)}]}
            value={this.state.text}
          />

          <Text style={styles.post}>Post</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: colors.greyLight,
    borderTopWidth: 1,
    backgroundColor: 'transparent',
  },
  wrapper: {
    padding: 10,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {

  },
  textInput: {
    fontSize: 14,
    flex: 1,
    marginLeft: 15,
    marginRight: 5,
    color: colors.black,
    fontFamily: 'AvenirNext-Regular',
  },
  post: {
    flex: 0.15,
    fontSize: 16,
    alignItems: 'flex-end',
    justifyContent: 'center',
    color: colors.primaryDark,
    letterSpacing: 1,
    fontFamily: 'AvenirNext-DemiBold',
  },
});

export default CommentInput;
