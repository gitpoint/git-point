import React from 'react';
import sinon from 'sinon';
import { shallow, render } from 'enzyme';

import { Button } from 'components';

describe('<Button />', () => {
  it('correctly responds to presses', () => {
    const onPress = sinon.spy();
    const wrapper = shallow(<Button title="test text" onPress={onPress} />);

    wrapper.simulate('press');

    expect(onPress.calledOnce).toEqual(true);
  });

  it('correctly renders with only title', () => {
    const wrapper = render(<Button title="test text" />);

    expect(wrapper.find('text').text()).toEqual('test text');
  });

  it('correctly renders with only icon', () => {
    const wrapper = render(
      <Button icon={{ name: 'git-merge', type: 'octicon' }} />
    );

    expect(
      wrapper
        .find('text')
        .last()
        .text()
    ).toEqual('missing title!');
  });

  it('correctly renders with title and icon', () => {
    const wrapper = render(
      <Button title="test text" icon={{ name: 'git-merge', type: 'octicon' }} />
    );

    expect(
      wrapper
        .find('text')
        .last()
        .text()
    ).toEqual('test text');
  });
});
