import {
  GET_ISSUE_COMMENTS_IS_PENDING,
  GET_ISSUE_COMMENTS_WAS_SUCCESSFUL,
  GET_ISSUE_COMMENTS_HAD_ERROR,
  POST_ISSUE_COMMENT_IS_PENDING,
  POST_ISSUE_COMMENT_WAS_SUCCESSFUL,
  POST_ISSUE_COMMENT_HAD_ERROR,
  HYDRATE_ISSUE_COMMENTS_WITH_REACTIONS_PENDING,
  HYDRATE_ISSUE_COMMENTS_WITH_REACTIONS_WAS_SUCCESSFUL,
  HYDRATE_ISSUE_COMMENTS_WITH_REACTIONS_HAD_ERROR
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

export const hydrateIssueCommentsWithReactions = (comments) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: HYDRATE_ISSUE_COMMENTS_WITH_REACTIONS_PENDING });

    const hydratedComments = comments.map((comment) => {
      if (comment.reactions.total_count > 0) {
        fetchUrlPreview(comment.reactions.url, accessToken).then(reactionsData => {
          return {...comment, reactions: reactionsData};
        })
        .catch(error => {
          dispatch({
            type: HYDRATE_ISSUE_COMMENTS_WITH_REACTIONS_HAD_ERROR,
            payload: error,
          })
        });
      } else {
        return comment;
      }
    });

    if (hydratedComments.length === comments.length) {
      dispatch({
        type: HYDRATE_ISSUE_COMMENTS_WITH_REACTIONS_WAS_SUCCESSFUL,
        payload: hydratedComments,
      });
    }
  };
};

export const getHydratedComments = (url) => {
  return (dispatch, getState) => {
    return dispatch(getIssueComments(url)).then(() => {
      const comments = getState().issue.comments;
      return dispatch(hydrateIssueCommentsWithReactions(comments))
    })
  }
}
