import React from 'react';
import { shallow, render } from 'enzyme';
import { RepositorySectionTitle, StateBadge } from 'components';

const defaultProps = {
  text: 'test title',
  openCount: 10,
  closedCount: 10,
  loading: false,
};

describe('<RepositorySectionTitle />', () => {
  it('should display no StateBadge components if loading is true', () => {
    const wrapper = shallow(
      <RepositorySectionTitle {...defaultProps} loading={true} />
    );
    const badges = wrapper.find(StateBadge);

    expect(badges.length).toBe(0);
  });

  it('should display two StateBadge components if loading is false', () => {
    const wrapper = shallow(<RepositorySectionTitle {...defaultProps} />);
    const badges = wrapper.find(StateBadge);

    expect(badges.length).toBe(2);
  });
});
