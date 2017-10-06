import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
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
    alignItems: 'stretch',
  },
  iconContainer: {
    backgroundColor: colors.greyLight,
    borderRadius: 13,
    width: 26,
    height: 26,
    marginLeft: 14,
    marginRight: 14,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 26,
  },
  contentContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  eventTextContainer: {
    paddingBottom: 10,
    flexDirection: 'row',
    flexGrow: 1,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 2,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 39,
    width: 39,
  },
  actorLink: {
    padding: 1,
    paddingRight: 4,
  },
  linkDescription: {
    ...fonts.fontPrimaryBold,
    fontSize: normalize(13),
    color: colors.primaryDark,
  },
  date: {
    color: colors.greyDark,
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
      // case 'renamed':
      // case 'assigned':
      // case 'unassigned':
      default:
        return null;
      // return <Text>{event.event}</Text>;
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
        <Icon
          containerStyle={styles.iconContainer}
          name="tag"
          type="octicon"
          size={16}
        />
        <View style={styles.contentContainer}>
          <View style={styles.eventTextContainer}>
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
              added
            </Text>
            <LabelButton label={label} />
            <Text
              style={{
                padding: 3,
                paddingLeft: 6,
                paddingRight: 0,
              }}
            />
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {moment(created_at).fromNow()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

const Labeled = connect(mapStateToProps)(LabeledComponent);
