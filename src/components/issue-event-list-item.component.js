import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    flexShrink: 1,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  eventTextContainer: {
    paddingBottom: 10,
    flexDirection: 'row',
    flexGrow: 1,
    flexShrink: 1,
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
  boldText: {
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
      case 'reopened':
        return <Reopened event={event} />;
      case 'merged':
        return <Merged event={event} />;
      // case 'referenced':
      case 'renamed':
        return <Renamed event={event} />;
      case 'assigned':
        return <Assigned event={event} />;
      case 'unassigned':
        return <Assigned unassigned event={event} />;
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
            <Text style={{ padding: 3 }}>
              <ActorLink actor={reviewRequester} /> requested review from{' '}
              <ActorLink actor={requestedReviewer} />
            </Text>
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
            <Text
              style={{
                padding: 3,
                paddingRight: 6,
                paddingLeft: 0,
              }}
            >
              <ActorLink actor={actor} /> {action}
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
            <Text style={{ padding: 3 }}>
              <ActorLink actor={actor} /> closed this
            </Text>
          </View>
          <Date date={createdAt} />
        </View>
      </View>
    );
  }
}

class Reopened extends Component {
  props: {
    event: Object,
  };

  render() {
    const { actor, created_at: createdAt } = this.props.event;

    return (
      <View style={[styles.container, styles.header]}>
        <EventIcon
          name="primitive-dot"
          backgroundColor={colors.green}
          iconColor={colors.white}
        />
        <View style={styles.contentContainer}>
          <View style={styles.eventTextContainer}>
            <Text style={{ padding: 3 }}>
              <ActorLink actor={actor} /> reopened this
            </Text>
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
            <Text style={{ padding: 3 }}>
              <ActorLink actor={actor} /> merged {commitId.slice(0, 7)}
            </Text>
          </View>
          <Date date={createdAt} />
        </View>
      </View>
    );
  }
}

class Renamed extends Component {
  props: {
    event: Object,
  };

  render() {
    const { actor, rename, created_at: createdAt } = this.props.event;

    return (
      <View style={[styles.container, styles.header]}>
        <EventIcon name="pencil" />
        <View style={styles.contentContainer}>
          <View style={styles.eventTextContainer}>
            <Text style={{ padding: 1 }}>
              <ActorLink actor={actor} /> changed the title from{' '}
              <Bold>{rename.from.trim()}</Bold> to{' '}
              <Bold>{rename.to.trim()}</Bold>
            </Text>
          </View>
          <Date date={createdAt} />
        </View>
      </View>
    );
  }
}

class Assigned extends Component {
  props: {
    event: Object,
    unassigned: boolean,
  };

  render() {
    const { assigner, assignee, created_at: createdAt } = this.props.event;
    const action = this.props.unassigned ? 'unassigned' : 'assigned';

    return (
      <View style={[styles.container, styles.header]}>
        <EventIcon name="person" />
        <View style={styles.contentContainer}>
          <View style={styles.eventTextContainer}>
            <Text style={{ padding: 3 }}>
              <ActorLink actor={assigner} /> {action}{' '}
              <ActorLink actor={assignee} />
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
            <Text style={{ padding: 3 }}>
              <ActorLink actor={actor} /> {this.props.action} this branch
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
      <Bold>
        {actor.login}
      </Bold>
    );
  }
}

const marginLeftForIconName = name => {
  switch (name) {
    case 'git-branch':
    case 'git-merge':
    case 'primitive-dot':
      return 8;
    case 'person':
      return 4;
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
      iconColor = '#586069',
      backgroundColor = '#E6EBF1',
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

class Bold extends Component {
  props: {
    children: Object | String,
  };

  render() {
    return (
      <Text style={styles.boldText}>
        {this.props.children}
      </Text>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

const Labeled = connect(mapStateToProps)(LabeledComponent);
