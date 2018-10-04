import React from 'react';
import { shallow } from 'enzyme';
import { LabelListItem, LabelButton } from 'components';

const defaultProps = {
  label: 'Awesome Label',
  removeLabel: () => {},
};

describe('<LabelListItem />', () => {
  it('should render component with the correct label', () => {
    const wrapper = shallow(<LabelListItem {...defaultProps} />);

    expect(wrapper.find(LabelButton)).toHaveLength(1);
    expect(
      wrapper.contains(<LabelButton label={defaultProps.label} largeWithTag />)
    ).toEqual(true);
  });

  it('should call remove label with correct label when user presses IconContainer', () => {
    const removeLabelMock = jest.fn();
    defaultProps.removeLabel = removeLabelMock;

    const wrapper = shallow(<LabelListItem {...defaultProps} />);

    wrapper.find('IconContainer').simulate('press');

    expect(wrapper.find('IconContainer')).toHaveLength(1);
    expect(removeLabelMock).toHaveBeenCalledWith(defaultProps.label);
  });
});
