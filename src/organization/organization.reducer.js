import { handleActions } from 'redux-actions';

import {
  GET_ORG,
  GET_ORG_LOADING,
  GET_ORG_ERROR,
  GET_ORG_REPOS,
  GET_ORG_REPOS_LOADING,
  GET_ORG_REPOS_ERROR,
  GET_ORG_MEMBERS,
  GET_ORG_MEMBERS_LOADING,
  GET_ORG_MEMBERS_ERROR,
} from './organization.constants';

const initialState = {
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

export const organizationReducer = handleActions({
  [GET_ORG]: (state, { payload }) => {
    return {
      ...state,
      organization: payload,
    };
  },
  [GET_ORG_LOADING]: (state, { payload }) => {
    return {
      ...state,
      isPendingOrg: payload,
    };
  },
  [GET_ORG_ERROR]: (state, { payload }) => {
    return {
      ...state,
      organizationError: payload,
    };
  },
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
  [GET_ORG_MEMBERS]: (state, { payload }) => {
    return {
      ...state,
      members: payload,
    };
  },
  [GET_ORG_MEMBERS_LOADING]: (state, { payload }) => {
    return {
      ...state,
      isPendingMembers: payload,
    };
  },
  [GET_ORG_MEMBERS_ERROR]: (state, { payload }) => {
    return {
      ...state,
      organizationMembersError: payload,
    };
  },
}, initialState);

