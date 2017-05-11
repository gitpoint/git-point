import {
  GET_ISSUE_COMMENTS_IS_PENDING,
  GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
  GET_ISSUE_COMMENTS_HAD_ERROR,
  POST_ISSUE_COMMENT_IS_PENDING,
  POST_ISSUE_COMMENT_WAS_SUCCESSFUL,
  POST_ISSUE_COMMENT_HAD_ERROR,
  EDIT_ISSUE_IS_PENDING,
  EDIT_ISSUE_WAS_SUCCESSFUL,
  EDIT_ISSUE_HAD_ERROR,
  CHANGE_LOCK_STATUS_IS_PENDING,
  CHANGE_LOCK_STATUS_WAS_SUCCESSFUL,
  CHANGE_LOCK_STATUS_HAD_ERROR,
  GET_ISSUE_DIFF_IS_PENDING,
  GET_ISSUE_DIFF_WAS_SUCCESSFUL,
  GET_ISSUE_DIFF_HAD_ERROR,
  GET_ISSUE_FROM_URL_IS_PENDING,
  GET_ISSUE_FROM_URL_WAS_SUCCESSFUL,
  GET_ISSUE_FROM_URL_HAD_ERROR
} from '../constants';

import {
  fetchDiff,
  fetchCommentHTML,
  fetchPostIssueComment,
  fetchEditIssue,
  fetchChangeIssueLockStatus
} from '../api';

export const getIssueComments = issue => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_ISSUE_COMMENTS_IS_PENDING, payload: issue});

    return fetchCommentHTML(issue.comments_url, accessToken)
      .then(data => {
        dispatch({
          type: GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ISSUE_COMMENTS_HAD_ERROR,
          payload: error,
        });
      });
  };
};


export const postIssueComment = (body, owner, repoName, issueNum) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: POST_ISSUE_COMMENT_IS_PENDING});

    return fetchPostIssueComment(body, owner, repoName, issueNum, accessToken)
      .then(data => {
        dispatch({
          type: POST_ISSUE_COMMENT_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: POST_ISSUE_COMMENT_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const editIssue = (owner, repoName, issueNum, editParams, updateParams) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: EDIT_ISSUE_IS_PENDING});

    return fetchEditIssue(owner, repoName, issueNum, editParams, updateParams, accessToken)
      .then(() => {
        dispatch({
          type: EDIT_ISSUE_WAS_SUCCESSFUL,
          payload: updateParams,
        });
      })
      .catch(error => {
        dispatch({
          type: EDIT_ISSUE_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const changeIssueLockStatus = (
  owner,
  repoName,
  issueNum,
  currentStatus
) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: CHANGE_LOCK_STATUS_IS_PENDING});

    return fetchChangeIssueLockStatus(
      owner,
      repoName,
      issueNum,
      currentStatus,
      accessToken
    )
      .then(() => {
        dispatch({
          type: CHANGE_LOCK_STATUS_WAS_SUCCESSFUL,
        });
      })
      .catch(error => {
        dispatch({
          type: CHANGE_LOCK_STATUS_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const getDiff = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_ISSUE_DIFF_IS_PENDING});

    return fetchDiff(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_ISSUE_DIFF_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ISSUE_DIFF_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const getIssueFromUrl = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_ISSUE_FROM_URL_IS_PENDING});

    return fetchCommentHTML(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_ISSUE_FROM_URL_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ISSUE_FROM_URL_HAD_ERROR,
          payload: error,
        });
      });
  };
};
