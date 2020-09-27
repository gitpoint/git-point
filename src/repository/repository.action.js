import { fetchDiff, fetchReadMe, v3 } from 'api';
import {
  GET_REPOSITORY_CONTENTS,
  GET_REPOSITORY_FILE,
  GET_REPOSITORY_COMMITS,
  GET_COMMIT,
  GET_COMMIT_DIFF,
  GET_REPOSITORY_README,
  GET_REPOSITORY_LABELS,
} from './repository.type';

export const getContents = (url, level) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORY_CONTENTS.PENDING });

    v3
      .getJson(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_CONTENTS.SUCCESS,
          results: data,
          level,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_CONTENTS.ERROR,
          payload: error,
        });
      });
  };
};

export const getRepositoryFile = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORY_FILE.PENDING });

    v3
      .getRaw(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_FILE.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_FILE.ERROR,
          payload: error,
        });
      });
  };
};

export const getCommits = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORY_COMMITS.PENDING });

    v3
      .getJson(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_COMMITS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_COMMITS.ERROR,
          payload: error,
        });
      });
  };
};

export const getCommitFromUrl = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_COMMIT.PENDING });

    v3
      .getJson(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_COMMIT.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_COMMIT.ERROR,
          payload: error,
        });
      });
  };
};

export const getCommitDiffFromUrl = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_COMMIT_DIFF.PENDING });

    fetchDiff(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_COMMIT_DIFF.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_COMMIT_DIFF.ERROR,
          payload: error,
        });
      });
  };
};

export const getCommitDetails = commit => {
  return dispatch => {
    const url = commit.url || commit.commit.url;

    dispatch(getCommitFromUrl(url));
    dispatch(getCommitDiffFromUrl(url));
  };
};

export const getReadMe = (user, repository) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORY_README.PENDING });

    fetchReadMe(user, repository, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_README.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_README.ERROR,
          payload: error,
        });
      });
  };
};

export const getLabels = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORY_LABELS.PENDING });

    v3
      .getJson(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_LABELS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_LABELS.ERROR,
          payload: error,
        });
      });
  };
};
