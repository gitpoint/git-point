import {
  GET_ISSUE_COMMENTS,
  POST_ISSUE_COMMENT,
  EDIT_ISSUE,
  CHANGE_LOCK_STATUS,
  GET_ISSUE_DIFF,
  GET_ISSUE_FROM_URL
} from './issue.type';

import {
  fetchDiff,
  fetchCommentHTML,
  fetchPostIssueComment,
  fetchEditIssue,
  fetchChangeIssueLockStatus
} from 'api';

export const getIssueComments = issue => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_ISSUE_COMMENTS.PENDING, payload: issue});

    return fetchCommentHTML(issue.comments_url, accessToken)
      .then(data => {
        dispatch({
          type: GET_ISSUE_COMMENTS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ISSUE_COMMENTS.ERROR,
          payload: error,
        });
      });
  };
};


export const postIssueComment = (body, owner, repoName, issueNum) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: POST_ISSUE_COMMENT.PENDING});

    return fetchPostIssueComment(body, owner, repoName, issueNum, accessToken)
      .then(data => {
        dispatch({
          type: POST_ISSUE_COMMENT.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: POST_ISSUE_COMMENT.ERROR,
          payload: error,
        });
      });
  };
};

export const editIssue = (owner, repoName, issueNum, editParams, updateParams) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: EDIT_ISSUE.PENDING});

    return fetchEditIssue(owner, repoName, issueNum, editParams, updateParams, accessToken)
      .then(() => {
        dispatch({
          type: EDIT_ISSUE.SUCCESS,
          payload: updateParams,
        });
      })
      .catch(error => {
        dispatch({
          type: EDIT_ISSUE.ERROR,
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

    dispatch({type: CHANGE_LOCK_STATUS.PENDING});

    return fetchChangeIssueLockStatus(
      owner,
      repoName,
      issueNum,
      currentStatus,
      accessToken
    )
      .then(() => {
        dispatch({
          type: CHANGE_LOCK_STATUS.SUCCESS,
        });
      })
      .catch(error => {
        dispatch({
          type: CHANGE_LOCK_STATUS.ERROR,
          payload: error,
        });
      });
  };
};

export const getDiff = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_ISSUE_DIFF.PENDING});

    return fetchDiff(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_ISSUE_DIFF.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ISSUE_DIFF.ERROR,
          payload: error,
        });
      });
  };
};

export const getIssueFromUrl = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_ISSUE_FROM_URL.PENDING});

    return fetchCommentHTML(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_ISSUE_FROM_URL.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ISSUE_FROM_URL.ERROR,
          payload: error,
        });
      });
  };
};
