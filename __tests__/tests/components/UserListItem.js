import React from 'react';
import { shallow } from 'enzyme';
import { UserListItem } from 'components';

const store = {
    subscribe: jest.fn(),
    getState: jest.fn(() => ({ auth: { user: { login: 'gitpoint'}}})),
    dispatch: jest.fn()
};

const defaultProps = {
    user: {
        type: 'User',
        login: 'gitpoint',
        avatar_url: 'gitpoint-avatar.png',
    },
    navigation: {
        navigate: jest.fn(),
    }
};

describe('<UserListItem />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should navigate to AuthProfile screen when item is the logged in user', () => {
        const wrapper = shallow(<UserListItem {...defaultProps} />, { context: { store }}).dive();

        wrapper.find('Styled(TouchableHighlight)').simulate('press');

        expect(defaultProps.navigation.navigate).toHaveBeenCalledTimes(1);
        expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('AuthProfile', expect.anything());
    });

    it('should navigate to Profile screen when item is not the logged in user', () => {
        const wrapper = shallow(
            <UserListItem {...defaultProps} user={{ type: 'User', login: 'someone' }} />,
            { context: { store }}
        ).dive();

        wrapper.find('Styled(TouchableHighlight)').simulate('press');

        expect(defaultProps.navigation.navigate).toHaveBeenCalledTimes(1);
        expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Profile', expect.anything());
    });

    it('should navigate to Organization screen when item is not user type', () => {
        const wrapper = shallow(
            <UserListItem {...defaultProps} user={{ type: '', login: 'org' }} />,
            { context: { store }}
        ).dive();

        wrapper.find('Styled(TouchableHighlight)').simulate('press');

        expect(defaultProps.navigation.navigate).toHaveBeenCalledTimes(1);
        expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Organization', expect.anything());
    });

    it('should navigate to user screen when user component is pressed', () => {
        const wrapper = shallow(<UserListItem {...defaultProps} />, { context: { store }}).dive();

        wrapper.find('[data-testid="userListItem-user"]').simulate('press');

        expect(defaultProps.navigation.navigate).toHaveBeenCalledTimes(1);
        expect(defaultProps.navigation.navigate).toHaveBeenCalledWith(expect.any(String), { user: defaultProps.user });
    });

    it('should navigate to user screen when user image container is pressed', () => {
        const wrapper = shallow(<UserListItem {...defaultProps} />, { context: { store }}).dive();

        wrapper.find('[data-testid="userListItem-imageContainer"]').simulate('press');

        expect(defaultProps.navigation.navigate).toHaveBeenCalledTimes(1);
        expect(defaultProps.navigation.navigate).toHaveBeenCalledWith(expect.any(String), { user: defaultProps.user });
    });
    it('should render user image', () => {
        const wrapper = shallow(<UserListItem {...defaultProps} />, { context: { store }}).dive();
        const image = wrapper.find('[data-testid="userListItem-image"]');

        expect(image.prop('source').uri).toBe(defaultProps.user.avatar_url);
    });

    it('should render user login as title', () => {
        const wrapper = shallow(<UserListItem {...defaultProps} />, { context: { store }}).dive();
        const title = wrapper.find('Styled(Text)');

        expect(title.contains(defaultProps.user.login)).toBe(true);
    });

    it('should render title and subtitle', () => {
        const wrapper = shallow(
            <UserListItem {...defaultProps} title="git" subtitle="point" />,
            { context: { store }}
        ).dive();
        const hasTitle = wrapper.find('Styled(Text)').contains('git');
        const hasSubtitle = wrapper.find('Styled(Text)').contains('point');

        expect(hasTitle).toBe(true);
        expect(hasSubtitle).toBe(true);
    });

    it('should call iconAction', () => {
        const iconAction = jest.fn();
        const wrapper = shallow(
            <UserListItem {...defaultProps} iconAction={iconAction} />,
            { context: { store }}
        ).dive();

        wrapper.find('[data-testid="userListItem-icon"]').simulate('press');

        expect(iconAction).toHaveBeenCalledTimes(1);
        expect(iconAction).toHaveBeenCalledWith(defaultProps.user.login);
    });
});