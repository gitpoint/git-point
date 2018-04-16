import {
  fetchReadMe,
  fetchSearch,
  fetchChangeStarStatusRepo,
  fetchForkRepo,
  watchRepo,
  unWatchRepo,
  v3,
} from 'api';
import {
  GET_REPOSITORY_CONTENTS,
  GET_REPOSITORY_FILE,
  GET_REPOSITORY_ISSUES,
  FORK_REPO_STATUS,
  CHANGE_STAR_STATUS,
  GET_REPOSITORY_README,
  GET_REPOSITORY_LABELS,
  SEARCH_OPEN_ISSUES,
  SEARCH_CLOSED_ISSUES,
  SEARCH_OPEN_PULLS,
  SEARCH_CLOSED_PULLS,
  GET_REPOSITORY_SUBSCRIBED_STATUS,
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

export const unSubscribeToRepo = (owner, repo) => (dispatch, getState) => {
  const accessToken = getState().auth.accessToken;

  dispatch({
    type: GET_REPOSITORY_SUBSCRIBED_STATUS.PENDING,
  });

  return unWatchRepo(owner, repo, accessToken)
    .then(data => data.json())
    .then(() => {
      dispatch({
        type: GET_REPOSITORY_SUBSCRIBED_STATUS.SUCCESS,
        payload: false,
      });
    })
    .catch(() => {
      dispatch({
        type: GET_REPOSITORY_SUBSCRIBED_STATUS.ERROR,
      });
    });
};

export const changeStarStatusRepo = (owner, repo, starred) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: CHANGE_STAR_STATUS.PENDING });

    fetchChangeStarStatusRepo(owner, repo, starred, accessToken)
      .then(() => {
        dispatch({
          type: CHANGE_STAR_STATUS.SUCCESS,
          payload: !starred,
        });
      })
      .catch(error => {
        dispatch({
          type: CHANGE_STAR_STATUS.ERROR,
          payload: error,
        });
      });
  };
};

export const subscribeToRepo = (owner, repo) => (dispatch, getState) => {
  const accessToken = getState().auth.accessToken;

  dispatch({
    type: GET_REPOSITORY_SUBSCRIBED_STATUS.PENDING,
  });

  return watchRepo(owner, repo, accessToken)
    .then(data => data.json())
    .then(result => {
      dispatch({
        type: GET_REPOSITORY_SUBSCRIBED_STATUS.SUCCESS,
        payload: result.subscribed,
      });
    })
    .catch(() => {
      dispatch({
        type: GET_REPOSITORY_SUBSCRIBED_STATUS.ERROR,
      });
    });
};

export const forkRepo = (owner, repo) => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: FORK_REPO_STATUS.PENDING });

    return fetchForkRepo(owner, repo, accessToken)
      .then(data => {
        return data.json();
      })
      .then(json => {
        dispatch({
          type: FORK_REPO_STATUS.SUCCESS,
          payload: true,
        });

        return json;
      })
      .catch(error => {
        dispatch({
          type: FORK_REPO_STATUS.ERROR,
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
