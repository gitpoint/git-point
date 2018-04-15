import {
  fetchMergeStatus,
  fetchMergePullRequest,
  fetchSubmitNewIssue,
  v3,
} from 'api';
import {
  GET_ISSUE_DIFF,
  GET_ISSUE_MERGE_STATUS,
  GET_PULL_REQUEST_FROM_URL,
  MERGE_PULL_REQUEST,
  GET_ISSUE_FROM_URL,
  SUBMIT_NEW_ISSUE,
} from './issue.type';

const getDiff = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ISSUE_DIFF.PENDING });

    return v3
      .getDiff(url, accessToken)
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

const getPullRequest = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_PULL_REQUEST_FROM_URL.PENDING });

    return v3
      .getJson(url, accessToken)
      .then(pr => {
        dispatch({
          type: GET_PULL_REQUEST_FROM_URL.SUCCESS,
          payload: pr,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_PULL_REQUEST_FROM_URL.ERROR,
          payload: error,
        });
      });
  };
};

const getPullRequestDetails = issue => {
  return (dispatch, getState) => {
    const repoFullName = getState().repository.repository.full_name;

    dispatch(getPullRequest(issue.pull_request.url));
    dispatch(getDiff(issue.pull_request.url));
    dispatch(getMergeStatus(repoFullName, issue.number));
  };
};

export const getIssueFromUrl = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_ISSUE_FROM_URL.PENDING });

    return v3
      .getFull(url, accessToken)
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

export const submitNewIssue = (owner, repo, issueTitle, issueComment) => {
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
