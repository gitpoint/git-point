import { createActionSet, createPaginationActionSet } from 'utils';

export const ACTIVITY_GET_EVENTS_RECEIVED = createPaginationActionSet(
  'ACTIVITY_GET_EVENTS_RECEIVED'
);
export const ACTIVITY_GET_STARRED_REPOS_FOR_USER = createPaginationActionSet(
  'ACTIVITY_GET_STARRED_REPOS_FOR_USER'
);
export const SEARCH_REPOS = createPaginationActionSet('SEARCH_REPOS');
export const SEARCH_USERS = createPaginationActionSet('SEARCH_USERS');
export const ORGS_GET_MEMBERS = createPaginationActionSet('ORGS_GET_MEMBERS');
export const ORGS_GET_BY_ID = createActionSet('ORGS_GET_BY_ID');
