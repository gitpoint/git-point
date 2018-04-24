import React from 'react';
import { shallow } from 'enzyme';
import { Icon } from 'react-native-elements';

import { RepositoryProfile } from 'components';

const defaultProps = {
  repository: {
    isFork: true,
    parent: {
      nameWithOwner: 'foo/bar',
    },
    primaryLanguage: {
      name: 'JavaScript',
      color: '#FFCC00',
    },
    viewerHasStarred: false,
    viewerSubscription: 'UNSUBSCRIBED',
  },
  navigation: {
    navigate() {},
  },
  loading: false,
  locale: 'en',
};

describe('<RepositoryProfile />', () => {
  it('should render the Icon component if loading is false and repository language is not null', () => {
    const wrapper = shallow(<RepositoryProfile {...defaultProps} />);
    const icon = wrapper.find({ name: 'fiber-manual-record' });

    expect(icon.length).toBeTruthy();
  });

  it('should not render the Icon component if loading is true', () => {
    const wrapper = shallow(
      <RepositoryProfile {...defaultProps} loading={true} />
    );
    const icon = wrapper.find({ name: 'fiber-manual-record' });

    expect(icon.length).toBeFalsy();
  });

  it('should not render the Icon component if repository language is null', () => {
    const wrapper = shallow(
      <RepositoryProfile
        {...defaultProps}
        repository={{
          ...defaultProps.repository,
          primaryLanguage: null,
        }}
      />
    );
    const icon = wrapper.find({ name: 'fiber-manual-record' });

    expect(icon.length).toBeFalsy();
  });

  it('should render repository fork text container if repository.isFork is true', () => {
    const wrapper = shallow(<RepositoryProfile {...defaultProps} />);
    const repositoryContainer = wrapper.find({
      nativeId: 'repository-fork-container',
    });

    expect(repositoryContainer.length).toBeTruthy();
  });

  it('should call navigation.navigate onPress repository parent', () => {
    const navigateMock = jest.fn();
    const navigation = {
      navigate: navigateMock,
    };

    const wrapper = shallow(
      <RepositoryProfile {...defaultProps} navigation={navigation} />
    );

    wrapper
      .find({ nativeId: 'repository-navigate-container' })
      .simulate('press');

    expect(navigateMock).toHaveBeenCalledWith('Repository', {
      repoId: 'foo/bar',
    });
  });
});
