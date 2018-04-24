import { fetchReadMe, fetchSearch, v3 } from 'api';
import {
  GET_REPOSITORY,
  GET_REPOSITORY_CONTRIBUTORS,
  GET_REPOSITORY_CONTENTS,
  GET_REPOSITORY_FILE,
  GET_REPOSITORY_ISSUES,
  GET_REPOSITORY_README,
  GET_REPOSITORY_LABELS,
  SEARCH_OPEN_ISSUES,
  SEARCH_CLOSED_ISSUES,
  SEARCH_OPEN_PULLS,
  SEARCH_CLOSED_PULLS,
} from './repository.type';

export const getRepository = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORY.PENDING });

    return v3
      .get(url, accessToken)
      .then(response => {
        return response
          .json()
          .then(
            json => (response.status === 200 ? json : Promise.reject(json))
          );
      })
      .then(data => {
        dispatch({
          type: GET_REPOSITORY.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY.ERROR,
          payload: error,
        });
      });
  };
};

export const getContributors = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORY_CONTRIBUTORS.PENDING });

    v3
      .getJson(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_CONTRIBUTORS.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_CONTRIBUTORS.ERROR,
          payload: error,
        });
      });
  };
};

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

export const getIssues = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORY_ISSUES.PENDING });

    v3
      .getJson(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_ISSUES.SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_ISSUES.ERROR,
          payload: error,
        });
      });
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

export const searchOpenRepoIssues = (query, repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: SEARCH_OPEN_ISSUES.PENDING });

    return fetchSearch(
      'issues',
      query,
      accessToken,
      `+repo:${repoFullName}+type:issue+state:open&sort=created`
    )
      .then(data => {
        dispatch({
          type: SEARCH_OPEN_ISSUES.SUCCESS,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_OPEN_ISSUES.ERROR,
          payload: error,
        });
      });
  };
};

export const searchClosedRepoIssues = (query, repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: SEARCH_CLOSED_ISSUES.PENDING });

    return fetchSearch(
      'issues',
      query,
      accessToken,
      `+repo:${repoFullName}+type:issue+state:closed&sort=created`
    )
      .then(data => {
        dispatch({
          type: SEARCH_CLOSED_ISSUES.SUCCESS,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_CLOSED_ISSUES.ERROR,
          payload: error,
        });
      });
  };
};

export const searchOpenRepoPulls = (query, repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: SEARCH_OPEN_PULLS.PENDING });

    return fetchSearch(
      'issues',
      query,
      accessToken,
      `+repo:${repoFullName}+type:pr+state:open&sort=created`
    )
      .then(data => {
        dispatch({
          type: SEARCH_OPEN_PULLS.SUCCESS,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_OPEN_PULLS.ERROR,
          payload: error,
        });
      });
  };
};

export const searchClosedRepoPulls = (query, repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: SEARCH_CLOSED_PULLS.PENDING });

    return fetchSearch(
      'issues',
      query,
      accessToken,
      `+repo:${repoFullName}+type:pr+state:closed&sort=created`
    )
      .then(data => {
        dispatch({
          type: SEARCH_CLOSED_PULLS.SUCCESS,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_CLOSED_PULLS.ERROR,
          payload: error,
        });
      });
  };
};
