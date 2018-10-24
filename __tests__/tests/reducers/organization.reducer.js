import {
  GET_ORG_REPOS,
  GET_ORG_REPOS_LOADING,
  GET_ORG_REPOS_ERROR,
} from 'organization/organization.constants';
import {
  initialState,
  organizationReducer,
} from 'organization/organization.reducer';

describe('Organization Reducer', () => {
  it('should set initial state', () => {
    expect(organizationReducer(undefined, {})).toEqual(initialState);
  });

  [true, false].forEach(payload => {
    it(`should set loading state to ${JSON.stringify(
      payload
    )} on action "GET_ORG_REPOS_LOADING"`, () => {
      const action = { type: GET_ORG_REPOS_LOADING, payload };
      const expectedState = { ...initialState, isPendingRepos: action.payload };

      expect(organizationReducer(initialState, action)).toEqual(expectedState);
    });
  });

  [{ id: 1 }, { id: 2 }].forEach(payload => {
    it('should set repos on success on action "GET_ORG_REPOS"', () => {
      const action = { type: GET_ORG_REPOS, payload };
      const expectedState = {
        ...initialState,
        isPendingRepos: false,
        repositories: payload,
      };

      expect(organizationReducer(initialState, action)).toEqual(expectedState);
    });
  });

  it('should set error state on action "GET_ORG_REPOS_ERROR"', () => {
    const action = { type: GET_ORG_REPOS_ERROR, payload: 'error' };
    const expectedState = {
      ...initialState,
      organizationRepositoriesError: action.payload,
    };

    expect(organizationReducer(initialState, action)).toEqual(expectedState);
  });
});
