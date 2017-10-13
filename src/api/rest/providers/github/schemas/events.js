import { schema } from 'normalizr';
import { initSchema, toTimestamp } from 'utils';

import { userSchema } from './users';
import { orgSchema } from './orgs';
import { repoSchema } from './repos';

export const eventSchema = new schema.Entity(
  'events',
  {
    actor: userSchema,
    org: orgSchema,
    repo: repoSchema,
  },
  {
    idAttribute: event => event.id,
    processStrategy: entity => {
      const processed = initSchema();

      processed.id = entity.id;
      processed.type = entity.type; // TODO: needs to be normalized in an Enum
      processed.payload = entity.payload; // TODO: needs to be inspected for more nested entities (forkee)
      processed.createdAt = toTimestamp(entity.created_at);

      processed.actor = entity.actor;
      processed.org = entity.org;
      processed.repo = entity.repo;

      return processed;
    },
  }
);
