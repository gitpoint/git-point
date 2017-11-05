// @flow

import React, { Component } from 'react';
import { Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

import { MentionArea } from 'components';
import { translate } from 'utils';
import { colors, fonts, normalize } from 'config';

const Container = styled.View`
  border-top-color: ${colors.greyLight};
  border-top-width: 1;
  background-color: transparent;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  justify-content: center;
`;

const InputText = styled.TextInput`
  font-size: ${normalize(12)};
  flex: 1;
  margin-right: 5;
  color: ${colors.black};
  ${fonts.fontPrimary};
`;
const TextInputText = InputText.withComponent(Text);

const PostButtonContainer = styled.TouchableOpacity`
  flex: 0.15;
  align-items: flex-end;
  justify-content: center;
`;

const PostButtonIcon = styled(Icon).attrs({
  color: props => (props.disabled ? colors.grey : colors.primaryDark),
})``;

export class CommentInput extends Component {
  props: {
    users: Array,
    userHasPushPermission: boolean,
    issueLocked: boolean,
    locale: string,
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
    const { userHasPushPermission, issueLocked, locale, users } = this.props;

    const userCanPost = !issueLocked || userHasPushPermission;

    return (
      <Container>
        <MentionArea
          trigger="@"
          text={this.state.text}
          updateText={text => this.setState({ text })}
          height={200}
          users={users}
        />
        <Wrapper>
          {userCanPost && (
            <InputText
              underlineColorAndroid="transparent"
              placeholder={
                issueLocked && userHasPushPermission
                  ? translate('issue.main.lockedCommentInput', locale)
                  : translate('issue.main.commentInput', locale)
              }
              multiline
              blurOnSubmit={false}
              onChangeText={text => this.setState({ text })}
              onContentSizeChange={event =>
                this.setState({ height: event.nativeEvent.contentSize.height })}
              onSubmitEditing={event =>
                this.handleSubmitEditing(event.nativeEvent.text)}
              placeholderTextColor={colors.grey}
              style={{
                height: Math.max(30, this.state.height),
              }}
              value={this.state.text}
            />
          )}

          {!userCanPost && (
            <TextInputText style={{ color: colors.grey }}>
              {translate('issue.main.lockedIssue', locale)}
            </TextInputText>
          )}

          {userCanPost && (
            <PostButtonContainer
              disabled={this.state.text === ''}
              onPress={() => this.handleSubmit(this.state.text)}
            >
              <PostButtonIcon name="send" disabled={this.state.text === ''} />
            </PostButtonContainer>
          )}

          {!userCanPost &&
            this.props.issueLocked && (
              <PostButtonContainer>
                <Icon name="lock" type="octicon" color={colors.grey} />
              </PostButtonContainer>
            )}
        </Wrapper>
      </Container>
    );
  }
}
