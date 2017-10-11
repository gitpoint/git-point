import { schema } from 'normalizr';
import moment from 'moment/min/moment.min';

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
      const processed = {};

      processed.id = entity.id;
      processed.type = entity.type; // TODO: needs to be normalized in an Enum
      processed.payload = entity.payload; // TODO: needs to be inspected for more nested entities (forkee)
      processed.createdAt = moment(entity.created_at).format('X'); // as unix timestamp

      processed.actor = entity.actor;
      processed.org = entity.org;
      processed.repo = entity.repo;

      // These flags should be in all our schemas.
      processed._isComplete = true; // entity not fully fetched yet
      processed._isAuth = false; // entity doesn't belong to the auth user
      processed._entityUrl = false; // The github url for the entity. To be used in openInBrowser()
      processed._fetchedAt = moment().format('X');

      return processed;
    },
  }
);
