import {
  fetchDiff,
  fetchMergeStatus,
  fetchCommentHTML,
  fetchPostIssueComment,
  fetchEditIssue,
  fetchChangeIssueLockStatus,
  fetchMergePullRequest,
  fetchSubmitNewIssue,
} from 'api';
import {
  GET_ISSUE_COMMENTS,
  POST_ISSUE_COMMENT,
  EDIT_ISSUE,
  CHANGE_LOCK_STATUS,
  GET_ISSUE_DIFF,
  GET_ISSUE_MERGE_STATUS,
  MERGE_PULL_REQUEST,
  GET_ISSUE_FROM_URL,
  SUBMIT_NEW_ISSUE,
} from './issue.type';

const getDiff = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ISSUE_DIFF.PENDING });

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

const getMergeStatus = (repo, issueNum) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ISSUE_MERGE_STATUS.PENDING });

    return fetchMergeStatus(repo, issueNum, accessToken)
      .then(data => {
        dispatch({
          type: GET_ISSUE_MERGE_STATUS.SUCCESS,
          payload: data.status === 204,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ISSUE_MERGE_STATUS.ERROR,
          payload: error,
        });
      });
  };
};

const getPullRequestDetails = issue => {
  return (dispatch, getState) => {
    const repoFullName = getState().repository.repository.full_name;

    dispatch(getDiff(issue.pull_request.diff_url));
    dispatch(getMergeStatus(repoFullName, issue.number));
  };
};

export const getIssueComments = issueCommentsURL => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ISSUE_COMMENTS.PENDING });

    return fetchCommentHTML(`${issueCommentsURL}?per_page=100`, accessToken)
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

    dispatch({ type: POST_ISSUE_COMMENT.PENDING });

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

export const editIssue = (
  owner,
  repoName,
  issueNum,
  editParams,
  updateParams
) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: EDIT_ISSUE.PENDING });

    return fetchEditIssue(
      owner,
      repoName,
      issueNum,
      editParams,
      updateParams,
      accessToken
    )
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

    dispatch({ type: CHANGE_LOCK_STATUS.PENDING });

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

export const getIssueFromUrl = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ISSUE_FROM_URL.PENDING });

    return fetchCommentHTML(url, accessToken)
      .then(issue => {
        dispatch({
          type: GET_ISSUE_FROM_URL.SUCCESS,
          payload: issue,
        });

        if (issue.pull_request) {
          dispatch(getPullRequestDetails(issue));
        }
      })
      .catch(error => {
        dispatch({
          type: GET_ISSUE_FROM_URL.ERROR,
          payload: error,
        });
      });
  };
};

export const mergePullRequest = (
  repo,
  issueNum,
  commitTitle,
  commitMessage,
  mergeMethod
) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: MERGE_PULL_REQUEST.PENDING });

    return fetchMergePullRequest(
      repo,
      issueNum,
      commitTitle,
      commitMessage,
      mergeMethod,
      accessToken
    )
      .then(data => {
        dispatch({
          type: MERGE_PULL_REQUEST.SUCCESS,
          payload: data.ok,
        });
      })
      .catch(error => {
        dispatch({
          type: MERGE_PULL_REQUEST.ERROR,
          payload: error,
        });
      });
  };
};

export const submitNewIssue = (
  owner,
  repo,
  issueTitle,
  issueComment
) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: SUBMIT_NEW_ISSUE.PENDING });

    return fetchSubmitNewIssue(
      owner,
      repo,
      issueTitle,
      issueComment,
      accessToken
    )
      .then(issue => {
        dispatch({
          type: SUBMIT_NEW_ISSUE.SUCCESS,
          payload: issue,
        });

        return issue;
      })
      .catch(error => {
        dispatch({
          type: SUBMIT_NEW_ISSUE.ERROR,
          payload: error,
        });
      });
  };
};
