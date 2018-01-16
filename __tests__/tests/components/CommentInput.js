import React from 'react';
import { shallow } from 'enzyme';
import { Platform } from 'react-native';

import { CommentInput } from 'components';

describe('<CommentInput />', () => {
  const defaultProps = {
    users: [],
    userHasPushPermission: true,
    issueLocked: false,
    locale: '',
    onSubmit: () => {},
  };

  it('should render styled TextInput and send Icon if user has push permissions and issue is not locked', () => {
    const wrapper = shallow(<CommentInput {...defaultProps} />);

    expect(wrapper.find('Styled(TextInput)').length).toEqual(1);
    expect(wrapper.find('Styled(Icon)[name="send"]').length).toEqual(1);
  });

  it('should not render styled Text and lock Icon if user has push permissions and issue is not locked', () => {
    const wrapper = shallow(<CommentInput {...defaultProps} />);

    expect(wrapper.find('Styled(Text)').length).toEqual(0);
    expect(wrapper.find('Icon').length).toEqual(0);
  });

  it('should not render styled TextInput and send Icon if user does not have push permissions and issue is locked', () => {
    const wrapper = shallow(
      <CommentInput
        {...defaultProps}
        userHasPushPermission={false}
        issueLocked={true}
      />
    );

    expect(wrapper.find('Styled(TextInput)').length).toEqual(0);
    expect(wrapper.find('Styled(Icon)[name="send"]').length).toEqual(0);
  });

  it('should render styled Text and lock Icon if user does not have push permissions and issue is locked', () => {
    const wrapper = shallow(
      <CommentInput
        {...defaultProps}
        userHasPushPermission={false}
        issueLocked={true}
      />
    );

    expect(wrapper.find('Styled(Text)').length).toEqual(1);
    expect(wrapper.find('Icon').length).toEqual(1);
  });

  it('should render styled TextInput and send Icon if user has push permissions and issue is locked', () => {
    const wrapper = shallow(
      <CommentInput {...defaultProps} issueLocked={true} />
    );

    expect(wrapper.find('Styled(TextInput)').length).toEqual(1);
    expect(wrapper.find('Styled(Icon)[name="send"]').length).toEqual(1);
  });

  it('should not render styled Text and lock Icon if user has push permissions and issue is locked', () => {
    const wrapper = shallow(
      <CommentInput {...defaultProps} issueLocked={true} />
    );

    expect(wrapper.find('Styled(Text)').length).toEqual(0);
    expect(wrapper.find('Icon').length).toEqual(0);
  });

  it('should not render styled Text and lock Icon if user does not have push permissions and issue is not locked', () => {
    const wrapper = shallow(
      <CommentInput {...defaultProps} userHasPushPermission={false} />
    );

    expect(wrapper.find('Styled(Text)').length).toEqual(0);
    expect(wrapper.find('Icon').length).toEqual(0);
  });

  it('should render styled TextInput and send Icon if user does not have push permissions and issue is not locked', () => {
    const wrapper = shallow(
      <CommentInput {...defaultProps} userHasPushPermission={false} />
    );

    expect(wrapper.find('Styled(TextInput)').length).toEqual(1);
    expect(wrapper.find('Styled(Icon)[name="send"]').length).toEqual(1);
  });

  it('should update the state text if value is changed', () => {
    const wrapper = shallow(<CommentInput {...defaultProps} />);

    const input = wrapper.find('Styled(TextInput)');

    input.simulate('changeText', 'Changed text');

    expect(wrapper.state('text')).toEqual('Changed text');
  });

  it('should call handleSubmit method when submitted', () => {
    const wrapper = shallow(<CommentInput {...defaultProps} />);

    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');

    wrapper.instance().forceUpdate();

    wrapper.find('Styled(TextInput)').simulate('changeText', 'Changed text');

    wrapper
      .find('Styled(Icon)[name="send"]')
      .parent()
      .simulate('press');

    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should change the content size', () => {
    const wrapper = shallow(<CommentInput {...defaultProps} />);

    wrapper.find('Styled(TextInput)').simulate('contentSizeChange', {
      nativeEvent: {
        contentSize: {
          height: 10,
        },
      },
    });

    expect(wrapper.state('height')).toBe(10);
  });

  it('should call handleSubmitEditing method in Android when onSubmitEditing event is raised', () => {
    const wrapper = shallow(<CommentInput {...defaultProps} />);

    const handleSubmitEditingSpy = jest.spyOn(
      wrapper.instance(),
      'handleSubmitEditing'
    );

    wrapper.instance().forceUpdate();

    Platform.OS = 'android';

    wrapper.find('Styled(TextInput)').simulate('submitEditing', {
      nativeEvent: {
        text: 'Changed by submitEditing',
      },
    });

    expect(handleSubmitEditingSpy).toHaveBeenCalled();

    expect(wrapper.state('text')).toEqual('Changed by submitEditing\n');
  });
});
