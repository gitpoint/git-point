/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { colors, styledFonts, normalize } from 'config';

type Props = {
  notification: Object,
  iconAction: Function,
  navigationAction: Function,
};

const NotificationListItemContainer = styled.View`
  border-bottom-color: ${colors.greyLight};
  border-bottom-width: 1;
`;

const Wrapper = styled.View`
  flex-direction: row;
  padding: 10px;
`;

const TitleComponent = styled(({ tag, children, ...props }) =>
  React.createElement(tag, props, children)
)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const TitleContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${colors.black};
  font-family: ${styledFonts.fontPrimary};
  font-size: ${normalize(12)};
  margin-left: 10px;
`;

const CheckButton = styled.TouchableOpacity`
  flex: 0.15;
  align-items: flex-end;
  justify-content: center;
`;

const IconStyled = styled(Icon).attrs({
  color: colors.grey,
  size: 22,
  type: 'octicon',
})``;

export class NotificationListItem extends Component {
  props: Props;

  getComponentType = () => {
    const { notification } = this.props;

    return notification.subject.type === 'Commit' ? View : TouchableOpacity;
  };

  getIconName = type => {
    switch (type) {
      case 'Commit':
        return 'git-commit';
      case 'PullRequest':
        return 'git-pull-request';
      default:
        return 'issue-opened';
    }
  };

  getTitleComponentProps = () => {
    const { notification, navigationAction } = this.props;

    return notification.subject.type === 'Commit'
      ? {}
      : {
          onPress: () => navigationAction(notification),
          nativeId: 'TitleComponent',
        };
  };

  render() {
    const { notification, iconAction } = this.props;
    const tag = this.getComponentType();
    const iconName = this.getIconName(notification.subject.type);
    const titleComponentProps = this.getTitleComponentProps();

    return (
      <NotificationListItemContainer>
        <Wrapper>
          <TitleComponent tag={tag} {...titleComponentProps}>
            <IconStyled name={iconName} />
            <TitleContainer>
              <Title>{notification.subject.title}</Title>
            </TitleContainer>
          </TitleComponent>

          {notification.unread && (
            <CheckButton
              onPress={() => iconAction(notification.id)}
              nativeId="notification-unread"
            >
              <IconStyled name="check" />
            </CheckButton>
          )}
        </Wrapper>
      </NotificationListItemContainer>
    );
  }
}
