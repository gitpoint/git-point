import React, { Component } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment/min/moment-with-locales.min';
import { colors, styledFonts, normalize } from 'config';
import { InlineLabel } from 'components';
import styled from 'styled-components/native';

const Header = styled.View`
  padding-right: 10;
  padding-top: 10;
  background-color: transparent;
  flex-direction: row;
  align-items: stretch;
`;

const IconStyled = styled(Icon)`
  background-color: ${colors.greyLight};
  border-radius: 13;
  width: 26;
  height: 26;
  margin-left: 14;
  margin-right: 14;
  flex: 0 0 26px;
`;

const ContentContainer = styled.View`
  flex-direction: row;
  flex: 1 1;
  border-bottom-color: ${colors.greyLight};
  border-bottom-width: 1;
`;

const EventTextContainer = styled.View`
  padding-bottom: 10;
  flex-flow: row wrap;
  flex: 1 1;
  align-items: center;
`;

const DateContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  align-self: flex-start;
  margin-top: 2;
  flex: 0 0 39px;
  width: 39;
`;

const BoldText = styled.Text`
  font-family: ${styledFonts.fontPrimaryBold};
  font-size: ${normalize(13)};
  color: ${colors.primaryDark};
`;

const DateText = styled.Text`
  color: ${colors.greyDark};
