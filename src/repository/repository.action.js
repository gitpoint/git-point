import {
  fetchUrl,
  fetchUrlNormal,
  fetchUrlFile,
  fetchCommentHTML,
  fetchReadMe,
  fetchSearch,
  fetchChangeStarStatusRepo,
  fetchForkRepo,
  watchRepo,
  unWatchRepo,
} from 'api';
import {
  GET_REPOSITORY,
  GET_REPOSITORY_CONTRIBUTORS,
  GET_REPOSITORY_CONTENTS,
  GET_REPOSITORY_FILE,
  GET_REPOSITORY_ISSUES,
  GET_REPO_STARRED_STATUS,
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

export const getRepository = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORY.PENDING });

    return fetchUrl(url, accessToken)
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

    fetchUrl(url, accessToken)
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

    fetchUrl(url, accessToken)
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

    fetchUrlFile(url, accessToken)
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

    fetchCommentHTML(url, accessToken)
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

export const checkRepoStarred = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPO_STARRED_STATUS.PENDING });

    fetchUrlNormal(url, accessToken)
      .then(data => {
        dispatch({
          type: GET_REPO_STARRED_STATUS.SUCCESS,
          payload: !(data.status === 404),
        });
      })
      .catch(error => {
        dispatch({
          type: GET_REPO_STARRED_STATUS.ERROR,
          payload: error,
        });
      });
  };
};

export const checkRepoSubscribed = url => {
  return (dispatch, getState) => {
    const accessToken = getState().auth.accessToken;

    dispatch({ type: GET_REPOSITORY_SUBSCRIBED_STATUS.PENDING });

    fetchUrlNormal(url, accessToken)
      .then(data =>
        dispatch({
          type: GET_REPOSITORY_SUBSCRIBED_STATUS.SUCCESS,
          payload: !(data.status === 404),
        })
      )
      .catch(error =>
        dispatch({
          type: GET_REPOSITORY_SUBSCRIBED_STATUS.ERROR,
          error,
        })
      );
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

export const getRepositoryInfo = url => {
  return (dispatch, getState) => {
    return dispatch(getRepository(url)).then(() => {
      const repo = getState().repository.repository;
      const contributorsUrl = getState().repository.repository.contributors_url;
      const issuesUrl = getState().repository.repository.issues_url.replace(
        '{/number}',
        '?state=all&per_page=100'
      );

      dispatch(getContributors(contributorsUrl));
      dispatch(getIssues(issuesUrl));
      dispatch(
        checkRepoStarred(
          `https://api.github.com/user/starred/${repo.owner.login}/${repo.name}`
        )
      );
      dispatch(
        checkRepoSubscribed(
          `https://api.github.com/repos/${repo.owner
            .login}/${repo.name}/subscription`
        )
      );
    });
  };
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
  const isSubscribed = getState().repository.subscribed;

  dispatch({
    type: GET_REPOSITORY_SUBSCRIBED_STATUS.PENDING,
  });

  return watchRepo(!isSubscribed, owner, repo, accessToken)
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

    fetchUrl(url, accessToken)
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
