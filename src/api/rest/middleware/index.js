import { performApiCall } from '../providers/github/client';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'CALL_THIS_MIDDLEWARE';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const apiCallParameters = action[CALL_API];

  if (typeof apiCallParameters === 'undefined') {
    return next(action);
  }

  let { endpoint } = apiCallParameters;
  const { types, schema, normalizrKey = null } = apiCallParameters;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }

  if (typeof types !== 'object') {
    throw new Error('Expected an object containing the three action types.');
  }

  const accessToken = store.getState().auth.accessToken;

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);

    delete finalAction[CALL_API];

    return finalAction;
  };

  next(actionWith({ type: types.PENDING }));

  return performApiCall(endpoint, {}, schema, accessToken, normalizrKey).then(
    response =>
      next(
        actionWith({
          response,
          type: types.SUCCESS,
        })
      ),
    error =>
      next(
        actionWith({
          type: types.ERROR,
          error: error.message || 'Something bad happened',
        })
      )
  );
};
