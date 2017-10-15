import { orgSchema } from './orgs';
import { userSchema } from './users';
import { repoSchema } from './repos';
import { eventSchema } from './events';
import { notificationSchema } from './notifications';

export default {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  ORG: orgSchema,
  ORG_ARRAY: [orgSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema],
  EVENT: eventSchema,
  EVENT_ARRAY: [eventSchema],
  NOTIFICATION: notificationSchema,
  NOTIFICATION_ARRAY: [notificationSchema],
};
