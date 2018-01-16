import React from 'react';
import { shallow } from 'enzyme';

import { Badge } from 'components';

describe('<Badge />', () => {
  it('correctly renders with text', () => {
    const wrapper = shallow(<Badge text="test text" />);

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('test text');
  });
});
