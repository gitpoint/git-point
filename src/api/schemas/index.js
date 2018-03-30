import { eventSchema } from './events';
import { repoSchema } from './repos';
import { userSchema } from './users';

export default {
  EVENT: eventSchema,
  EVENT_ARRAY: [eventSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema],
  USER: userSchema,
  USER_ARRAY: [userSchema],
};
