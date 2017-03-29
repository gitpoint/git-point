import {
  GET_ORG_IS_PENDING,
  GET_ORG_WAS_SUCCESSFUL,
  GET_ORG_HAD_ERROR,
  GET_ORG_REPOS_IS_PENDING,
  GET_ORG_REPOS_WAS_SUCCESSFUL,
  GET_ORG_REPOS_HAD_ERROR,
  GET_ORG_MEMBERS_IS_PENDING,
  GET_ORG_MEMBERS_WAS_SUCCESSFUL,
  GET_ORG_MEMBERS_HAD_ERROR
} from '../constants';

const initialState = {
  organization: {},
  repositories: [],
  members: [],
  isPendingOrg: false,
  isPendingRepos: false,
  isPendingMembers: false,
  error: '',
}

export default function organizationReducer(state = initialState, action={}) {
  switch (action.type) {
      case GET_ORG_IS_PENDING:
        return {
          ...state,
          isPendingOrg: true,
        };
      case GET_ORG_WAS_SUCCESSFUL:
        return {
          ...state,
          organization: action.payload,
          isPendingOrg: false,
        };
      case GET_ORG_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingOrg: false,
        };
      case GET_ORG_REPOS_IS_PENDING:
        return {
          ...state,
          isPendingRepos: true,
        };
      case GET_ORG_REPOS_WAS_SUCCESSFUL:
        return {
          ...state,
          repositories: action.payload,
          isPendingRepos: false,
        };
      case GET_ORG_REPOS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingRepos: false,
        };
      case GET_ORG_MEMBERS_IS_PENDING:
        return {
          ...state,
          isPendingMembers: true,
        };
      case GET_ORG_MEMBERS_WAS_SUCCESSFUL:
        return {
          ...state,
          members: action.payload,
          isPendingMembers: false,
        };
      case GET_ORG_MEMBERS_HAD_ERROR:
        return {
          ...state,
          error: action.payload,
          isPendingMembers: false,
        };
      default:
        return state;
  }
}
