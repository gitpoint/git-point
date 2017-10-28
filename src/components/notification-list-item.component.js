/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { colors, fonts, normalize } from 'config';

type Props = {
  notification: Object,
  iconAction: Function,
  navigationAction: Function,
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  wrapper: {
    padding: 10,
    flexDirection: 'row',
  },
  notificationInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.greyLight,
    borderRadius: 17,
    width: 34,
    height: 34,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: colors.black,
    ...fonts.fontPrimary,
    fontSize: normalize(12),
    marginLeft: 10,
  },
  iconContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export class NotificationListItem extends Component {
  props: Props;

  getComponentType = () => {
    const { notification } = this.props;

    return notification.subject.type === 'Commit' ? View : TouchableOpacity;
  };

  getIconName = type => {
    switch (type) {
      case 'commit':
        return 'git-commit';
      case 'pullRequest':
        return 'git-pull-request';
      default:
        return 'issue-opened';
    }
  };

  render() {
    const { notification, iconAction, navigationAction } = this.props;

    const TitleComponent = this.getComponentType();
    const iconName = this.getIconName(notification.subject.type);

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TitleComponent
            nativeId="TitleComponent"
            style={styles.notificationInfo}
            onPress={() => navigationAction(notification)}
          >
            <Icon
              color={colors.grey}
              size={22}
              name={iconName}
              type="octicon"
            />

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{notification.subject.title}</Text>
            </View>
          </TitleComponent>

          {notification.unread && (
            <TouchableOpacity
              nativeId="notification-unread"
              style={styles.iconContainer}
              onPress={() => iconAction(notification.id)}
            >
              <Icon color={colors.grey} size={22} name="check" type="octicon" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
