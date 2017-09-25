// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { colors, fonts } from 'config';

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: colors.redDarkest,
    borderRadius: 18,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    alignSelf: 'center',
    fontSize: 9,
    ...fonts.fontPrimary,
    color: colors.white,
    backgroundColor: 'transparent',
  },
});

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

        {notificationsCount
          ? <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notificationsCount > 99 ? '99+' : notificationsCount}
              </Text>
            </View>
          : null}
      </View>
    );
  }
}

export const NotificationIcon = connect(mapStateToProps)(
  NotificationIconComponent
);
