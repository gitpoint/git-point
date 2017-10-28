import React from 'react';
import { shallow, render } from 'enzyme';
import { NotificationListItem } from 'components';
import { View, TouchableOpacity } from 'react-native';

const defaultProps = {
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

  it('should call navigation when user press TitleComponent', () => {
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

  it.skip('should return the correct icon name');
});
