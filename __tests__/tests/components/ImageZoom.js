import React from 'react';
import { shallow } from 'enzyme';

import { ImageZoom } from 'components';

describe('<ImageZoom />', () => {
  const defaultProps = {
    style: { backgroundColor: 'red' },
    uri: { uri: 'dummy.png' },
  };

  it('should render clickable image when the component initializes', () => {
    const wrapper = shallow(<ImageZoom {...defaultProps} />);

    const clickableImg = wrapper.find({ nativeId: 'image-zoom-clickable-img' });

    expect(clickableImg.length).toBe(1);
  });

  it('should render modal when the user presses Touchable', () => {
    const wrapper = shallow(<ImageZoom {...defaultProps} />);

    wrapper.find({ nativeId: 'image-zoom-clickable-img' }).simulate('press');

    const modal = wrapper.find({ nativeId: 'image-zoom-modal' });

    expect(modal.length).toBe(1);
  });

  it('should close modal when onRequestClose is called', () => {
    const wrapper = shallow(<ImageZoom {...defaultProps} />);
    wrapper.setState({ imgZoom: true });

    wrapper.find({ nativeId: 'image-zoom-modal' }).simulate('requestClose');

    const modal = wrapper.find({ nativeId: 'image-zoom-modal' });

    expect(modal.length).toBe(0);
  });

  it('should close modal when the user presses CloseButton', () => {
    const wrapper = shallow(<ImageZoom {...defaultProps} />);
    wrapper.setState({ imgZoom: true });

    wrapper.find({ nativeId: 'image-zoom-close-button' }).simulate('press');

    expect(wrapper.state('imgZoom')).toBeFalsy();
  });

  it('should close modal when the user taps the image', () => {
    const wrapper = shallow(<ImageZoom {...defaultProps} />);
    wrapper.setState({ imgZoom: true });

    wrapper.find({ nativeId: 'image-zoom-photo-view' }).simulate('tap');

    expect(wrapper.state('imgZoom')).toBeFalsy();
  });
});
