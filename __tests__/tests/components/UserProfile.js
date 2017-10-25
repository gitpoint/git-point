import React from 'react';
import { shallow } from 'enzyme';

import { UserProfile } from 'components';

const defaultProps = {
  type: 'org',
  initialUser: {
    avatar_url: {},
    updated_at: '12/12/12',
  },
  user: {
    public_repos: 15,
    updated_at: '12/12/12',
    repositoryList: {
      title: 'repo title',
    },
    followers: 15,
    following: 15,
  },
  starCount: '12',
  isFollowing: false,
  isFollower: false,
  locale: 'en',
  navigation: {},
};

describe('<UserProfile />', () => {
  it('should render user profile if user has public repos and has starred repos', () => {
    const wrapper = shallow(<UserProfile {...defaultProps} />);

    const container = wrapper.find({ nativeId: 'user-profile-container' });

    expect(container.length).toBeTruthy();
  });

  it('should return an uri based on initialUser data if initialUser has the property avatar_url', () => {
    const initialUser = {
      avatar_url: 'foo.jpg',
      updated_at: '01/01/01',
    };
    const wrapper = shallow(
      <UserProfile {...defaultProps} initialUser={initialUser} />
    );

    const result = wrapper.instance().getUserUri();
    const expectedResult = {
      uri: `${initialUser.avatar_url}&lastModified=${initialUser.updated_at}`,
    };

    expect(result).toEqual(expectedResult);
  });

  it("should return an uri based on user data if initialUser doesn't have the property avatar_url", () => {
    const initialUser = {
      updated_at: '01/01/01',
    };
    const user = {
      avatar_url: 'foo.jpg',
      updated_at: '01/01/01',
    };
    const wrapper = shallow(
      <UserProfile {...defaultProps} initialUser={initialUser} user={user} />
    );

    const result = wrapper.instance().getUserUri();
    const expectedResult = {
      uri: `${user.avatar_url}&lastModified=${user.updated_at}`,
    };

    expect(result).toEqual(expectedResult);
  });

  it('should call navigation when user press Repository List TouchableOpacity component', () => {
    const navigationMock = jest.fn();
    const navigation = {
      navigate: navigationMock,
    };
    const wrapper = shallow(
      <UserProfile {...defaultProps} navigation={navigation} />
    );
    const expectedSecondArgument = {
      repoCount: 15,
      title: 'Repositories',
      user: {
        ...defaultProps.user,
      },
    };

    wrapper.find({ nativeId: 'touchable-repository-list' }).simulate('press');

    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith(
      'RepositoryList',
      expectedSecondArgument
    );
  });

  it('should call navigation when user press Start Count List TouchableOpacity component', () => {
    const navigationMock = jest.fn();
    const navigation = {
      navigate: navigationMock,
    };
    const wrapper = shallow(
      <UserProfile {...defaultProps} navigation={navigation} type="foo" />
    );
    const expectedSecondArgument = {
      followerCount: 15,
      title: 'Followers',
      user: defaultProps.user,
    };

    wrapper.find({ nativeId: 'touchable-followers-list' }).simulate('press');

    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith(
      'FollowerList',
      expectedSecondArgument
    );
  });

  it('should call navigation when user press Following List TouchableOpacity component', () => {
    const navigationMock = jest.fn();
    const navigation = {
      navigate: navigationMock,
    };
    const wrapper = shallow(
      <UserProfile {...defaultProps} navigation={navigation} type="foo" />
    );
    const expectedSecondArgument = {
      followingCount: 15,
      title: 'Following',
      user: defaultProps.user,
    };

    wrapper.find({ nativeId: 'touchable-following-list' }).simulate('press');

    expect(navigationMock).toHaveBeenCalledTimes(1);
    expect(navigationMock).toHaveBeenCalledWith(
      'FollowingList',
      expectedSecondArgument
    );
  });
});
