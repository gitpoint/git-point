import { fetchSearch } from 'api';
import { SEARCH_REPOS, SEARCH_USERS } from './search.type';

export const searchRepos = query => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: SEARCH_REPOS.PENDING });

    return fetchSearch('repositories', query, accessToken)
      .then(data => {
        dispatch({
          type: SEARCH_REPOS.SUCCESS,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_REPOS.ERROR,
          payload: error,
        });
      });
  };
};

export const searchUsers = query => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: SEARCH_USERS.PENDING });

    return fetchSearch('users', query, accessToken)
      .then(data => {
        dispatch({
          type: SEARCH_USERS.SUCCESS,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_USERS.ERROR,
          payload: error,
        });
      });
  };
};
