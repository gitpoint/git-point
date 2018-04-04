import { eventSchema } from './events';
import { repoSchema } from './repos';
import { orgSchema } from './orgs';
import { userSchema } from './users';
import { issueSchema } from './issues';
import { issueCommentSchema } from './issue-comments';
import { issueEventSchema } from './issue-events';

export default {
  EVENT: eventSchema,
  EVENT_ARRAY: [eventSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema],
  USER: userSchema,
  USER_ARRAY: [userSchema],
  ORG: orgSchema,
  ORG_ARRAY: [orgSchema],
  ISSUE: issueSchema,
  ISSUE_ARRAY: [issueSchema],
  ISSUE_COMMENT: issueCommentSchema,
  ISSUE_COMMENT_ARRAY: [issueCommentSchema],
  ISSUE_EVENT: issueEventSchema,
  ISSUE_EVENT_ARRAY: [issueEventSchema],
};
