import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Animated,
  ScrollView,
  StyleSheet,
} from 'react-native';
import FuzzySearch from 'fuzzy-search';

import { fonts, normalize } from 'config';

const styles = StyleSheet.create({
  suggestionsRowContainer: {
    padding: 5,
    flexDirection: 'row',
    paddingRight: 15,
    paddingBottom: 15,
  },
  userDetailsBox: {
    flex: 1,
    margin: 5,
  },
  displayNameText: {
    fontSize: normalize(12),
    ...fonts.fontPrimaryBold,
  },
});

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

  constructor() {
    super();

    this.state = {
      height: new Animated.Value(0),
      tracking: false,
    };
  }

  componentDidUpdate() {
    const { text, trigger } = this.props;

    // Make sure the trigger character is preceded by a space
    if (
      !this.state.tracking &&
      text[text.length - 1] === trigger &&
      (text[text.length - 2] === ' ' || text.length === 1)
    ) {
      this.startTracking();
    }

    if (this.state.tracking && text[text.length - 1] === ' ') {
      this.stopTracking();
    }
  }

  onSuggestionTap(user, close) {
    const { text, trigger } = this.props;

    this.props.updateText(
      `${text.slice(0, text.lastIndexOf(trigger) - 1)} @${user} ```
    );

    if (close) {
      this.stopTracking();
    }
  }

  getSearchedUsers() {
    const { users, text, trigger } = this.props;

    const base = new FuzzySearch(users, [], { sort: true });

    return base.search(text.slice(text.lastIndexOf(trigger) + 1, text.length));
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
      duration: 100,
      toValue: this.props.height,
      friction: 4,
    }).start();
  }

  closeSuggestionsPanel() {
    Animated.timing(this.state.height, {
      duration: 100,
      toValue: 0,
    }).start();
  }

  updateHeight(num) {
    const newValue = num * 50;

    if (newValue < this.props.height) {
      Animated.timing(this.state.height, {
        duration: 100,
        toValue: newValue,
      }).start();
    } else {
      Animated.spring(this.state.height, {
        duration: 100,
        toValue: this.props.height,
        friction: 4,
      }).start();
    }
  }

  renderSuggestionsRow(users) {
    return users.map(user =>
      <TouchableHighlight
        key={user}
        onPress={() => this.onSuggestionTap(user, true)}
      >
        <View style={styles.suggestionsRowContainer}>
          <View style={styles.userDetailsBox}>
            <Text style={styles.displayNameText}>
              @{user}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    let searched = [];

    if (this.state.tracking) {
      searched = this.getSearchedUsers();
      this.updateHeight(searched.length);
    }

    return (
      <Animated.View
        style={[{ ...this.props.style }, { height: this.state.height }]}
      >
        <ScrollView keyboardShouldPersistTaps="always">
          {this.state.tracking && this.renderSuggestionsRow(searched)}
        </ScrollView>
      </Animated.View>
    );
  }
}
