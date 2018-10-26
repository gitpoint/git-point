import React from 'react';
import { shallow } from 'enzyme';
import { ViewContainer, StyledViewContainer } from 'components';

describe('<ViewContainer />', () => {
  it('should always render a <StyledViewContainer />', () => {
    const wrapper = shallow(<ViewContainer />);
    expect(wrapper.find(StyledViewContainer).length).toBe(1);
    expect(wrapper.find(StyledViewContainer).prop('children')).toBe(null);
  });

  it('should pass children to <StyledViewContainer /> if present', () => {
    const wrapper = shallow(<ViewContainer>test</ViewContainer>);
    expect(
      wrapper
        .find(StyledViewContainer)
        .children()
        .text()
    ).toBe('test');
  });
});
