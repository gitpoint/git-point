import React from 'react';
import {shallow} from 'enzyme';
import {Platform} from 'react-native';

import {CommentInput} from 'components';

describe('<CommentInput />', () => {

  const defaultProps = {
    users: [],
    userHasPushPermission: true,
    issueLocked: false,
    locale: '',
    onSubmit: () => {},
  };

  it('should render TextInput and TouchableOpacity if user can post', () => {

    const wrapper = shallow(
      <CommentInput {...defaultProps}/>
    );

    expect(wrapper.find('TextInput').length).toEqual(1);
    expect(wrapper.find('TouchableOpacity').length).toEqual(1);
    expect(wrapper.find('Text').length).toEqual(0);
  });

  it("should not render TextInput and TouchableOpacity if user can't post", () => {

    const wrapper = shallow(
      <CommentInput
        {...defaultProps}
        userHasPushPermission={false}
        issueLocked={true}/>
    );

    expect(wrapper.find('TextInput').length).toEqual(0);
    expect(wrapper.find('TouchableOpacity').length).toEqual(0);
    expect(wrapper.find('Text').length).toEqual(1);
  });

  it('should update the state text if value change', () => {
    const wrapper = shallow(
      <CommentInput {...defaultProps}/>
    );

    const input = wrapper.find('TextInput');

    input.simulate('changeText', 'Changed text');

    expect(wrapper.state('text')).toEqual('Changed text');
  });

  it('should call handleSubmit methods when submitted', () => {
    const wrapper = shallow(
      <CommentInput {...defaultProps}/>
    );

    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');

    wrapper
      .instance()
      .forceUpdate();

    wrapper
      .find('TextInput')
      .simulate('changeText', 'Changed text');

    wrapper
      .find('TouchableOpacity')
      .simulate('press');

    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should change the content size', () => {
    const wrapper = shallow(
      <CommentInput {...defaultProps}/>
    );

    wrapper
      .find('TextInput')
      .simulate('contentSizeChange', {
        nativeEvent: {
          contentSize: {
            height: 10
          }
        }
      });

    expect(wrapper.state('height')).toBe(10);
  });

  it('should call handleSubmitEditing methods when onSubmitEditing event raised', () => {
    const wrapper = shallow(
      <CommentInput {...defaultProps}/>
    );

    const handleSubmitEditingSpy = jest.spyOn(wrapper.instance(), 'handleSubmitEditing');

    wrapper
      .instance()
      .forceUpdate();

    Platform.OS = 'android';

    wrapper
      .find('TextInput')
      .simulate('submitEditing', {
        nativeEvent: {
          text: 'Changed by submitEditing'
        }
      });

    expect(handleSubmitEditingSpy).toHaveBeenCalled();

    expect(wrapper.state('text')).toEqual('Changed by submitEditing\n');
  });
});
