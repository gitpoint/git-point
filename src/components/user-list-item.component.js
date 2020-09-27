import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import styled, { css } from 'styled-components';

import { colors, fonts, normalize } from 'config';

const ViewBorderContainer = styled.View`
  ${props =>
    props.hasBorderBottom &&
    css`
      border-bottom-color: ${colors.greyLight};
      border-bottom-width: 1;
    `};
`;
const TouchableBorderContainer = ViewBorderContainer.withComponent(
  TouchableHighlight
);

const Wrapper = styled.View`
  padding: 10px;
  flex-direction: row;
`;

const TouchableUserInfo = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
const ViewUserInfo = TouchableUserInfo.withComponent(View);

const TouchableAvatarContainer = styled.TouchableOpacity`
  background-color: ${colors.greyLight};
  border-radius: 17;
  width: 34;
  height: 34;
`;
const ViewAvatarContainer = TouchableAvatarContainer.withComponent(View);

const Avatar = styled.Image`
  border-radius: 17;
  width: 34;
  height: 34;
`;

const TitleSubtitleContainer = styled.View`
  justify-content: center;
  flex: 1;
`;

const Title = styled.Text`
  color: ${colors.black};
  ${fonts.fontPrimary};
  font-size: ${normalize(14)};
  margin-left: 10;
  ${props => props.titleStyle};
`;

const Subtitle = styled.Text`
  color: ${colors.greyDark};
  font-size: ${normalize(10)};
  margin-top: 1;
  ${fonts.fontPrimarySemiBold};
  margin-left: 10;
`;

const TouchableIconContainer = styled.TouchableOpacity`
  flex: 0.15;
  align-items: flex-end;
  justify-content: center;
`;
const ViewIconContainer = TouchableIconContainer.withComponent(View);

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
      iconAction || onlyImageNavigate
        ? ViewBorderContainer
        : TouchableBorderContainer;
    const UserComponent =
      iconAction && !onlyImageNavigate ? TouchableUserInfo : ViewUserInfo;
    const ImageContainerComponent = onlyImageNavigate
      ? TouchableAvatarContainer
      : ViewAvatarContainer;
    const IconComponent = iconAction
      ? TouchableIconContainer
      : ViewIconContainer;

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
        hasBorderBottom={!noBorderBottom}
      >
        <Wrapper>
          <UserComponent
            data-testid="userListItem-user"
            onPress={() =>
              navigation.navigate(userScreen, {
                user,
              })
            }
          >
            <ImageContainerComponent
              data-testid="userListItem-imageContainer"
              onPress={() =>
                navigation.navigate(userScreen, {
                  user,
                })
              }
            >
              <Avatar
                data-testid="userListItem-image"
                source={{
                  uri: user.avatar_url,
                }}
              />
            </ImageContainerComponent>

            <TitleSubtitleContainer>
              <Title titleStyle={titleStyle}>{title || user.login}</Title>

              {subtitle && <Subtitle>{subtitle}</Subtitle>}
            </TitleSubtitleContainer>
          </UserComponent>

          <IconComponent
            data-testid="userListItem-icon"
            onPress={() => iconAction(user.login)}
          >
            <Icon
              color={colors.grey}
              size={icon ? 24 : 28}
              name={icon || 'chevron-right'}
              type={icon && 'octicon'}
            />
          </IconComponent>
        </Wrapper>
      </ContainerComponent>
    );
  }
}

export const UserListItem = connect(mapStateToProps)(UserListItemComponent);
