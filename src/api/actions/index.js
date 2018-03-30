import { createPaginationActionSet } from 'utils';

export const ACTIVITY_GET_EVENTS_RECEIVED = createPaginationActionSet(
  'ACTIVITY_GET_EVENTS_RECEIVED'
);
export const ACTIVITY_GET_STARRED_REPOS_FOR_USER = createPaginationActionSet(
  'ACTIVITY_GET_STARRED_REPOS_FOR_USER'
);
export const SEARCH_REPOS = createPaginationActionSet('SEARCH_REPOS');
export const SEARCH_USERS = createPaginationActionSet('SEARCH_USERS');
