import {
  GET_ISSUE_COMMENTS_IS_PENDING,
  GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
  GET_ISSUE_COMMENTS_HAD_ERROR,
  POST_ISSUE_COMMENT_IS_PENDING,
  POST_ISSUE_COMMENT_WAS_SUCCESSFUL,
  POST_ISSUE_COMMENT_HAD_ERROR,
  HYDRATE_ISSUE_DESC_IS_PENDING,
  HYDRATE_ISSUE_DESC_WAS_SUCCESSFUL,
  HYDRATE_ISSUE_DESC_HAD_ERROR,
  HYDRATE_COMMENT_IS_PENDING,
  HYDRATE_COMMENT_WAS_SUCCESSFUL,
  HYDRATE_COMMENT_HAD_ERROR,
  CREATE_ISSUE_REACTION_IS_PENDING,
  CREATE_ISSUE_REACTION_WAS_SUCCESSFUL,
  CREATE_ISSUE_REACTION_HAD_ERROR,
  CREATE_COMMENT_REACTION_IS_PENDING,
  CREATE_COMMENT_REACTION_WAS_SUCCESSFUL,
  CREATE_COMMENT_REACTION_HAD_ERROR,
  DELETE_COMMENT_REACTION_IS_PENDING,
  DELETE_COMMENT_REACTION_WAS_SUCCESSFUL,
  DELETE_COMMENT_REACTION_HAD_ERROR,
  DELETE_ISSUE_REACTION_IS_PENDING,
  DELETE_ISSUE_REACTION_WAS_SUCCESSFUL,
  DELETE_ISSUE_REACTION_HAD_ERROR,
  EDIT_ISSUE_IS_PENDING,
  EDIT_ISSUE_WAS_SUCCESSFUL,
  EDIT_ISSUE_HAD_ERROR,
  CHANGE_LOCK_STATUS_IS_PENDING,
  CHANGE_LOCK_STATUS_WAS_SUCCESSFUL,
  CHANGE_LOCK_STATUS_HAD_ERROR,
  GET_ISSUE_DIFF_IS_PENDING,
  GET_ISSUE_DIFF_WAS_SUCCESSFUL,
  GET_ISSUE_DIFF_HAD_ERROR
} from '../constants';

import {
  fetchDiff,
  fetchUrlPreview,
  fetchPostIssueComment,
  fetchCreateIssueReaction,
  fetchCreateCommentReaction,
  fetchDeleteReaction,
  fetchEditIssue,
  fetchChangeIssueLockStatus,
} from '../api';

const getIssueComments = issue => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_ISSUE_COMMENTS_IS_PENDING, payload: issue});

    return fetchUrlPreview(issue.comments_url, accessToken)
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

const hydrateIssueDesc = issue => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: HYDRATE_ISSUE_DESC_IS_PENDING});

    return fetchUrlPreview(issue.reactions.url, accessToken)
      .then(data => {
        dispatch({
          type: HYDRATE_ISSUE_DESC_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: HYDRATE_ISSUE_DESC_HAD_ERROR,
          payload: error,
        });
      });
  };
};

const hydrateComment = comment => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: HYDRATE_COMMENT_IS_PENDING});

    return fetchUrlPreview(comment.reactions.url, accessToken)
      .then(data => {
        dispatch({
          type: HYDRATE_COMMENT_WAS_SUCCESSFUL,
          commentID: comment.id,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: HYDRATE_COMMENT_HAD_ERROR,
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

export const getHydratedComments = issue => {
  return (dispatch, getState) => {
    return dispatch(getIssueComments(issue)).then(() => {
      const comments = getState().issue.comments;

      dispatch(hydrateIssueDesc(issue));

      comments
        .filter(comment => comment.reactions.total_count > 0)
        .forEach(comment => {
          return dispatch(hydrateComment(comment));
        });
    });
  };
};

export const createIssueReaction = (
  type,
  issueNum,
  commentID,
  owner,
  repoName
) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: CREATE_ISSUE_REACTION_IS_PENDING, payload: commentID});

    return fetchCreateIssueReaction(
      type,
      issueNum,
      owner,
      repoName,
      accessToken
    )
      .then(data => {
        dispatch({
          type: CREATE_ISSUE_REACTION_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: CREATE_ISSUE_REACTION_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const createCommentReaction = (type, commentID, owner, repoName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: CREATE_COMMENT_REACTION_IS_PENDING, payload: commentID});

    return fetchCreateCommentReaction(
      type,
      commentID,
      owner,
      repoName,
      accessToken
    )
      .then(data => {
        dispatch({
          type: CREATE_COMMENT_REACTION_WAS_SUCCESSFUL,
          commentID: commentID,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: CREATE_COMMENT_REACTION_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const deleteIssueReaction = reactionID => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: DELETE_ISSUE_REACTION_IS_PENDING});

    return fetchDeleteReaction(reactionID, accessToken)
      .then(() => {
        dispatch({
          type: DELETE_ISSUE_REACTION_WAS_SUCCESSFUL,
          reactionID: reactionID,
        });
      })
      .catch(error => {
        dispatch({
          type: DELETE_ISSUE_REACTION_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const deleteCommentReaction = (commentID, reactionID) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: DELETE_COMMENT_REACTION_IS_PENDING});

    return fetchDeleteReaction(reactionID, accessToken)
      .then(() => {
        dispatch({
          type: DELETE_COMMENT_REACTION_WAS_SUCCESSFUL,
          commentID: commentID,
          reactionID: reactionID,
        });
      })
      .catch(error => {
        dispatch({
          type: DELETE_COMMENT_REACTION_HAD_ERROR,
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
