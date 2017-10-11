import { CALL_API } from 'api/rest/middleware';
import * as Actions from 'api/rest/actions/activity';

import Schemas from '../schemas';
import { handlePaginatedApi } from '../client';

const _getEvents = (id, nextPageUrl) => ({
  id,
  [CALL_API]: {
    types: Actions.ACTIVITY_GET_EVENTS,
    endpoint: nextPageUrl,
    schema: Schemas.EVENT_ARRAY,
  },
});

export const getEventsReceived = (userId, options) => {
  return handlePaginatedApi(
    `users/${userId}/received_events`,
    { name: 'eventsByUser', key: userId, call: _getEvents },
    options
  );
};
