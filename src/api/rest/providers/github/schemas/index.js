import { orgSchema } from './orgs';
import { userSchema } from './users';
import { repoSchema } from './repos';
import { eventSchema } from './events';

export default {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  ORG: orgSchema,
  ORG_ARRAY: [orgSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema],
  EVENT: eventSchema,
  EVENT_ARRAY: [eventSchema],
};
