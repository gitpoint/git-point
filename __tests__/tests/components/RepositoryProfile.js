import React from 'react';
import { shallow } from 'enzyme';
import { Icon } from 'react-native-elements';

import { RepositoryProfile } from 'components';

const defaultProps = {
  repository: {
    fork: true,
    parent: true,
    language: 'en',
  },
  starred: false,
  navigation: {
    navigate() {},
  },
  loading: false,
  subscribed: false,
  locale: 'en',
};

describe('<RepositoryProfile />', () => {
  it('should render the Icon component if loading is false and repository language is not null', () => {
    const wrapper = shallow(
      <RepositoryProfile {...defaultProps} language={false} />
    );
    const theIcon = wrapper.find({ name: 'fiber-manual-record' });

    expect(theIcon.length).toBeTruthy();
  });

  it('should not render the Icon component if loading is true', () => {
    const wrapper = shallow(
      <RepositoryProfile {...defaultProps} loading={true} />
    );
    const theIcon = wrapper.find({ name: 'fiber-manual-record' });

    expect(theIcon.length).toBeFalsy();
  });

  it('should not render the Icon component if repository language is null', () => {
    const wrapper = shallow(
      <RepositoryProfile
        {...defaultProps}
        repository={{
          ...defaultProps.repository,
          language: null,
        }}
      />
    );
    const theIcon = wrapper.find({ name: 'fiber-manual-record' });

    expect(theIcon.length).toBeFalsy();
  });

  it('should render repository fork text container if repository.fork is true', () => {
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
      repository: true,
    });
  });
});
