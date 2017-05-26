import React, { PropTypes } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";

import colors from "../config/colors";

const NotificationListItem = ({
  notification,
  iconAction,
  navigationAction
}) => {
  const TitleComponent = notification.subject.type === "Commit"
    ? View
    : TouchableOpacity;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TitleComponent
          style={styles.notificationInfo}
          onPress={() => navigationAction(notification)}
        >
          <Icon
            color={colors.grey}
            size={22}
            name={
              notification.subject.type === "Commit"
                ? "git-commit"
                : notification.subject.type === "PullRequest"
                    ? "git-pull-request"
                    : "issue-opened"
            }
            type="octicon"
          />

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{notification.subject.title}</Text>
          </View>
        </TitleComponent>

        {notification.unread &&
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => iconAction(notification.id)}
          >
            <Icon color={colors.grey} size={22} name="check" type="octicon" />
          </TouchableOpacity>}
      </View>
    </View>
  );
};

NotificationListItem.propTypes = {
  notification: PropTypes.object,
  iconAction: PropTypes.func,
  navigationAction: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1
  },
  wrapper: {
    padding: 10,
    flexDirection: "row"
  },
  notificationInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    backgroundColor: colors.greyLight,
    borderRadius: 17,
    width: 34,
    height: 34
  },
  titleContainer: {
    flex: 1
  },
  title: {
    color: colors.black,
    fontFamily: "AvenirNext-Medium",
    fontSize: 14,
    marginLeft: 10
  },
  iconContainer: {
    flex: 0.15,
    alignItems: "flex-end",
    justifyContent: "center"
  }
});

export default NotificationListItem;
