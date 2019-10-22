import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  GET_ORG_REPOS_LOADING,
  GET_ORG_REPOS_ERROR,
  GET_ORG_REPOS,
} from 'organization/organization.constants';
import { fetchOrganizationRepos } from 'organization/organization.action';
import { v3 } from 'api';

const store = configureStore([thunk])({ auth: { accessToken: 'ABCXYZ' } });

jest.mock('api', () => ({
  v3: {
    getJson: jest.fn(),
  },
}));

describe('fetchOrganizationRepos()', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('should return a success response', async () => {
    const expectedData = { name: 'organization' };

    v3.getJson.mockResolvedValueOnce(expectedData);
    await store.dispatch(fetchOrganizationRepos(''));

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: GET_ORG_REPOS_LOADING,
          payload: true,
        },
        {
          type: GET_ORG_REPOS_ERROR,
          payload: '',
        },
        {
          type: GET_ORG_REPOS,
          payload: expectedData,
        },
      ])
    );

    expect(store.getActions()).not.toEqual(
      expect.arrayContaining([
        {
          type: GET_ORG_REPOS_LOADING,
          payload: false,
        },
        {
          type: GET_ORG_REPOS_ERROR,
          payload: expectedData,
        },
      ])
    );
  });

  it('should return an error response', async () => {
    const expectedData = { error: 'no organization' };

    v3.getJson.mockRejectedValueOnce(expectedData);
    await store.dispatch(fetchOrganizationRepos(''));

    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        {
          type: GET_ORG_REPOS_LOADING,
          payload: true,
        },
        {
          type: GET_ORG_REPOS_LOADING,
          payload: false,
        },
        {
          type: GET_ORG_REPOS_ERROR,
          payload: '',
        },
        {
          type: GET_ORG_REPOS_ERROR,
          payload: expectedData,
        },
      ])
    );

    expect(store.getActions()).not.toEqual(
      expect.arrayContaining([
        {
          type: GET_ORG_REPOS,
          payload: expectedData,
        },
      ])
    );
  });
});
