import React from 'react';
import { shallow } from 'enzyme';
import { IssueListItem } from 'components';

const defaultProps = {
    type: 'issue',
    issue: {
        state: 'open',
        number: 101,
        title: 'My Issue',
        user: {
            login: 'gitpoint'
        },
        comments: 5,
        created_at: new Date(),
    },
    navigation: {},
    locale: 'en'
};

describe('<IssueListItem />', () => {
    it('should render open issue info', () => {
        const props = {...defaultProps, issue: {...defaultProps.issue, state: 'open'}};
        const wrapper = shallow(<IssueListItem {...props} />);
        const infoWrapper = wrapper.find('ListItem');

        expect(infoWrapper.prop('leftIcon').name).toEqual('issue-opened');
        expect(infoWrapper.prop('title')).toEqual(props.issue.title);
        expect(infoWrapper.prop('subtitle')).toEqual(
            expect.stringContaining(`#${props.issue.number}`)
        );
    });

    it('should render closed issue info', () => {
        const props = {
            ...defaultProps,
            issue: {...defaultProps.issue, state: 'closed', closed_at: new Date()}
        };
        const wrapper = shallow(<IssueListItem {...props} />);
        const infoWrapper = wrapper.find('ListItem');

        expect(infoWrapper.prop('leftIcon').name).toEqual('issue-closed');
        expect(infoWrapper.prop('title')).toEqual(props.issue.title);
        expect(infoWrapper.prop('subtitle')).toEqual(
            expect.stringContaining(`#${props.issue.number} by ${props.issue.user.login} was closed 1m ago`)
        );
    });

    it('should render merged pull request info', () => {
        const props = {
            ...defaultProps,
            type: undefined,
            issue: {...defaultProps.issue, state: 'merged', closed_at: new Date()}
        };
        const wrapper = shallow(<IssueListItem {...props} />);
        const infoWrapper = wrapper.find('ListItem');

        expect(infoWrapper.prop('leftIcon').name).toEqual('git-pull-request');
        expect(infoWrapper.prop('title')).toEqual(props.issue.title);
        expect(infoWrapper.prop('subtitle')).toEqual(
            expect.stringContaining(`#${props.issue.number} by ${props.issue.user.login} was closed 1m ago`)
        );
    });

    it('should render comments icon and counter', () => {
        const wrapper = shallow(<IssueListItem {...defaultProps} />);
    
        expect(wrapper.find('Icon')).toHaveLength(1);
        expect(wrapper.find('Text').contains(defaultProps.issue.comments)).toBe(true);
    });

    it('should open issue when pressing', () => {
        const navigation = { navigate: jest.fn() };
        const wrapper = shallow(<IssueListItem {...defaultProps} navigation={navigation} />);

        wrapper.simulate('press');
    
        expect(navigation.navigate).toHaveBeenCalledTimes(1);
        expect(navigation.navigate).toHaveBeenCalledWith('Issue', expect.anything());
    });
});