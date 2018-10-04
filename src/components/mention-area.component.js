import React, { Component } from 'react';
import fuzzysort from 'fuzzysort';
import styled from 'styled-components';
import { TouchableOpacity, Animated, ScrollView } from 'react-native';

import { animations, fonts, normalize } from 'config';

const StyledAnimatedView = styled(Animated.View)`
  ${({ style }) => style};
`;

const SuggestionsRowContainer = styled.View`
  flex-direction: row;
  padding: 5px 15px;
`;

const UserDetailsBox = styled.View`
  flex: 1;
  margin: 5px;
`;

const DisplayNameText = styled.Text`
  font-size: ${normalize(12)};
  ${fonts.fontPrimary};
`;

export class MentionArea extends Component {
  props: {
    users: Array,
    trigger: string,
    text: string,
    updateText: Function,
    height: number,
    style: Object,
  };

  state: {
    height: number,
    tracking: boolean,
  };

  constructor(props) {
    super(props);

    this.state = {
      height: new Animated.Value(0),
      tracking: false,
    };
  }

  componentDidUpdate() {
    const { text, trigger } = this.props;

    if (
      !this.state.tracking &&
      text[text.length - 1] === trigger &&
      (text[text.length - 2] === ' ' || text.length === 1)
    ) {
      this.startTracking();
    }

    if (this.state.tracking && (text[text.length - 1] === ' ' || text === '')) {
      this.stopTracking();
    }
  }

  onSuggestionTap(user, close) {
    const { text, trigger } = this.props;

    if (text.slice(0, text.lastIndexOf(trigger)) === '') {
      this.props.updateText(`@${user} `);
    } else {
      this.props.updateText(
        `${text.slice(0, text.lastIndexOf(trigger) - 1)} @${user} `
      );
    }

    if (close) {
      this.stopTracking();
    }
  }

  getSearchedUsers() {
    const { users, text, trigger = '@' } = this.props;
    const searchableText = text.slice(text.lastIndexOf(trigger) + 1);
    const results = fuzzysort
      .go(searchableText, users, {
        highlightMatches: false,
        threshold: -200,
      })
      .map(user => user.target);

    return results;
  }

  startTracking() {
    this.openSuggestionsPanel();
    this.setState({ tracking: true });
  }

  stopTracking() {
    this.closeSuggestionsPanel();
    this.setState({ tracking: false });
  }

  openSuggestionsPanel() {
    Animated.spring(this.state.height, {
      duration: animations.duration,
      toValue: this.props.height,
      friction: animations.friction,
    }).start();
  }

  closeSuggestionsPanel() {
    Animated.timing(this.state.height, {
      duration: animations.duration,
      toValue: 0,
    }).start();
  }

  updateHeight(num) {
    const newValue = num * 50;

    if (newValue < this.props.height) {
      Animated.timing(this.state.height, {
        duration: animations.speed,
        toValue: newValue,
      }).start();
    } else {
      Animated.spring(this.state.height, {
        duration: animations.duration,
        toValue: this.props.height,
        friction: animations.friction,
      }).start();
    }
  }

  renderSuggestionsRow(users) {
    return users.map(user => (
      <TouchableOpacity
        key={user}
        onPress={() => this.onSuggestionTap(user, true)}
      >
        <SuggestionsRowContainer>
          <UserDetailsBox>
            <DisplayNameText>@{user}</DisplayNameText>
          </UserDetailsBox>
        </SuggestionsRowContainer>
      </TouchableOpacity>
    ));
  }

  render() {
    let searched = [];

    if (this.state.tracking) {
      searched = this.getSearchedUsers();
      this.updateHeight(searched.length);
    }

    return (
      <StyledAnimatedView
        style={{ ...this.props.style, height: this.state.height }}
      >
        <ScrollView keyboardShouldPersistTaps="always">
          {this.state.tracking && this.renderSuggestionsRow(searched)}
        </ScrollView>
      </StyledAnimatedView>
    );
  }
}
