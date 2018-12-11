import { createActionSet, createPaginationActionSet } from 'utils';

export const ACTIVITY_GET_EVENTS_RECEIVED = createPaginationActionSet(
  'ACTIVITY_GET_EVENTS_RECEIVED'
);
export const ACTIVITY_GET_STARRED_REPOS_FOR_USER = createPaginationActionSet(
  'ACTIVITY_GET_STARRED_REPOS_FOR_USER'
);
export const ACTIVITY_STAR_REPO = createActionSet('ACTIVITY_STAR_REPO');
export const ACTIVITY_UNSTAR_REPO = createActionSet('ACTIVITY_UNSTAR_REPO');
export const ACTIVITY_WATCH_REPO = createActionSet('ACTIVITY_WATCH_REPO');
export const ACTIVITY_UNWATCH_REPO = createActionSet('ACTIVITY_UNWATCH_REPO');
export const SEARCH_REPOS = createPaginationActionSet('SEARCH_REPOS');
export const SEARCH_USERS = createPaginationActionSet('SEARCH_USERS');
export const SEARCH_ISSUES = createPaginationActionSet('SEARCH_ISSUES');
export const ORGS_GET_MEMBERS = createPaginationActionSet('ORGS_GET_MEMBERS');
export const ORGS_GET_BY_ID = createActionSet('ORGS_GET_BY_ID');

export const GRAPHQL_GET_REPO = createActionSet('GRAPHQL_GET_REPO');

export const REPOS_GET_CONTRIBUTORS = createPaginationActionSet(
  'REPOS_GET_CONTRIBUTORS'
);
export const REPOS_FORK = createActionSet('REPOS_FORK');
export const REPOS_GET_ISSUE = createActionSet('REPOS_GET_ISSUE');
export const REPOS_GET_ISSUE_TIMELINE = createPaginationActionSet(
  'REPOS_GET_ISSUE_TIMELINE'
);
