import React from 'react';
import { Text } from 'react-native';
import sinon from 'sinon';
import { shallow, render } from 'enzyme';

import { ToggleView } from 'components';

describe('<ToggleView />', () => {
  it('correctly renders with default touchable view', () => {
    const wrapper = render(
      <ToggleView>
        <Text>I'm hidden</Text>
      </ToggleView>
    );

    expect(
      wrapper
        .find('text')
        .first()
        .text()
    ).toEqual('…');
  });

  it('correctly renders with a custom touchable view', () => {
    const wrapper = render(
      <ToggleView TouchableView={<Text>CUSTOM</Text>}>
        <Text>I'm hidden</Text>
      </ToggleView>
    );

    expect(
      wrapper
        .find('text')
        .first()
        .text()
    ).toEqual('CUSTOM');
  });

  it('starts with the hidden element collapsed', () => {
    const wrapper = shallow(
      <ToggleView TouchableView={<Text>CUSTOM</Text>}>
        <Text>I'm hidden</Text>
      </ToggleView>
    );

    expect(wrapper.find('Collapsible').prop('collapsed')).toEqual(true);
  });

  it('uncollapses the hidden element when touched', () => {
    const onPress = sinon.spy();
    const wrapper = shallow(
      <ToggleView>
        <Text>I'm hidden</Text>
      </ToggleView>
    );

    wrapper.find('TouchableOpacity').simulate('press');

    expect(wrapper.find('Collapsible').prop('collapsed')).toEqual(false);
  });

  it('recollapses the hidden element when touched twice', () => {
    const onPress = sinon.spy();
    const wrapper = shallow(
      <ToggleView>
        <Text>I'm hidden</Text>
      </ToggleView>
    );

    wrapper.find('TouchableOpacity').simulate('press');
    wrapper.find('TouchableOpacity').simulate('press');

    expect(wrapper.find('Collapsible').prop('collapsed')).toEqual(true);
  });
});
