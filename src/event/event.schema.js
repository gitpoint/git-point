import { schema } from 'normalizr';
// import omit from 'lodash/omit';

import { userSchema } from '../user/user.schema';
import { repoSchema } from '../repository/repository.schema';

export const eventSchema = new schema.Entity('events', {
  actor: userSchema,
  repo: repoSchema,
  payload: {
    forkee: repoSchema,
    member: userSchema,
  },
});
