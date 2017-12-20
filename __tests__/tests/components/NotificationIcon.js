import React from 'react';
import { shallow, render } from 'enzyme';
import { Badge, NotificationIconComponent } from 'components';

const defaultProps = {
  iconColor: 'red',
  notificationsCount: 10,
};

describe('<NotificationIcon />', () => {
  it('should display a Badge component when notificationsCount is greater than 0', () => {
    const wrapper = shallow(<NotificationIconComponent {...defaultProps} />);

    const badges = wrapper.find(Badge);
    expect(badges.length).toBe(1);
  });

  it('should not display a Badge component when notificationsCount is 0', () => {
    const wrapper = shallow(
      <NotificationIconComponent {...defaultProps} notificationsCount={0} />
    );

    const badges = wrapper.find(Badge);
    expect(badges.length).toBe(0);
  });

  it("should display a Badge component displaying '99+' in normal text when notificationsCount is greater than 99", () => {
    const wrapper = shallow(
      <NotificationIconComponent {...defaultProps} notificationsCount={100} />
    );

    const badge = wrapper.find(Badge);
    expect(badge.prop('text')).toBe('99+');
    expect(badge.prop('largeText')).toBe(false);
  });

  it('should display a Badge component displaying notificationsCount in largeText if notificationsCount is less than or equal to 99', () => {
    const wrapper = shallow(
      <NotificationIconComponent {...defaultProps} notificationsCount={99} />
    );

    const badge = wrapper.find(Badge);

    expect(badge.prop('text')).toBe(99);
    expect(badge.prop('largeText')).toBe(true);
  });
});
