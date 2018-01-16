import React from 'react';
import { shallow } from 'enzyme';

import label from 'testData/label';

import { LabelButton } from 'components';

describe('<LabelButton />', () => {
  it('correctly renders small style', () => {
    const wrapper = shallow(<LabelButton label={label} />);

    expect(wrapper.prop('title')).toEqual(label.name);
    expect(wrapper.prop('fontSize')).toEqual(12);
    expect(wrapper.prop('color')).toEqual('#000000');
    expect(wrapper.prop('backgroundColor')).toEqual('#c3c3c3');
    expect(wrapper.prop('icon')).toEqual(undefined);
  });

  it('correctly renders large style', () => {
    const wrapper = shallow(<LabelButton label={label} largeWithTag />);

    expect(wrapper.prop('title')).toEqual(label.name);
    expect(wrapper.prop('fontSize')).toEqual(13);
    expect(wrapper.prop('color')).toEqual('#000000');
    expect(wrapper.prop('backgroundColor')).toEqual('#c3c3c3');
    expect(wrapper.prop('icon')).toEqual({
      name: 'tag',
      type: 'octicon',
      color: '#000000',
    });
  });
});
