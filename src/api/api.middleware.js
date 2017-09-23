import { userSchema } from '../user/user.schema';
import { repoSchema } from '../repository/repository.schema';
import { eventSchema } from '../event/event.schema';
import { callApi } from '../api/api.client';

// Schemas for Github API responses.
export const Schemas = {
  EVENT: eventSchema,
  EVENT_ARRAY: [eventSchema],
  USER: userSchema,
  USER_ARRAY: [userSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema],
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
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
