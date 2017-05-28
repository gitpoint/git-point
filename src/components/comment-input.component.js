import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';

import config from '@config';

export class CommentInput extends Component {
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
    const {userHasPushPermission, issueLocked} = this.props;

    let userCanPost = null;
    if (issueLocked && !userHasPushPermission) {
      userCanPost = false;
    } else {
      userCanPost = true;
    }

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Icon name="send" color={config.colors.grey} />

          {userCanPost &&
            <TextInput
              placeholder={(issueLocked && userHasPushPermission) ? "Locked, but you can still comment..." : "Add a comment..."}
              multiline={true}
              blurOnSubmit={true}
              onChangeText={text => this.setState({text})}
              onContentSizeChange={event => this.setState({height: event.nativeEvent.contentSize.height})}
              onSubmitEditing={event => this.handleSubmit(event.nativeEvent.text)}
              placeholderTextColor={config.colors.grey}
              style={[
                styles.textInput,
                {height: Math.max(30, this.state.height)},
              ]}
              value={this.state.text}
            />
          }

          {!userCanPost &&
            <Text style={[styles.textInput, {color: config.colors.grey}]}>Issue is locked</Text>
          }

          {!this.props.issueLocked &&
            <TouchableOpacity disabled={this.state.text === ''} style={styles.postButtonContainer} onPress={() => this.handleSubmit(this.state.text)}>
              <Text style={[styles.postButton, this.state.text === '' ? styles.postButtonDisabled : styles.postButtonEnabled]}>Post</Text>
            </TouchableOpacity>
          }

          {this.props.issueLocked &&
            <View style={styles.postButtonContainer}>
              <Icon name="lock" type="octicon" color={config.colors.grey} />
            </View>
          }
        </View>
      </View>
    );
  }
}

CommentInput.propTypes = {
  userHasPushPermission: PropTypes.bool,
  issueLocked: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: config.colors.greyLight,
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
    color: config.colors.black,
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
    color: config.colors.grey,
  },
  postButtonEnabled: {
    color: config.colors.primaryDark,
  }
});