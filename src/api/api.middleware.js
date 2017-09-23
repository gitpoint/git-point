import has from 'lodash/has';

import { callApi } from '../api/api.client';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, types } = callAPI;
  const { schema } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }

  if (typeof types === 'object') {
    if (
      !has(types, 'PENDING') ||
      !has(types, 'SUCCESS') ||
      !has(types, 'ERROR')
    ) {
      throw new Error('Expected an object containing the three action types.');
    }
    types = [types.PENDING, types.SUCCESS, types.ERROR];
  } else if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  } else if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const accessToken = store.getState().auth.accessToken;

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);

    delete finalAction[CALL_API];

    return finalAction;
  };

  const [requestType, successType, failureType] = types;

  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema, accessToken).then(
    response =>
      next(
        actionWith({
          response,
          type: successType,
        })
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          error: error.message || 'Something bad happened',
        })
      )
  );
};
