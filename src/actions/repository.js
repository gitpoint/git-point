import {
  GET_REPOSITORY_IS_PENDING,
  GET_REPOSITORY_WAS_SUCCESSFUL,
  GET_REPOSITORY_HAD_ERROR,
  GET_REPOSITORY_CONTRIBUTORS_IS_PENDING,
  GET_REPOSITORY_CONTRIBUTORS_WAS_SUCCESSFUL,
  GET_REPOSITORY_CONTRIBUTORS_HAD_ERROR,
  GET_REPOSITORY_CONTENTS_IS_PENDING,
  GET_REPOSITORY_CONTENTS_WAS_SUCCESSFUL,
  GET_REPOSITORY_CONTENTS_HAD_ERROR,
  GET_REPOSITORY_ISSUES_IS_PENDING,
  GET_REPOSITORY_ISSUES_WAS_SUCCESSFUL,
  GET_REPOSITORY_ISSUES_HAD_ERROR,
  GET_REPOSITORY_README_IS_PENDING,
  GET_REPOSITORY_README_WAS_SUCCESSFUL,
  GET_REPOSITORY_README_HAD_ERROR,
  GET_REPOSITORY_LABELS_IS_PENDING,
  GET_REPOSITORY_LABELS_WAS_SUCCESSFUL,
  GET_REPOSITORY_LABELS_HAD_ERROR,
  SEARCH_OPEN_ISSUES_IS_PENDING,
  SEARCH_OPEN_ISSUES_WAS_SUCCESSFUL,
  SEARCH_OPEN_ISSUES_HAD_ERROR,
  SEARCH_CLOSED_ISSUES_IS_PENDING,
  SEARCH_CLOSED_ISSUES_WAS_SUCCESSFUL,
  SEARCH_CLOSED_ISSUES_HAD_ERROR,
  SEARCH_OPEN_PULLS_IS_PENDING,
  SEARCH_OPEN_PULLS_WAS_SUCCESSFUL,
  SEARCH_OPEN_PULLS_HAD_ERROR,
  SEARCH_CLOSED_PULLS_IS_PENDING,
  SEARCH_CLOSED_PULLS_WAS_SUCCESSFUL,
  SEARCH_CLOSED_PULLS_HAD_ERROR,
} from '../constants';

import {fetchUrl, fetchUrlPreview, fetchReadMe, fetchSearch} from '../api';

export const getRepository = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_REPOSITORY_IS_PENDING});

    fetchUrl(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const getContributors = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_REPOSITORY_CONTRIBUTORS_IS_PENDING});

    fetchUrl(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_CONTRIBUTORS_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_CONTRIBUTORS_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const getContents = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_REPOSITORY_CONTENTS_IS_PENDING});

    fetchUrl(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_CONTENTS_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_CONTENTS_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const getIssues = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_REPOSITORY_ISSUES_IS_PENDING});

    fetchUrlPreview(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_ISSUES_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_ISSUES_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const getReadMe = (user, repository) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_REPOSITORY_README_IS_PENDING});

    fetchReadMe(user, repository, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_README_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_README_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const getLabels = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: GET_REPOSITORY_LABELS_IS_PENDING});

    fetchUrl(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPOSITORY_LABELS_WAS_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPOSITORY_LABELS_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const searchOpenRepoIssues = (query, repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: SEARCH_OPEN_ISSUES_IS_PENDING});

    return fetchSearch('issues', query, accessToken, `+repo:${repoFullName}+type:issue+state:open&sort=created`)
      .then(data => {
        dispatch({
          type: SEARCH_OPEN_ISSUES_WAS_SUCCESSFUL,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_OPEN_ISSUES_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const searchClosedRepoIssues = (query, repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: SEARCH_CLOSED_ISSUES_IS_PENDING});

    return fetchSearch('issues', query, accessToken, `+repo:${repoFullName}+type:issue+state:closed&sort=created`)
      .then(data => {
        dispatch({
          type: SEARCH_CLOSED_ISSUES_WAS_SUCCESSFUL,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_CLOSED_ISSUES_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const searchOpenRepoPulls = (query, repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: SEARCH_OPEN_PULLS_IS_PENDING});

    return fetchSearch('issues', query, accessToken, `+repo:${repoFullName}+type:pr+state:open&sort=created`)
      .then(data => {
        dispatch({
          type: SEARCH_OPEN_PULLS_WAS_SUCCESSFUL,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_OPEN_PULLS_HAD_ERROR,
          payload: error,
        });
      });
  };
};

export const searchClosedRepoPulls = (query, repoFullName) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({type: SEARCH_CLOSED_PULLS_IS_PENDING});

    return fetchSearch('issues', query, accessToken, `+repo:${repoFullName}+type:pr+state:closed&sort=created`)
      .then(data => {
        dispatch({
          type: SEARCH_CLOSED_PULLS_WAS_SUCCESSFUL,
          payload: data.items,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_CLOSED_PULLS_HAD_ERROR,
          payload: error,
        });
      });
  };
};