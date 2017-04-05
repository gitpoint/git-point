import {
  GET_ISSUE_COMMENTS_IS_PENDING,
  GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
  GET_ISSUE_COMMENTS_HAD_ERROR,
  POST_ISSUE_COMMENT_IS_PENDING,
  POST_ISSUE_COMMENT_WAS_SUCCESSFUL,
  POST_ISSUE_COMMENT_HAD_ERROR
} from '../constants';

import { fetchUrlPreview, fetchPostIssueComment } from '../api';

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

export const postIssueComment = (body, owner, repoName, issueNum) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: POST_ISSUE_COMMENT_IS_PENDING });

    fetchPostIssueComment(body, owner, repoName, issueNum, accessToken).then(data => {
      dispatch({
        type: POST_ISSUE_COMMENT_WAS_SUCCESSFUL,
        payload: data,
      });
    })
    .catch(error => {
      dispatch({
        type: POST_ISSUE_COMMENT_HAD_ERROR,
        payload: error,
      })
    })
  };
};
