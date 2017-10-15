// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { Badge } from 'components';
import { colors } from 'config';
import { getCountFromState } from 'utils';

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: -1,
    top: -1,
  },
});

const mapStateToProps = state => ({
  notificationsCount: getCountFromState(
    state,
    'COUNT_ACTIVITY_GET_NOTIFICATIONS',
    'false-false'
  ),
});

class NotificationIconComponent extends Component {
  props: {
    iconColor: string,
    notificationsCount: number,
  };

  render() {
    const { iconColor, notificationsCount } = this.props;

    return (
      <View>
        <Icon color={iconColor} name="notifications" size={33} />

        {!!notificationsCount &&
          <View style={styles.badgeContainer}>
            <Badge
              color={colors.white}
              backgroundColor={colors.darkerRed}
              text={notificationsCount > 99 ? '99+' : notificationsCount}
              largeText={notificationsCount <= 99}
            />
          </View>}
      </View>
    );
  }
}

export const NotificationIcon = connect(mapStateToProps)(
  NotificationIconComponent
);
