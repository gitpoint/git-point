import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
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
        return (
          <Event
            icon={<EventIcon name="eye" />}
            text={
              <Text style={{ padding: 3 }}>
                <ActorLink actor={event.review_requester} /> requested review
                from <ActorLink actor={event.requested_reviewer} />
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      case 'labeled':
        return <Labeled event={event} />;
      case 'unlabeled':
        return <Labeled unlabeled event={event} />;
      case 'closed':
        return (
          <Event
            icon={
              <EventIcon
                name="circle-slash"
                backgroundColor={colors.darkerRed}
                iconColor={colors.white}
              />
            }
            text={
              <Text style={{ padding: 3 }}>
                <ActorLink actor={event.actor} /> closed this
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      case 'reopened':
        return (
          <Event
            icon={
              <EventIcon
                name="primitive-dot"
                backgroundColor={colors.green}
                iconColor={colors.white}
              />
            }
            text={
              <Text style={{ padding: 3 }}>
                <ActorLink actor={event.actor} /> reopened this
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      case 'merged':
        return (
          <Event
            icon={
              <EventIcon
                name="git-merge"
                backgroundColor={colors.purple}
                iconColor={colors.white}
              />
            }
            text={
              <Text style={{ padding: 3 }}>
                <ActorLink actor={event.actor} /> merged{' '}
                <Bold>{event.commit_id.slice(0, 7)}</Bold>
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      // case 'referenced':
      case 'renamed':
        return (
          <Event
            icon={<EventIcon name="pencil" />}
            text={
              <Text style={{ padding: 1 }}>
                <ActorLink actor={event.actor} /> changed the title from{' '}
                <Bold>{event.rename.from.trim()}</Bold> to{' '}
                <Bold>{event.rename.to.trim()}</Bold>
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      case 'assigned':
        return <Assigned event={event} />;
      case 'unassigned':
        return <Assigned unassigned event={event} />;
      // case 'review_dismissed':
      // case 'review_request_removed':
      case 'milestoned':
        return <Milestoned event={event} />;
      case 'demilestoned':
        return <Milestoned demilestoned event={event} />;
      case 'locked':
        return <Locked event={event} />;
      case 'unlocked':
        return <Locked unlocked event={event} />;
      case 'head_ref_deleted':
        return <HeadRef action="deleted" event={event} />;
      case 'head_ref_restored':
        return <HeadRef action="restored" event={event} />;
      case 'marked_as_duplicate':
        return <MarkedAsDuplicate event={event} />;
      case 'unmarked_as_duplicate':
        return <MarkedAsDuplicate unmarked event={event} />;
      // case 'added_to_project':
      // case 'moved_columns_in_project':
      // case 'removed_from_project':
      // case 'converted_note_to_issue':
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

class Event extends Component {
  props: {
    icon: Object, // TODO: enforce react instance
    text: Object,
    createdAt: String,
  };

  render() {
    const { icon, text, createdAt } = this.props;

    return (
      <View style={[styles.container, styles.header]}>
        {icon}
        <View style={styles.contentContainer}>
          <View style={styles.eventTextContainer}>
            {text}
          </View>
          <Date date={createdAt} />
        </View>
      </View>
    );
  }
}

class Labeled extends Component {
  props: {
    event: Object,
    unlabeled: boolean,
  };

  render() {
    const { actor, label, created_at: createdAt } = this.props.event;

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

class Assigned extends Component {
  props: {
    event: Object,
    unassigned: boolean,
  };

  render() {
    const { assigner, assignee, created_at: createdAt } = this.props.event;
    const action = this.props.unassigned ? 'unassigned' : 'assigned';

    return (
      <Event
        icon={<EventIcon name="person" />}
        text={
          <Text style={{ padding: 3 }}>
            <ActorLink actor={assigner} /> {action}{' '}
            <ActorLink actor={assignee} />
          </Text>
        }
        createdAt={createdAt}
      />
    );
  }
}

class Milestoned extends Component {
  props: {
    event: Object,
    demilestoned: boolean,
  };

  render() {
    const { actor, milestone, created_at: createdAt } = this.props.event;
    const action = this.props.demilestoned
      ? 'removed this from'
      : 'added this to';

    return (
      <Event
        icon={<EventIcon name="milestone" />}
        text={
          <Text style={{ padding: 3 }}>
            <ActorLink actor={actor} /> {action} the{' '}
            <Bold>{milestone.title}</Bold> milestone
          </Text>
        }
        createdAt={createdAt}
      />
    );
  }
}

class Locked extends Component {
  props: {
    event: Object,
    unlocked: boolean,
  };

  render() {
    const { actor, created_at: createdAt } = this.props.event;
    const { unlocked = false } = this.props;
    const action = unlocked ? 'unlocked' : 'locked';

    return (
      <Event
        icon={
          <EventIcon
            name={unlocked ? 'key' : 'lock'}
            backgroundColor="black"
            iconColor="white"
          />
        }
        text={
          <Text style={{ padding: 3 }}>
            <ActorLink actor={actor} /> {action} this conversation
          </Text>
        }
        createdAt={createdAt}
      />
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
    const { action } = this.props;
    const isRestored = action === 'restored';

    return (
      <Event
        icon={
          <EventIcon
            name="git-branch"
            backgroundColor={isRestored ? undefined : colors.greyBlue}
            iconColor={isRestored ? undefined : colors.white}
          />
        }
        text={
          <Text style={{ padding: 3 }}>
            <ActorLink actor={actor} /> {action} this branch
          </Text>
        }
        createdAt={createdAt}
      />
    );
  }
}

class MarkedAsDuplicate extends Component {
  props: {
    event: Object,
    unmarked: boolean,
  };

  render() {
    // TODO: figure _which_ issue is the duplicate
    const { actor, created_at: createdAt } = this.props.event;

    return (
      <Event
        icon={
          <EventIcon
            name="bookmark"
            backgroundColor={colors.greyBlue}
            iconColor={colors.white}
          />
        }
        text={
          <Text style={{ padding: 3 }}>
            <ActorLink actor={actor} /> marked this as{' '}
            {this.props.unmarked ? 'not ' : ''}a duplicate
          </Text>
        }
        createdAt={createdAt}
      />
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
    case 'bookmark':
      return 6;
    case 'person':
    case 'lock':
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
