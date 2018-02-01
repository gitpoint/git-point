// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import styled from 'styled-components';

import { Icon } from 'react-native-elements';

import { Badge } from 'components';

import { colors } from 'config';

const BadgeContainer = styled.View`
  position: absolute;
  right: -1;
  top: -1;
`;

const mapStateToProps = state => ({
  notificationsCount: state.notifications.notificationsCount,
});

export class NotificationIconComponent extends Component {
  props: {
    iconColor: string,
    notificationsCount: number,
  };

  render() {
    const { iconColor, notificationsCount } = this.props;

    return (
      <View>
        <Icon color={iconColor} name="notifications" size={33} />

        {!!notificationsCount && (
          <BadgeContainer>
            <Badge
              color={colors.white}
              backgroundColor={colors.darkerRed}
              text={notificationsCount > 99 ? '99+' : notificationsCount}
              largeText={notificationsCount <= 99}
            />
          </BadgeContainer>
        )}
      </View>
    );
  }
}

export const NotificationIcon = connect(mapStateToProps)(
  NotificationIconComponent
);
