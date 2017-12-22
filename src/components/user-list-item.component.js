import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { colors, fonts, normalize } from 'config';

const styles = StyleSheet.create({
  borderContainer: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  wrapper: {
    padding: 10,
    flexDirection: 'row',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: colors.greyLight,
    borderRadius: 17,
    width: 34,
    height: 34,
  },
  avatar: {
    borderRadius: 17,
    width: 34,
    height: 34,
  },
  titleSubtitleContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: colors.black,
    ...fonts.fontPrimary,
    fontSize: normalize(14),
    marginLeft: 10,
  },
  subtitle: {
    color: colors.greyDark,
    fontSize: normalize(10),
    marginTop: 1,
    ...fonts.fontPrimarySemiBold,
    marginLeft: 10,
  },
  iconContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

class UserListItemComponent extends Component {
  props: {
    user: Object,
    title: any,
    subtitle: string,
    onlyImageNavigate: boolean,
    titleStyle: Object,
    navigation: Object,
    icon: string,
    iconAction: Function,
    noBorderBottom: boolean,
    authUser: Object,
  };

  render() {
    const {
      user,
      title,
      subtitle,
      titleStyle,
      onlyImageNavigate,
      navigation,
      icon,
      noBorderBottom,
      iconAction,
      authUser,
    } = this.props;

    const ContainerComponent =
      iconAction || onlyImageNavigate ? View : TouchableHighlight;
    const UserComponent =
      iconAction && !onlyImageNavigate ? TouchableOpacity : View;
    const ImageContainerComponent = onlyImageNavigate ? TouchableOpacity : View;
    const IconComponent = iconAction ? TouchableOpacity : View;

    const userScreen =
      authUser.login === user.login ? 'AuthProfile' : 'Profile';

    return (
      <ContainerComponent
        onPress={() =>
          navigation.navigate(
            user.type === 'User' ? userScreen : 'Organization',
            user.type === 'User' ? { user } : { organization: user }
          )
        }
        underlayColor={colors.greyLight}
        style={!noBorderBottom && styles.borderContainer}
      >
        <View style={styles.wrapper}>
          <UserComponent
            style={styles.userInfo}
            onPress={() =>
              navigation.navigate(userScreen, {
                user,
              })
            }
          >
            <ImageContainerComponent
              style={styles.avatarContainer}
              onPress={() =>
                navigation.navigate(userScreen, {
                  user,
                })
              }
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: user.avatar_url,
                }}
              />
            </ImageContainerComponent>

            <View style={styles.titleSubtitleContainer}>
              <Text style={[styles.title, titleStyle && titleStyle]}>
                {title || user.login}
              </Text>

              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          </UserComponent>

          <IconComponent
            style={styles.iconContainer}
            onPress={() => iconAction(user.login)}
          >
            <Icon
              color={colors.grey}
              size={icon ? 24 : 28}
              name={icon || 'chevron-right'}
              type={icon && 'octicon'}
            />
          </IconComponent>
        </View>
      </ContainerComponent>
    );
  }
}

export const UserListItem = connect(mapStateToProps)(UserListItemComponent);
