import { GET_ORG, GET_ORG_REPOS, GET_ORG_MEMBERS } from './organization.type';

const initialState = {
  organization: {},
  repositories: [],
  members: [],
  isPendingOrg: false,
  isPendingRepos: false,
  isPendingMembers: false,
  error: '',
};

export const organizationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ORG.PENDING:
      return {
        ...state,
        isPendingOrg: true,
      };
    case GET_ORG.SUCCESS:
      return {
        ...state,
        organization: action.payload,
        isPendingOrg: false,
      };
    case GET_ORG.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingOrg: false,
      };
    case GET_ORG_REPOS.PENDING:
      return {
        ...state,
        isPendingRepos: true,
      };
    case GET_ORG_REPOS.SUCCESS:
      return {
        ...state,
        repositories: action.payload,
        isPendingRepos: false,
      };
    case GET_ORG_REPOS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingRepos: false,
      };
    case GET_ORG_MEMBERS.PENDING:
      return {
        ...state,
        isPendingMembers: true,
      };
    case GET_ORG_MEMBERS.SUCCESS:
      return {
        ...state,
        members: action.payload,
        isPendingMembers: false,
      };
    case GET_ORG_MEMBERS.ERROR:
      return {
        ...state,
        error: action.payload,
        isPendingMembers: false,
      };
    default:
      return state;
  }
};
