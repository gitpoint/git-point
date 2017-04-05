import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';

import colors from '../config/colors';

class CommentInput extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      height: 0,
    };
  }

  handleSubmit = (body) => {
    this.props.onSubmitEditing(body);
    this.setState({text: ''});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Icon style={styles.icon} name="send" color={colors.grey} />

          <TextInput
            placeholder="Add a comment..."
            multiline={true}
            blurOnSubmit={true}
            onChangeText={text => this.setState({text})}
            onContentSizeChange={event => this.setState({height: event.nativeEvent.contentSize.height})}
            onSubmitEditing={event => this.handleSubmit(event.nativeEvent.text)}
            placeholderTextColor={colors.grey}
            style={[
              styles.textInput,
              {height: Math.max(30, this.state.height)},
            ]}
            value={this.state.text}
          />

          <TouchableOpacity disabled={this.state.text === ''} style={styles.postButtonContainer} onPress={() => this.handleSubmit(this.state.text)}>
            <Text style={[styles.postButton, this.state.text === '' ? styles.postButtonDisabled : styles.postButtonEnabled]}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

CommentInput.propTypes = {
  onSubmitEditing: PropTypes.func,
};

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
  textInput: {
    fontSize: 14,
    flex: 1,
    marginLeft: 15,
    marginRight: 5,
    color: colors.black,
    fontFamily: 'AvenirNext-Regular',
  },
  postButtonContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  postButton: {
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: 'AvenirNext-DemiBold',
  },
  postButtonDisabled: {
    color: colors.grey,
  },
  postButtonEnabled: {
    color: colors.primaryDark,
  }
});

export default CommentInput;
