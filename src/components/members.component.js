import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import { colors, fonts } from 'config';

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

type Props = {
  title: string,
  members: Array,
  noMargin: boolean,
  noMembersMessage: string,
  smallTitle: string,
  navigation: Object,
  authUser: Object,
};

const avatarSize = 30;

const Container = styled.View`
  margin-top: ${props => (props.noMargin ? 0 : 30)};
  ${props =>
    props.noMargin
      ? {
          paddingTop: 0,
          paddingLeft: 0,
        }
      : null};
`;

const AvatarContainer = styled.TouchableHighlight.attrs({
  underlayColor: 'transparent',
  onPress: props => props.onPress,
})`
  background-color: ${colors.greyLight};
  border-radius: ${avatarSize / 2};
  width: ${avatarSize};
  height: ${avatarSize};
  margin-right: ${props => (props.addMarginRight ? 5 : 0)};
`;

const Avatar = styled.Image`
  border-radius: ${avatarSize / 2};
  height: ${avatarSize};
  width: ${avatarSize};
`;

const NoMembersList = styled(List).attrs({
  containerStyle: {
    marginTop: 0,
  },
})``;

const SectionTitle = styled.Text`
  color: ${props => (props.isTitleSmall ? colors.primaryDark : colors.black)};
  ${props =>
    props.isTitleSmall ? fonts.fontPrimarySemiBold : fonts.fontPrimaryBold};
  margin-bottom: 10;
  padding-left: 15;
`;

const MembersFlatList = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  data: props => props.data,
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})``;

type GradientProps = {
  style: Object,
  gradientColors: Array,
};

const Gradient = ({ style, gradientColors }: GradientProps) => (
  <LinearGradient
    style={style}
    colors={gradientColors}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}
  />
);

const ScrollGradient = styled(Gradient)`
  position: absolute;
  width: 15;
  height: ${avatarSize};
  ${props => props.position};
`;

const MembersListComponent = ({
  title,
  members,
  noMembersMessage,
  noMargin,
  smallTitle,
  navigation,
  authUser,
  ...other
}: Props) => (
  <Container noMargin={noMargin}>
    <SectionTitle isTitleSmall={smallTitle}>{title}</SectionTitle>

    {noMembersMessage &&
      !members.length && (
        <NoMembersList>
          <ListItem title={noMembersMessage} hideChevron />
        </NoMembersList>
      )}
    <View>
      <MembersFlatList
        {...other}
        data={members}
        renderItem={({ item, index }) => (
          <AvatarContainer
            onPress={() => {
              navigation.navigate(
                authUser.login === item.login ? 'AuthProfile' : 'Profile',
                {
                  user: item,
                }
              );
            }}
            addMarginRight={index < members.length - 1}
          >
            <Avatar
              source={{
                uri: item.avatar_url,
              }}
            />
          </AvatarContainer>
        )}
        keyExtractor={item => item.id}
      />

      <ScrollGradient
        position={{ left: 0 }}
        gradientColors={['white', 'rgba(255, 255, 255, 0)']}
      />

      <ScrollGradient
        position={{ right: 0 }}
        gradientColors={['rgba(255, 255, 255, 0)', 'white']}
      />
    </View>
  </Container>
);

export const MembersList = connect(mapStateToProps)(MembersListComponent);
