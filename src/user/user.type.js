import { createActionSet } from 'utils';

export const GET_USER = createActionSet('GET_USER');
export const GET_ORGS = createActionSet('GET_ORGS');
export const GET_IS_FOLLOWING = createActionSet('GET_IS_FOLLOWING');
export const GET_IS_FOLLOWER = createActionSet('GET_IS_FOLLOWER');
export const GET_REPOSITORIES = createActionSet('GET_REPOSITORIES');
export const GET_FOLLOWERS = createActionSet('GET_FOLLOWERS');
export const GET_FOLLOWING = createActionSet('GET_FOLLOWING');
export const SEARCH_USER_REPOS = createActionSet('SEARCH_USER_REPOS');
export const CHANGE_FOLLOW_STATUS = createActionSet('CHANGE_FOLLOW_STATUS');
export const GET_STAR_COUNT = createActionSet('GET_STAR_COUNT');

// New API
export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

export const STARRED_REQUEST = 'STARRED_REQUEST';
export const STARRED_SUCCESS = 'STARRED_SUCCESS';
export const STARRED_FAILURE = 'STARRED_FAILURE';

export const FOLLOWERS_REQUEST = 'FOLLOWERS_REQUEST';
export const FOLLOWERS_SUCCESS = 'FOLLOWERS_SUCCESS';
export const FOLLOWERS_FAILURE = 'FOLLOWERS_FAILURE';
