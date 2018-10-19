import { handleActions } from 'redux-actions';

import {
  GET_ORG_REPOS,
  GET_ORG_REPOS_LOADING,
  GET_ORG_REPOS_ERROR,
} from './organization.constants';

export const initialState = {
  organization: {},
  repositories: [],
  members: [],
  isPendingOrg: false,
  isPendingRepos: false,
  isPendingMembers: false,
  organizationError: '',
  organizationRepositoriesError: '',
  organizationMembersError: '',
};

export const organizationReducer = handleActions(
  {
    [GET_ORG_REPOS]: (state, { payload }) => {
      return {
        ...state,
        repositories: payload,
      };
    },
    [GET_ORG_REPOS_LOADING]: (state, { payload }) => {
      return {
        ...state,
        isPendingRepos: payload,
      };
    },
    [GET_ORG_REPOS_ERROR]: (state, { payload }) => {
      return {
        ...state,
        organizationRepositoriesError: payload,
      };
    },
  },
  initialState
);
