import React from 'react';
import { shallow } from 'enzyme';

import organization from 'testData/api/organization';
import user from 'testData/api/user';

import { EntityInfo } from 'components';

describe('<EntityInfo />', () => {
  it('should render organization correctly', () => {
    const wrapper = shallow(<EntityInfo entity={organization} language="en" />);

    expect(wrapper.find({ title: 'Location' }).prop('subtitle')).toEqual(
      'San Francisco'
    );
    expect(wrapper.find({ title: 'Email' }).prop('subtitle')).toEqual(
      'octocat@github.com'
    );
    expect(wrapper.find({ title: 'Website' }).prop('subtitle')).toEqual(
      'https://github.com/blog'
    );
  });

  it('should render users correctly', () => {
    const wrapper = shallow(
      <EntityInfo entity={user} orgs={[organization]} language="en" />
    );

    expect(wrapper.find({ title: 'Location' }).prop('subtitle')).toEqual(
      'San Francisco'
    );
    expect(wrapper.find({ title: 'Email' }).prop('subtitle')).toEqual(
      'octocat@github.com'
    );
    expect(wrapper.find({ title: 'Website' }).prop('subtitle')).toEqual(
      'https://github.com/blog'
    );
    expect(wrapper.find({ title: 'Company' }).prop('subtitle')).toEqual(
      '@GitHub'
    );
  });
  
  it('should render user without organizations', () => {
    const wrapper = shallow(
      <EntityInfo entity={user} orgs={[]} language="en" />
    );

    expect(wrapper.find({ title: 'Location' }).prop('subtitle')).toEqual(
      'San Francisco'
    );
    expect(wrapper.find({ title: 'Email' }).prop('subtitle')).toEqual(
      'octocat@github.com'
    );
    expect(wrapper.find({ title: 'Website' }).prop('subtitle')).toEqual(
      'https://github.com/blog'
    );
    expect(wrapper.find({ title: 'Company' }).prop('subtitle')).toEqual(
      '@GitHub'
    );
  });
});
