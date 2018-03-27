import { eventSchema } from './events';
import { repoSchema } from './repos';

export default {
  EVENT: eventSchema,
  EVENT_ARRAY: [eventSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema],
};
