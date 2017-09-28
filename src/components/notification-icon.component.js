// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Badge } from 'components';

const mapStateToProps = state => ({
  notificationsCount: state.notifications.notificationsCount,
});

class NotificationIconComponent extends Component {
  props: {
    iconColor: string,
    notificationsCount: string,
  };

  render() {
    const { iconColor, notificationsCount } = this.props;

    return (
      <View>
        <Icon
          containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          color={iconColor}
          name="notifications"
          size={33}
        />

        {!!notificationsCount &&
          <Badge text={notificationsCount > 99 ? '99+' : notificationsCount} />}
      </View>
    );
  }
}

export const NotificationIcon = connect(mapStateToProps)(
  NotificationIconComponent
);
