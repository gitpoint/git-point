import { userSchema } from '../user/user.schema';
import { repoSchema } from '../repository/repository.schema';
import { eventSchema } from '../event/event.schema';

// Schemas for Github API responses.
export const Schemas = {
  EVENT: eventSchema,
  EVENT_ARRAY: [eventSchema],
  USER: userSchema,
  USER_ARRAY: [userSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema],
};
