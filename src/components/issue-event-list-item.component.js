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
      case 'unlabeled':
        return <Labeled unlabeled event={event} />;
      case 'closed':
        return <Closed event={event} />;
      // case 'reopened':
      case 'merged':
        return <Merged event={event} />;
      // case 'referenced':
      // case 'renamed':
      // case 'assigned':
      // case 'unassigned':
      // case 'review_dismissed':
      // case 'review_request_removed':
      // case 'dismissed_review':
      // case 'milestoned':
      // case 'demilestoned':
      // case 'locked':
      // case 'unlocked':
      case 'head_ref_deleted':
        return <HeadRef action="deleted" event={event} />;
      case 'head_ref_restored':
        return <HeadRef action="restored" event={event} />;
      default:
        // return null;
        return (
          <Text>
            {event.event}
          </Text>
        );
    }
  }
}

class ReviewRequested extends Component {
  props: {
    event: Object,
  };

  render() {
    const {
      review_requester: reviewRequester,
      requested_reviewer: requestedReviewer,
      created_at: createdAt,
    } = this.props.event;

    return (
      <View style={[styles.container, styles.header]}>
        <EventIcon name="eye" />
        <View style={styles.contentContainer}>
          <View style={styles.eventTextContainer}>
            <ActorLink actor={reviewRequester} />
            <Text style={{ padding: 3 }}>requested review from</Text>
            <ActorLink actor={requestedReviewer} />
          </View>
          <Date date={createdAt} />
        </View>
      </View>
    );
  }
}

class LabeledComponent extends Component {
  props: {
    event: Object,
    unlabeled: boolean,
    // authUser: Object,
  };

  render() {
    const {
      actor,
      label,
      created_at: createdAt,
      // navigation,
      // authUser,
    } = this.props.event;

    const action = this.props.unlabeled ? 'removed' : 'added';

    return (
      <View style={[styles.container, styles.header]}>
        <EventIcon name="tag" />
        <View style={styles.contentContainer}>
          <View style={styles.eventTextContainer}>
            <ActorLink actor={actor} />
            <Text
              style={{
                padding: 3,
                paddingRight: 6,
                paddingLeft: 0,
              }}
            >
              {action}
            </Text>
            <LabelButton label={label} />
          </View>
          <Date date={createdAt} />
        </View>
      </View>
    );
  }
}

class Closed extends Component {
  props: {
    event: Object,
  };

  render() {
    const { actor, created_at: createdAt } = this.props.event;

    return (
      <View style={[styles.container, styles.header]}>
        <EventIcon
          name="circle-slash"
          backgroundColor={colors.darkerRed}
          iconColor={colors.white}
        />
        <View style={styles.contentContainer}>
          <View style={styles.eventTextContainer}>
            <ActorLink actor={actor} />
            <Text style={{ padding: 3 }}>closed this</Text>
          </View>
          <Date date={createdAt} />
        </View>
      </View>
    );
  }
}

class Merged extends Component {
  props: {
    event: Object,
  };

  render() {
    const {
      actor,
      commit_id: commitId,
      created_at: createdAt,
    } = this.props.event;

    // TODO: should be able to click commit and view changes
    return (
      <View style={[styles.container, styles.header]}>
        <EventIcon
          name="git-merge"
          backgroundColor={colors.purple}
          iconColor={colors.white}
        />
        <View style={styles.contentContainer}>
          <View style={styles.eventTextContainer}>
            <ActorLink actor={actor} />
            <Text style={{ padding: 3 }}>
              merged {commitId.slice(0, 7)}
            </Text>
          </View>
          <Date date={createdAt} />
        </View>
      </View>
    );
  }
}

class HeadRef extends Component {
  props: {
    event: Object,
    action: String,
  };

  render() {
    const { actor, created_at: createdAt } = this.props.event;

    return (
      <View style={[styles.container, styles.header]}>
        <EventIcon
          name="git-branch"
          backgroundColor={colors.greyBlue}
          iconColor={colors.white}
        />
        <View style={styles.contentContainer}>
          <View style={styles.eventTextContainer}>
            <ActorLink actor={actor} />
            <Text style={{ padding: 3 }}>
              {this.props.action} this branch
            </Text>
          </View>
          <Date date={createdAt} />
        </View>
      </View>
    );
  }
}

class ActorLink extends Component {
  props: {
    actor: Object,
  };

  render() {
    const { actor } = this.props;

    return (
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
    );
  }
}

const marginLeftForIconName = name => {
  switch (name) {
    case 'git-branch':
    case 'git-merge':
      return 8;
    default:
      return 2;
  }
};

class EventIcon extends Component {
  props: {
    name: String,
    iconColor: String,
    backgroundColor: String,
  };

  render() {
    const {
      name,
      iconColor = 'black',
      backgroundColor = colors.greyLight,
    } = this.props;

    return (
      <Icon
        iconStyle={{
          marginLeft: marginLeftForIconName(name),
          marginTop: 1,
          color: iconColor,
        }}
        containerStyle={[styles.iconContainer, { backgroundColor }]}
        name={name}
        type="octicon"
        size={16}
      />
    );
  }
}

class Date extends Component {
  props: {
    date: String,
  };

  render() {
    const { date } = this.props;

    return (
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          {moment(date).fromNow()}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

const Labeled = connect(mapStateToProps)(LabeledComponent);
