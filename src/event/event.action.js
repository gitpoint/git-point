import has from 'lodash/has';

import { EVENTS_REQUEST, EVENTS_SUCCESS, EVENTS_FAILURE } from './event.type';

import { CALL_API, Schemas } from '../api/api.middleware';

/** NEW API */

const _fetchEvents = login => ({
  [CALL_API]: {
    types: [EVENTS_REQUEST, EVENTS_SUCCESS, EVENTS_FAILURE],
    endpoint: `users/${login}/received_events`,
    schema: Schemas.EVENT_ARRAY,
  },
});

export const loadEvents = (login, requiredFields = []) => (
  dispatch,
  getState
) => {
  const event = getState().entities.events[login];

  if (event && requiredFields.every(key => has(event, key))) {
    return null;
  }

  return dispatch(_fetchEvents(login));
};
