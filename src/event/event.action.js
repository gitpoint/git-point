import has from 'lodash/has';

import { EVENTS } from './event.type';
import { Schemas } from './../api/api.schema';
import { CALL_API } from '../api/api.middleware';

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

  if (event && requiredFields.every(key => has(event, key))) {
    return null;
  }

  return dispatch(_fetchEvents(login));
};
