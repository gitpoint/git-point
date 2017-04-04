import {
  GET_ISSUE_COMMENTS_IS_PENDING,
  GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
  GET_ISSUE_COMMENTS_HAD_ERROR
} from '../constants';

import { fetchUrlPreview } from '../api';

export const getIssueComments = (url) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ISSUE_COMMENTS_IS_PENDING });

    fetchUrlPreview(url, accessToken).then(data => {
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
