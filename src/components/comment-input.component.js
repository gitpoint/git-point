// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { MentionArea } from 'components';
import { translate } from 'utils';
import { colors, fonts, normalize } from 'config';

const styles = StyleSheet.create({
  container: {
    borderTopColor: colors.greyLight,
    borderTopWidth: 1,
    backgroundColor: 'transparent',
  },
  wrapper: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: normalize(12),
    flex: 1,
    marginRight: 5,
    color: colors.black,
    ...fonts.fontPrimary,
  },
  postButtonContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  postButtonDisabled: {
    color: colors.grey,
  },
  postButtonEnabled: {
    color: colors.primaryDark,
  },
});

export class CommentInput extends Component {
  props: {
    users: Array,
    userHasPushPermission: boolean,
    issueLocked: boolean,
    language: string,
    onSubmit: Function,
  };

  state: {
    text: string,
    height: number,
  };

  constructor() {
    super();

    this.state = {
      text: '',
      height: 0,
    };
  }

  handleSubmitEditing = (body: string): void => {
    if (Platform.OS === 'android') {
      this.setState({ text: `${body}\n` });
    }
  };

  handleSubmit = (): void => {
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    const { userHasPushPermission, issueLocked, language, users } = this.props;

    let userCanPost = null;

    if (issueLocked && !userHasPushPermission) {
      userCanPost = false;
    } else {
      userCanPost = true;
    }

    return (
      <View style={styles.container}>
        <MentionArea
          trigger="@"
          text={this.state.text}
          updateText={text => this.setState({ text })}
          height={200}
          users={users}
        />
        <View style={styles.wrapper}>
          {userCanPost &&
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={
                issueLocked && userHasPushPermission
                  ? translate('issue.main.lockedCommentInput', language)
                  : translate('issue.main.commentInput', language)
              }
              multiline
              blurOnSubmit={false}
              onChangeText={text => this.setState({ text })}
              onContentSizeChange={event =>
                this.setState({ height: event.nativeEvent.contentSize.height })}
              onSubmitEditing={event =>
                this.handleSubmitEditing(event.nativeEvent.text)}
              placeholderTextColor={colors.grey}
              style={[
                styles.textInput,
                { height: Math.max(30, this.state.height) },
              ]}
              value={this.state.text}
            />}

          {!userCanPost &&
            <Text style={[styles.textInput, { color: colors.grey }]}>
              {translate('issue.main.lockedIssue', language)}
            </Text>}

          {userCanPost &&
            <TouchableOpacity
              disabled={this.state.text === ''}
              style={styles.postButtonContainer}
              onPress={() => this.handleSubmit(this.state.text)}
            >
              <Icon
                name="send"
                iconStyle={
                  this.state.text === ''
                    ? styles.postButtonDisabled
                    : styles.postButtonEnabled
                }
              />
            </TouchableOpacity>}

          {!userCanPost &&
            this.props.issueLocked &&
            <View style={styles.postButtonContainer}>
              <Icon name="lock" type="octicon" color={colors.grey} />
            </View>}
        </View>
      </View>
    );
  }
}
