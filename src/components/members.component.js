import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { colors, fonts } from 'config';

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

type Props = {
  title: string,
  members: Array,
  noMembersMessage: string,
  containerStyle: Object,
  smallTitle: string,
  navigation: Object,
  authUser: Object,
};

const avatarSize = 30;

const Container = styled.View`
  margin-top: 30;
  ${props => props.containerStyle};
`;

const AvatarContainer = styled.TouchableHighlight`
  background-color: ${colors.greyLight};
  border-radius: ${avatarSize / 2};
  width: ${avatarSize};
  height: ${avatarSize};
  ${props => props.style};
`;

const Avatar = styled.Image`
  border-radius: ${avatarSize / 2};
  height: ${avatarSize};
  width: ${avatarSize};
`;

type StyledListProps = {
  style: Object,
  children: Element,
};

const StyledList = ({ style, children }: StyledListProps) => (
  <List containerStyle={style}>{children}</List>
);

const NoMembersList = styled(StyledList)`
  margin-top: 0;
`;

const SectionTitle = styled.Text`
  color: ${props => (props.isTitleSmall ? colors.primaryDark : colors.black)};
  ${props =>
    props.isTitleSmall ? fonts.fontPrimarySemiBold : fonts.fontPrimaryBold};
  margin-bottom: 10;
  padding-left: 15;
`;

type StyledFlatListProps = {
  style: Object,
  data: Array,
  renderItem: Function,
  keyExtractor: Number,
};

const StyledFlatList = ({
  style,
  data,
  renderItem,
  keyExtractor,
}: StyledFlatListProps) => (
  <FlatList
    contentContainerStyle={style}
    data={data}
    showsHorizontalScrollIndicator={false}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
    horizontal
  />
);

const MembersFlatList = styled(StyledFlatList)`
  padding-left: 15;
  padding-right: 15;
`;

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
  ${props => props.gradientPosition};
`;

const MembersListComponent = ({
  title,
  members,
  noMembersMessage,
  containerStyle,
  smallTitle,
  navigation,
  authUser,
}: Props) => (
  <Container style={containerStyle}>
    <SectionTitle isTitleSmall={smallTitle}>{title}</SectionTitle>

    {noMembersMessage &&
      !members.length && (
        <NoMembersList>
          <ListItem title={noMembersMessage} hideChevron />
        </NoMembersList>
      )}
    <View>
      <MembersFlatList
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
            underlayColor="transparent"
            style={{ marginRight: index < members.length - 1 ? 5 : 0 }}
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
        gradientPosition={{ left: 0 }}
        gradientColors={['white', 'rgba(255, 255, 255, 0)']}
      />

      <ScrollGradient
        gradientPosition={{ right: 0 }}
        gradientColors={['rgba(255, 255, 255, 0)', 'white']}
      />
    </View>
  </Container>
);

export const MembersList = connect(mapStateToProps)(MembersListComponent);
