import React from 'react';
import { shallow } from 'enzyme';
import Communications from 'react-native-communications';

import organization from 'testData/api/organization';
import user, {
  noCompany,
  noTaggedCompany,
  noLocation,
  noEmail,
  noHttpInBlog,
} from 'testData/api/user';

import { EntityInfo } from 'components';

describe('<EntityInfo />', () => {
  it('should render organization correctly', () => {
    const wrapper = shallow(<EntityInfo entity={organization} language="en" />);

    expect(wrapper.find({ title: 'Location' }).prop('subtitle')).toEqual(
      organization.location
    );
    wrapper.find({ title: 'Location' }).simulate('press');
    expect(Communications.web).toBeCalledWith(
      `https://www.google.com/maps/place/${organization.location.replace(
        / /g,
        '+'
      )}`
    );

    expect(wrapper.find({ title: 'Email' }).prop('subtitle')).toEqual(
      organization.email
    );
    wrapper.find({ title: 'Email' }).simulate('press');
    expect(Communications.email).toBeCalledWith(
      [organization.email],
      null,
      null,
      null,
      null
    );

    expect(wrapper.find({ title: 'Website' }).prop('subtitle')).toEqual(
      organization.blog
    );
    wrapper.find({ title: 'Website' }).simulate('press');
    expect(Communications.web).toBeCalledWith(organization.blog);
  });

  it('should render users correctly', () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const wrapper = shallow(
      <EntityInfo
        entity={user}
        orgs={[organization]}
        language="en"
        navigation={navigationMock}
      />
    );

    expect(wrapper.find({ title: 'Location' }).prop('subtitle')).toEqual(
      user.location
    );
    wrapper.find({ title: 'Location' }).simulate('press');
    expect(Communications.web).toBeCalledWith(
      `https://www.google.com/maps/place/${user.location.replace(/ /g, '+')}`
    );

    expect(wrapper.find({ title: 'Email' }).prop('subtitle')).toEqual(
      user.email
    );
    wrapper.find({ title: 'Email' }).simulate('press');
    expect(Communications.email).toBeCalledWith(
      [user.email],
      null,
      null,
      null,
      null
    );

    expect(wrapper.find({ title: 'Website' }).prop('subtitle')).toEqual(
      user.blog
    );
    wrapper.find({ title: 'Website' }).simulate('press');
    expect(Communications.web).toBeCalledWith(user.blog);

    expect(wrapper.find({ title: 'Company' }).prop('subtitle')).toEqual(
      user.company
    );
    wrapper.find({ title: 'Company' }).simulate('press');
    expect(navigationMock.navigate).toBeCalledWith('Organization', {
      organization,
    });
  });

  it('should render user without company', () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const wrapper = shallow(
      <EntityInfo
        entity={noCompany}
        orgs={[organization]}
        language="en"
        navigation={navigationMock}
      />
    );

    expect(wrapper.find({ title: 'Location' }).prop('subtitle')).toEqual(
      noCompany.location
    );
    wrapper.find({ title: 'Location' }).simulate('press');
    expect(Communications.web).toBeCalledWith(
      `https://www.google.com/maps/place/${noCompany.location.replace(
        / /g,
        '+'
      )}`
    );

    expect(wrapper.find({ title: 'Email' }).prop('subtitle')).toEqual(
      noCompany.email
    );
    wrapper.find({ title: 'Email' }).simulate('press');
    expect(Communications.email).toBeCalledWith(
      [noCompany.email],
      null,
      null,
      null,
      null
    );

    expect(wrapper.find({ title: 'Website' }).prop('subtitle')).toEqual(
      noCompany.blog
    );
    wrapper.find({ title: 'Website' }).simulate('press');
    expect(Communications.web).toBeCalledWith(noCompany.blog);

    expect(wrapper.find({ title: 'Company' }).length).toEqual(0);
  });

  it('should render user without a tagged company', () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const wrapper = shallow(
      <EntityInfo
        entity={noTaggedCompany}
        orgs={[organization]}
        language="en"
        navigation={navigationMock}
      />
    );

    expect(wrapper.find({ title: 'Location' }).prop('subtitle')).toEqual(
      noTaggedCompany.location
    );
    wrapper.find({ title: 'Location' }).simulate('press');
    expect(Communications.web).toBeCalledWith(
      `https://www.google.com/maps/place/${noCompany.location.replace(
        / /g,
        '+'
      )}`
    );

    expect(wrapper.find({ title: 'Email' }).prop('subtitle')).toEqual(
      noTaggedCompany.email
    );
    wrapper.find({ title: 'Email' }).simulate('press');
    expect(Communications.email).toBeCalledWith(
      [noCompany.email],
      null,
      null,
      null,
      null
    );

    expect(wrapper.find({ title: 'Website' }).prop('subtitle')).toEqual(
      noTaggedCompany.blog
    );
    wrapper.find({ title: 'Website' }).simulate('press');
    expect(Communications.web).toBeCalledWith(noCompany.blog);

    expect(wrapper.find({ title: 'Company' }).prop('subtitle')).toEqual(
      noTaggedCompany.company
    );
    wrapper.find({ title: 'Company' }).simulate('press');
    expect(navigationMock.navigate.mock.calls.length).toEqual(0);
  });

  it('should render user without a location', () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const wrapper = shallow(
      <EntityInfo
        entity={noLocation}
        orgs={[organization]}
        language="en"
        navigation={navigationMock}
      />
    );

    expect(wrapper.find({ title: 'Location' }).length).toEqual(0);

    expect(wrapper.find({ title: 'Email' }).prop('subtitle')).toEqual(
      noLocation.email
    );
    wrapper.find({ title: 'Email' }).simulate('press');
    expect(Communications.email).toBeCalledWith(
      [noLocation.email],
      null,
      null,
      null,
      null
    );

    expect(wrapper.find({ title: 'Website' }).prop('subtitle')).toEqual(
      noLocation.blog
    );
    wrapper.find({ title: 'Website' }).simulate('press');
    expect(Communications.web).toBeCalledWith(noLocation.blog);

    expect(wrapper.find({ title: 'Company' }).prop('subtitle')).toEqual(
      noLocation.company
    );
    wrapper.find({ title: 'Company' }).simulate('press');
    expect(navigationMock.navigate).toBeCalledWith('Organization', {
      organization,
    });
  });

  it('should render user without a tagged company', () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const wrapper = shallow(
      <EntityInfo
        entity={noEmail}
        orgs={[organization]}
        language="en"
        navigation={navigationMock}
      />
    );

    expect(wrapper.find({ title: 'Location' }).prop('subtitle')).toEqual(
      noEmail.location
    );
    wrapper.find({ title: 'Location' }).simulate('press');
    expect(Communications.web).toBeCalledWith(
      `https://www.google.com/maps/place/${noEmail.location.replace(/ /g, '+')}`
    );

    expect(wrapper.find({ title: 'Email' }).length).toEqual(0);

    expect(wrapper.find({ title: 'Website' }).prop('subtitle')).toEqual(
      noEmail.blog
    );
    wrapper.find({ title: 'Website' }).simulate('press');
    expect(Communications.web).toBeCalledWith(noEmail.blog);

    expect(wrapper.find({ title: 'Company' }).prop('subtitle')).toEqual(
      noEmail.company
    );
    wrapper.find({ title: 'Company' }).simulate('press');
    expect(navigationMock.navigate).toBeCalledWith('Organization', {
      organization,
    });
  });

  it('should render user without a blog beginning with http', () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const wrapper = shallow(
      <EntityInfo
        entity={noHttpInBlog}
        orgs={[organization]}
        language="en"
        navigation={navigationMock}
      />
    );

    expect(wrapper.find({ title: 'Location' }).prop('subtitle')).toEqual(
      noHttpInBlog.location
    );
    wrapper.find({ title: 'Location' }).simulate('press');
    expect(Communications.web).toBeCalledWith(
      `https://www.google.com/maps/place/${noHttpInBlog.location.replace(
        / /g,
        '+'
      )}`
    );

    expect(wrapper.find({ title: 'Email' }).prop('subtitle')).toEqual(
      noHttpInBlog.email
    );
    wrapper.find({ title: 'Email' }).simulate('press');
    expect(Communications.email).toBeCalledWith(
      [noHttpInBlog.email],
      null,
      null,
      null,
      null
    );

    expect(wrapper.find({ title: 'Website' }).prop('subtitle')).toEqual(
      noHttpInBlog.blog
    );
    wrapper.find({ title: 'Website' }).simulate('press');
    expect(Communications.web).toBeCalledWith(`http://${noHttpInBlog.blog}`);

    expect(wrapper.find({ title: 'Company' }).prop('subtitle')).toEqual(
      noHttpInBlog.company
    );
    wrapper.find({ title: 'Company' }).simulate('press');
    expect(navigationMock.navigate).toBeCalledWith('Organization', {
      organization,
    });
  });

  it('should not render without required keys', () => {
    const wrapper = shallow(
      <EntityInfo
        entity={{ name: 'John Doe' }}
        orgs={[organization]}
        language="en"
      />
    );

    expect(wrapper.html()).toEqual(null);
  });
});
