import React from 'react';
import { shallow } from 'enzyme';

import organization from '../../data/organization';
import user from '../../data/user';

import { EntityInfo } from 'components';

describe('<EntityInfo />', () => {
  it('correctly renders organization', () => {
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

  it('correctly renders users', () => {
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
});
