import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment/min/moment-with-locales.min';

export class IssueEventListItem extends Component {
  props: {
    event: Object,
  };

  render() {
    const { event } = this.props;

    switch (event.event) {
      case 'review_requested':
        return <ReviewRequested event={event} />;
      case 'labeled':
        return <Labeled event={event} />;
      default:
        return null;
    }
  }
}

class ReviewRequested extends Component {
  props: {
    event: Object,
  };

  render() {
    const { review_requester, requested_reviewer } = this.props.event;

    return (
      <View>
        <Text>
          {review_requester.login} requested review from{' '}
          {requested_reviewer.login}
        </Text>
      </View>
    );
  }
}

class Labeled extends Component {
  props: {
    event: Object,
  };

  render() {
    const { actor, label, created_at } = this.props.event;

    return (
      <View>
        <Text>
          {actor.login} added {label.name} (#{label.color}) label{' '}
          {moment(created_at).fromNow()}
        </Text>
      </View>
    );
  }
}
