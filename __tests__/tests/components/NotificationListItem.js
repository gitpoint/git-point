import React from 'react';
import { shallow, render } from 'enzyme';
import { NotificationListItem } from 'components';
import { View, TouchableOpacity } from 'react-native';

const defaultProps = {
  id: 1,
  notification: {
    subject: {
      type: 'Commit',
    },
  },
  iconAction() {},
  navigationAction() {},
};

describe('<NotificationListItem />', () => {
  it("should render a View component if notification type is 'Commit'", () => {
    const wrapper = shallow(<NotificationListItem {...defaultProps} />);

    const result = wrapper.instance().getComponentType();

    expect(result).toBe(View);
  });

  it("should render a TouchableOpacity component if notification type is not 'Commit'", () => {
    const notification = {
      subject: {
        type: 'not a commit',
      },
    };
    const wrapper = shallow(
      <NotificationListItem {...defaultProps} notification={notification} />
    );

    const result = wrapper.instance().getComponentType();

    expect(result).toBe(TouchableOpacity);
  });

  it('should call navigation when user presses TitleComponent', () => {
    const notification = {
      subject: {
        type: 'not a commit',
      },
    };
    const navigationActionMock = jest.fn();
    const wrapper = shallow(
      <NotificationListItem
        {...defaultProps}
        notification={notification}
        navigationAction={navigationActionMock}
      />
    );

    wrapper.find({ nativeId: 'TitleComponent' }).simulate('press');

    expect(navigationActionMock).toHaveBeenCalledWith(notification);
  });

  it('should return the correct icon name', () => {
    const wrapper = shallow(<NotificationListItem {...defaultProps} />);

    expect(wrapper.instance().getIconName('Commit')).toEqual('git-commit');
    expect(wrapper.instance().getIconName('PullRequest')).toEqual(
      'git-pull-request'
    );
    expect(wrapper.instance().getIconName('wrong data')).toEqual(
      'issue-opened'
    );
  });

  it('should call iconAction on press and notification is unread', () => {
    const notification = {
      id: 1,
      subject: {
        type: 'Commit',
      },
      unread: true,
    };
    const iconActionMock = jest.fn();
    const wrapper = shallow(
      <NotificationListItem
        {...defaultProps}
        notification={notification}
        iconAction={iconActionMock}
      />
    );

    wrapper.find({ nativeId: 'notification-unread' }).simulate('press');

    expect(iconActionMock).toHaveBeenCalledWith(1);
    expect(iconActionMock).toHaveBeenCalledTimes(1);
  });

  it('should return object empty', () => {
    const wrapper = shallow(<NotificationListItem {...defaultProps} />);

    expect(wrapper.instance().getTitleComponentProps()).toEqual({});
  });

  it('should return object with nativeId and onPress', () => {
    const notification = {
      subject: {
        type: 'not a commit',
      },
    };
    const wrapper = shallow(
      <NotificationListItem {...defaultProps} notification={notification} />
    );

    const result = wrapper.instance().getTitleComponentProps();
    expect(result.nativeId).toBe('TitleComponent');
    expect(result.onPress).toEqual(expect.any(Function));
  });
});
