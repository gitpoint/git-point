import React from 'react';
import { shallow } from 'enzyme';

import { closed as closedIssue, open as openIssue } from 'testData/api/issue';
import {
  closed as closedPr,
  open as openPr,
  merged as mergedPr,
} from 'testData/api/pull-request';
import { colors } from 'config';

import { StateBadge } from 'components';

describe('<StateBadge />', () => {
  it('correctly renders with open issue', () => {
    const wrapper = shallow(<StateBadge issue={openIssue} language="en" />);

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('Open');
    expect(wrapper.prop('color')).toEqual(colors.green);
  });

  it('correctly renders with closed issue', () => {
    const wrapper = shallow(<StateBadge issue={closedIssue} language="en" />);

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('Closed');
    expect(wrapper.prop('color')).toEqual(colors.red);
  });

  it('correctly renders with open pull request', () => {
    const wrapper = shallow(<StateBadge issue={openPr} language="en" />);

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('Open');
    expect(wrapper.prop('color')).toEqual(colors.green);
  });

  it('correctly renders with closed pull request', () => {
    const wrapper = shallow(<StateBadge issue={closedPr} language="en" />);

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('Closed');
    expect(wrapper.prop('color')).toEqual(colors.red);
  });

  it('correctly renders with merged pull request', () => {
    const wrapper = shallow(
      <StateBadge isMerged issue={mergedPr} language="en" />
    );

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('Merged');
    expect(wrapper.prop('color')).toEqual(colors.purple);
  });

  it('correctly renders without issue', () => {
    const wrapper = shallow(<StateBadge isMerged language="en" />);

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('Merged');
    expect(wrapper.prop('color')).toEqual(colors.purple);
  });

  it('correctly renders with open type', () => {
    const wrapper = shallow(<StateBadge type="open" language="en" />);

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('');
    expect(wrapper.prop('color')).toEqual(colors.green);
  });

  it('correctly renders with closed type', () => {
    const wrapper = shallow(<StateBadge type="closed" language="en" />);

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('');
    expect(wrapper.prop('color')).toEqual(colors.red);
  });

  it('correctly renders with closed type', () => {
    const wrapper = shallow(<StateBadge type="merged" language="en" />);

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('');
    expect(wrapper.prop('color')).toEqual(colors.purple);
  });

  it('correctly renders with custom text', () => {
    const wrapper = shallow(
      <StateBadge type="open" text="test text" language="en" />
    );

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('test text');
    expect(wrapper.prop('color')).toEqual(colors.green);
  });
});
