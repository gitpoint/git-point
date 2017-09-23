import has from 'lodash/has';

import { EVENTS } from './event.type';

import { CALL_API, Schemas } from '../api/api.middleware';

/** NEW API */

const _fetchEvents = login => ({
  [CALL_API]: {
    types: EVENTS,
    endpoint: `users/${login}/received_events`,
    schema: Schemas.EVENT_ARRAY,
  },
});

export const loadEvents = (login, requiredFields = []) => (
  dispatch,
  getState
) => {
  const event = getState().entities.events[login];

  console.log(EVENTS);

  if (event && requiredFields.every(key => has(event, key))) {
    return null;
  }

  return dispatch(_fetchEvents(login));
};
