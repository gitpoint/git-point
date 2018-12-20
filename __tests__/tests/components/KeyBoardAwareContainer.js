import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import { KeyboardAwareContainer } from 'components';

describe.only('<KeyBoardAwareContainer />', () => {
  it('correctly renders with children', () => {
    const wrapper = shallow(
      <KeyboardAwareContainer>
        <Text>KeyboardAwareContainer</Text>
      </KeyboardAwareContainer>
    );

    expect(wrapper.contains(<Text>KeyboardAwareContainer</Text>)).toEqual(true);

    wrapper.unmount();
  });
});
