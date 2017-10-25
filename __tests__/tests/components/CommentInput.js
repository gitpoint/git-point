import React from 'react';
import {shallow, render} from 'enzyme';
import sinon from 'sinon';
import {Platform} from 'react-native';

import {CommentInput} from 'components';

describe('<CommentInput />', () => {
  //If the user is connected, the component should let him push comment.
  //If the user is not connected, the TextInput should disappear.

  it("Should render 'TextInput' and TouchableOpacity if user can post", () => {

    const wrapper = shallow(
      <CommentInput
        users={[]}
        userHasPushPermission={true}
        issueLocked={false}
        locale=''
        onSubmit={() => {
        }}/>);

    expect(wrapper.find('TextInput').length).toEqual(1);
    expect(wrapper.find('TouchableOpacity').length).toEqual(1);
    expect(wrapper.find('Text').length).toEqual(0);
  });

  it("Should render 'TextInput' and TouchableOpacity if user can post", () => {

    const wrapper = shallow(
      <CommentInput
        users={[]}
        userHasPushPermission={false}
        issueLocked={true}
        locale=''
        onSubmit={() => {
        }}/>);

    expect(wrapper.find('TextInput').length).toEqual(0);
    expect(wrapper.find('TouchableOpacity').length).toEqual(0);
    expect(wrapper.find('Text').length).toEqual(1);
  });

  it('Should update the state text if value change', () => {
    const wrapper = shallow(
      <CommentInput
        userHasPushPermission={true}
        issueLocked={false}
        locale=''
      />);

    const input = wrapper.find('TextInput');

    input.simulate('changeText', 'Changed text');

    expect(wrapper.state('text')).toEqual('Changed text');
  });

  it('Should update the state text if value change', () => {
    const wrapper = shallow(
      <CommentInput
        userHasPushPermission={true}
        issueLocked={false}
        locale=''
      />);

    wrapper.find('TextInput').simulate('changeText', 'Changed text');

    expect(wrapper.state('text')).toEqual('Changed text');
  });

  it('Should call handleSubmit  methods when submitted', () => {
    const wrapper = shallow(
      <CommentInput
        userHasPushPermission={true}
        issueLocked={false}
        locale=''
        onSubmit={() => {
        }}
      />);

    const handleSubmitSpy = sinon.spy(wrapper.instance(), 'handleSubmit');

    wrapper.instance().forceUpdate();

    wrapper.find('TextInput').simulate('changeText', 'Changed text');
    wrapper.find('TouchableOpacity').simulate('press');

    expect(handleSubmitSpy.calledOnce).toBe(true);
  });

  it('Should change the content size', () => {
    const wrapper = shallow(
      <CommentInput
        userHasPushPermission={true}
        issueLocked={false}
        locale=''
        onSubmit={() => {
        }}
      />);

    console.log(wrapper.state('height'));

    //User contentSizeChange event to change the state 'height'
    wrapper.find('TextInput').simulate('contentSizeChange', {nativeEvent: {contentSize: {height: 10}}});

    expect(wrapper.state('height')).toBe(10);
  });

  it('Should call handleSubmitEditing methods when onSubmitEditing event raised', () => {
    const wrapper = shallow(
      <CommentInput
        userHasPushPermission={true}
        issueLocked={false}
        locale=''
        onSubmit={() => {
        }}
      />);

    const handleSubmitEditingSpy = sinon.spy(wrapper.instance(), 'handleSubmitEditing');

    wrapper.instance().forceUpdate();

    Platform.OS = 'android';

    wrapper.find('TextInput').simulate('submitEditing', {nativeEvent: {text: 'Changed by submitEditing'}});

    expect(handleSubmitEditingSpy.calledOnce).toBe(true);

    expect(wrapper.state('text')).toEqual('Changed by submitEditing\n');
  });
});
