/* eslint-disable no-prototype-builtins */
import React, { Component } from 'react';
import { colors, fonts, normalize } from 'config';
import { translate } from 'utils';
import { ImageZoom } from 'components';
import styled, { css } from 'styled-components';

type Props = {
  type: string,
  initialUser: Object,
  user: Object,
  starCount: string,
  isFollowing: boolean,
  isFollower: boolean,
  locale: string,
  navigation: Object,
};

const Container = styled.View`
  flex: 1;
`;
const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Profile = styled.View`
  flex: 3;
  align-items: center;
  justify-content: flex-end;
`;
const StyledImageZoom = styled(ImageZoom)`
  width: 75;
  height: 75;
  margin-bottom: 20;
  border-radius: 37.5;
  ${props =>
    props.isUser &&
    css`
      border-color: ${colors.white};
      border-width: 2;
    `};
`;
const Title = styled.Text`
  color: ${colors.white};
  ${fonts.fontPrimaryBold};
  font-size: ${normalize(16)};
  margin-bottom: 2;
`;
const SubTitle = styled.Text`
  color: ${colors.white};
  ${fonts.fontPrimary};
  font-size: ${normalize(12)};
  margin-bottom: 50;
  padding-left: 15;
  padding-right: 15;
  text-align: center;
`;
const Details = styled.View`
  flex: 1;
  flex-direction: row;
`;
const Unit = styled.TouchableOpacity`
  flex: 1;
`;
const UnitNumber = styled.Text`
  text-align: center;
  color: ${colors.white};
  ${fonts.fontPrimaryBold};
  font-size: ${normalize(16)};
`;
const UnitText = styled.Text`
  text-align: center;
  color: ${colors.white};
  font-size: ${normalize(10)};
  ${fonts.fontPrimary};
`;
const UnitStatus = styled.Text`
  text-align: center;
  color: ${colors.lighterBoldGreen};
  font-size: ${normalize(8)};
  ${fonts.fontPrimary};
  padding-top: 3;
  padding-bottom: 3;
  margin-top: 5;
  margin-left: 17;
  margin-right: 17;
  border-width: 0.5;
  border-radius: 5;
  border-color: ${colors.lighterBoldGreen};
  justify-content: center;
`;

const maxLoadingConstraints = {
  maxFollowers: 15,
  maxFollowing: 15,
  maxPublicRepos: 15,
  maxStars: 15,
};

export class UserProfile extends Component {
  props: Props;

  getUserUri = () => {
    const { initialUser, user } = this.props;
    const image = initialUser.avatar_url
      ? `${initialUser.avatar_url}&lastModified=${initialUser.updated_at}`
      : `${user.avatar_url}&lastModified=${user.updated_at}`;

    return { uri: image };
  };

  render() {
    const {
      type,
      initialUser,
      user,
      starCount,
      isFollowing,
      isFollower,
      locale,
      navigation,
    } = this.props;

    return (
      <Container>
        {((user.hasOwnProperty('public_repos') &&
          !isNaN(parseInt(starCount, 10))) ||
          type === 'org') && (
          <Wrapper nativeId="user-profile-container">
            <Profile>
              <StyledImageZoom
                uri={this.getUserUri()}
                isUser={initialUser.type === 'User' || user.type === 'User'}
              />
              <Title>{user.name || ' '}</Title>
              <SubTitle>{initialUser.login || ' '}</SubTitle>
            </Profile>
            <Details>
              <Unit
                nativeId="touchable-repository-list"
                onPress={() =>
                  navigation.navigate('RepositoryList', {
                    title: translate('user.repositoryList.title', locale),
                    user,
                    repoCount: Math.min(
                      maxLoadingConstraints.maxPublicRepos,
                      user.public_repos
                    ),
                  })
                }
              >
                <UnitNumber>
                  {!isNaN(parseInt(user.public_repos, 10))
                    ? user.public_repos + (user.total_private_repos || 0)
                    : ' '}
                </UnitNumber>
                <UnitText>{translate('common.repositories', locale)}</UnitText>
              </Unit>

              {type !== 'org' && (
                <Unit
                  nativeId="touchable-star-count-list"
                  onPress={() =>
                    navigation.navigate('StarredRepositoryList', {
                      title: translate(
                        'user.starredRepositoryList.title',
                        locale
                      ),
                      user,
                      repoCount: Math.min(
                        maxLoadingConstraints.maxStars,
                        starCount
                      ),
                    })
                  }
                >
                  <UnitNumber>
                    {!isNaN(parseInt(starCount, 10)) ? starCount : ' '}
                  </UnitNumber>
                  <UnitText>
                    {translate('user.starredRepositoryList.text', locale)}
                  </UnitText>
                </Unit>
              )}

              {type !== 'org' && (
                <Unit
                  nativeId="touchable-followers-list"
                  onPress={() =>
                    navigation.navigate('FollowerList', {
                      title: translate('user.followers.title', locale),
                      user,
                      followerCount: Math.min(
                        maxLoadingConstraints.maxFollowers,
                        user.followers
                      ),
                    })
                  }
                >
                  <UnitNumber>
                    {!isNaN(parseInt(user.followers, 10))
                      ? user.followers
                      : ' '}
                  </UnitNumber>
                  <UnitText>
                    {translate('user.followers.text', locale)}
                  </UnitText>
                  {isFollowing && (
                    <UnitStatus>
                      {translate('user.following.followingYou', locale)}
                    </UnitStatus>
                  )}
                </Unit>
              )}

              {type !== 'org' && (
                <Unit
                  nativeId="touchable-following-list"
                  onPress={() =>
                    navigation.navigate('FollowingList', {
                      title: translate('user.following.title', locale),
                      user,
                      followingCount: Math.min(
                        maxLoadingConstraints.maxFollowing,
                        user.following
                      ),
                    })
                  }
                >
                  <UnitNumber>
                    {!isNaN(parseInt(user.following, 10))
                      ? user.following
                      : ' '}
                  </UnitNumber>
                  <UnitText>
                    {translate('user.following.text', locale)}
                  </UnitText>
                  {isFollower && (
                    <UnitStatus>
                      {translate('user.followers.followsYou')}
                    </UnitStatus>
                  )}
                </Unit>
              )}
            </Details>
          </Wrapper>
        )}
      </Container>
    );
  }
}
