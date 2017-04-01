import {
  GET_ISSUE_COMMENTS_IS_PENDING,
  GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
  GET_ISSUE_COMMENTS_HAD_ERROR
} from '../constants';

import { fetchUrl } from '../api';

export const getIssueComments = (url) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ISSUE_COMMENTS_IS_PENDING });

    fetchUrl(url, accessToken).then(data => {
      dispatch({
        type: GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ISSUE_COMMENTS_HAD_ERROR,
        payload: error,
      })
    })
  };
};