`;

export class IssueEventListItem extends Component {
  props: {
    event: Object,
    navigation: Object,
  };

  onPressUser = user => {
    this.props.navigation.navigate('Profile', { user });
  };

  render() {
    const { event } = this.props;

    switch (event.event) {
      case 'review_requested':
        return (
          <Event
            iconName="eye"
            text={
              <Text>
                <ActorLink
                  actor={event.review_requester}
                  onPress={this.onPressUser}
                />{' '}
                requested review from{' '}
                <ActorLink
                  actor={event.requested_reviewer}
                  onPress={this.onPressUser}
                />
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      case 'labeled':
      case 'unlabeled':
        return (
          <Event
            iconName="tag"
            text={
              <EventTextContainer>
                <ActorLink actor={event.actor} onPress={this.onPressUser} />
                <Text>
                  {' '}
                  {event.event === 'unlabeled' ? 'removed' : 'added'}{' '}
                </Text>
                <InlineLabel label={event.label} />
              </EventTextContainer>
            }
            createdAt={event.created_at}
          />
        );
      case 'label-group':
        return <LabelGroup group={event} onPressUser={this.onPressUser} />;
      case 'closed':
        return (
          <Event
            iconName="circle-slash"
            iconColor={colors.white}
            iconBackgroundColor={colors.darkerRed}
            text={
              <Text>
                <ActorLink
                  actor={event.actor}
                  onPress={this.onPressUser}
                />{' '}
                closed this
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      case 'reopened':
        return (
          <Event
            iconName="primitive-dot"
            iconBackgroundColor={colors.green}
            iconColor={colors.white}
            text={
              <Text>
                <ActorLink
                  actor={event.actor}
                  onPress={this.onPressUser}
                />{' '}
                reopened this
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      case 'merged':
        return (
          <Event
            iconName="git-merge"
            iconColor={colors.white}
            iconBackgroundColor={colors.purple}
            text={
              <Text>
                <ActorLink
                  actor={event.actor}
                  onPress={this.onPressUser}
                />{' '}
                merged <Bold>{event.commit_id.slice(0, 7)}</Bold>
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      // case 'referenced':
      case 'renamed':
        return (
          <Event
            iconName="pencil"
            text={
              <Text>
                <ActorLink
                  actor={event.actor}
                  onPress={this.onPressUser}
                />{' '}
                changed the title from <Bold>{event.rename.from.trim()}</Bold>{' '}
                to <Bold>{event.rename.to.trim()}</Bold>
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      case 'assigned':
      case 'unassigned':
        return (
          <Event
            iconName="person"
            text={
              <Text>
                <ActorLink
                  actor={event.assigner}
                  onPress={this.onPressUser}
                />{' '}
                {event.event}{' '}
                <ActorLink actor={event.assignee} onPress={this.onPressUser} />
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      // case 'review_dismissed':
      // case 'review_request_removed':
      case 'milestoned':
      case 'demilestoned': {
        const milestoneAction =
          event.event === 'demilestoned'
            ? 'removed this from'
            : 'added this to';

        return (
          <Event
            iconName="milestone"
            text={
              <Text>
                <ActorLink
                  actor={event.actor}
                  onPress={this.onPressUser}
                />{' '}
                {milestoneAction} the <Bold>{event.milestone.title}</Bold>{' '}
                milestone
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      }
      case 'locked':
      case 'unlocked':
        return (
          <Event
            iconName={event.event === 'unlocked' ? 'key' : 'lock'}
            iconColor="white"
            iconBackgroundColor="black"
            text={
              <Text>
                <ActorLink
                  actor={event.actor}
                  onPress={this.onPressUser}
                />{' '}
                {event.event} this conversation
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      case 'head_ref_deleted':
      case 'head_ref_restored': {
        const isRestored = event.event === 'head_ref_restored';
        const headRefAction = isRestored ? 'restored' : 'deleted';

        return (
          <Event
            iconName="git-branch"
            iconColor={isRestored ? undefined : colors.white}
            iconBackgroundColor={isRestored ? undefined : colors.greyBlue}
            text={
              <Text>
                <ActorLink
                  actor={event.actor}
                  onPress={this.onPressUser}
                />{' '}
                {headRefAction} this branch
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      }
      case 'marked_as_duplicate':
      case 'unmarked_as_duplicate':
        return (
          <Event
            iconName="bookmark"
            iconColor={colors.white}
            iconBackgroundColor={colors.greyBlue}
            text={
              <Text>
                <ActorLink
                  actor={event.actor}
                  onPress={this.onPressUser}
                />{' '}
                marked this as{' '}
                {event.event === 'unmarked_as_duplicate' ? 'not ' : ''}a
                duplicate
              </Text>
            }
            createdAt={event.created_at}
          />
        );
      // case 'added_to_project':
      // case 'moved_columns_in_project':
      // case 'removed_from_project':
      // case 'converted_note_to_issue':
      default:
        return null;
    }
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

class Event extends Component {
  props: {
    iconName: String,
    iconColor: String,
    iconBackgroundColor: String,
    text: React.Element<*>,
    createdAt: String,
  };

  render() {
    const {
      text,
      createdAt,
      iconName,
      iconColor = '#586069',
      iconBackgroundColor = '#E6EBF1',
    } = this.props;

    return (
      <Header>
        <IconStyled
          iconStyle={{
            marginLeft: marginLeftForIconName(iconName),
            marginTop: 1,
            color: iconColor,
          }}
          containerStyle={[{ backgroundColor: iconBackgroundColor }]}
          name={iconName}
          type="octicon"
          size={16}
        />
        <ContentContainer>
          <EventTextContainer>{text}</EventTextContainer>
          <DateContainer>
            <DateText>{moment(createdAt).fromNow()}</DateText>
          </DateContainer>
        </ContentContainer>
      </Header>
    );
  }
}

class LabelGroup extends Component {
  props: {
    group: Object,
    onPressUser: Function,
  };

  render() {
    const {
      actor,
      labeled,
      unlabeled,
      created_at: createdAt,
    } = this.props.group;

    const toInlineLabel = (type, { label }, index) => (
      <InlineLabel key={type + index} label={label} />
    );

    /* eslint-disable react/jsx-no-bind */
    const labels = labeled.map(toInlineLabel.bind(null, 'added'));
    const unlabels = unlabeled.map(toInlineLabel.bind(null, 'removed'));

    let textChildren = [
      <ActorLink key="actor" actor={actor} onPress={this.props.onPressUser} />,
    ];

    if (labels.length) {
      textChildren = [
        ...textChildren,
        <Text key="added"> added </Text>,
        ...labels,
      ];
    }

    if (labels.length && unlabels.length) {
      textChildren.push(<Text key="and"> and</Text>);
    }

    if (unlabels.length) {
      textChildren = [
        ...textChildren,
        <Text key="removed"> removed </Text>,
        ...unlabels,
      ];
    }

    return <Event iconName="tag" text={textChildren} createdAt={createdAt} />;
  }
}

class ActorLink extends Component {
  props: {
    actor: Object,
    onPress: Function,
  };

  render() {
    const { actor, onPress } = this.props;

    return (
      <BoldText
        onPress={() => {
          onPress(actor);
        }}
      >
        {actor.login}
      </BoldText>
    );
  }
}

class Bold extends Component {
  props: {
    children: Object | String,
  };

  render() {
    return <BoldText>{this.props.children}</BoldText>;
  }
}
