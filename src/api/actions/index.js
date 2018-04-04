import {
  createActionSet,
  createPaginationActionSet,
  createPaginationItemActionSet,
} from 'utils';

export const ACTIVITY_GET_EVENTS_RECEIVED = createPaginationActionSet(
  'ACTIVITY_GET_EVENTS_RECEIVED'
);
export const ACTIVITY_GET_STARRED_REPOS_FOR_USER = createPaginationActionSet(
  'ACTIVITY_GET_STARRED_REPOS_FOR_USER'
);
export const ORGS_GET_MEMBERS = createPaginationActionSet('ORGS_GET_MEMBERS');

export const ORGS_GET_BY_ID = createActionSet('ORGS_GET_BY_ID');

export const SEARCH_REPOS = createPaginationActionSet('SEARCH_REPOS');
export const SEARCH_USERS = createPaginationActionSet('SEARCH_USERS');

export const ISSUES_GET = createActionSet('ISSUES_GET');
export const ISSUES_GET_EVENTS = createPaginationActionSet('ISSUES_GET_EVENTS');
export const ISSUES_GET_COMMENTS = createPaginationActionSet(
  'ISSUES_GET_COMMENTS'
);

export const ISSUES_CREATE_COMMENT = createPaginationItemActionSet(
  'ISSUE_CREATE_COMMENT',
  ISSUES_GET_COMMENTS
);
export const ISSUES_DELETE_COMMENT = createPaginationItemActionSet(
  'ISSUE_DELETE_COMMENT',
  ISSUES_GET_COMMENTS
);
export const ISSUES_EDIT_COMMENT = createPaginationItemActionSet(
  'ISSUE_EDIT_COMMENT',
  ISSUES_GET_COMMENTS
);

export const ISSUES_EDIT = createActionSet('ISSUE_EDIT_COMMENT');
