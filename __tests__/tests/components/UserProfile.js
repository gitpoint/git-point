import React from 'react';
import { shallow } from 'enzyme';

import { UserProfile } from 'components';

const defaultProps = {
  type: 'type',
  initialUser: {},
  user: {},
  starCount: '12',
  isFollowing: false,
  isFollower: false,
  locale: 'en',
  navigation: {},
};

describe('<UserProfile />', () => {
  it.skip('should render user profile if user has public repos and has starred repos', () => {});

  it.skip('should call navigation when user press TouchableOpacity component', () => {});

  it.skip('should render followers if user is not an organization', () => {});

  it.skip('should render following if user is not an organization', () => {});

  it.skip('should render how many people follow an user if user is not an organization', () => {});

  it.skip('should navigate to followingList', () => {});

  it.skip('should navigate to followers list', () => {});
});
