import { eventSchema } from './events';
import { repoSchema } from './repos';
import { orgSchema } from './orgs';
import { userSchema } from './users';

export default {
  EVENT: eventSchema,
  EVENT_ARRAY: [eventSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema],
  USER: userSchema,
  USER_ARRAY: [userSchema],
  ORG: orgSchema,
  ORG_ARRAY: [orgSchema],
};
