import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales.min';
import { colors, fonts, normalize } from 'config';
import { LabelButton } from 'components';

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actorLink: {
    padding: 1,
    paddingRight: 4,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  linkDescription: {
    ...fonts.fontPrimaryBold,
    fontSize: normalize(13),
    color: colors.primaryDark,
  },
  date: {
    color: colors.greyDark,
  },
  textContainer: {
    marginLeft: 54,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: 'row',
  },
});

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
      <View style={styles.container}>
        <Text>
          {review_requester.login} requested review from{' '}
          {requested_reviewer.login}
        </Text>
      </View>
    );
  }
}

class LabeledComponent extends Component {
  props: {
    event: Object,
    // authUser: Object,
  };

  render() {
    const {
      actor,
      label,
      created_at,
      // navigation,
      // authUser,
    } = this.props.event;

    return (
      <View style={[styles.container, styles.header]}>
        <View style={styles.textContainer}>
          <TouchableOpacity
            style={styles.actorLink}
            onPress={() => {
              // TODO: figure out navigation
              // navigation.navigate(
              //   authUser.login === actor.login
              //     ? 'AuthProfile'
              //     : 'Profile',
              //   {
              //     user: actor,
              //   },
              // )
            }}
          >
            <Text style={styles.linkDescription}>
              {actor.login}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              padding: 3,
              paddingRight: 6,
              paddingLeft: 0,
            }}
          >
            added the
          </Text>
          <LabelButton label={label} />
          <Text
            style={{
              padding: 3,
              paddingLeft: 6,
              paddingRight: 0,
            }}
          >
            label
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {moment(created_at).fromNow()}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

const Labeled = connect(mapStateToProps)(LabeledComponent);
