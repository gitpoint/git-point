import { schema } from 'normalizr';
import omit from 'lodash/omit';

import { userSchema } from '../user/user.schema';

/*
export const userSchema = new schema.Entity('users', {}, {
    idAttribute: user => user.login.toLowerCase(),
    processStrategy: entity => omit(entity, [
        'url',
        'html_url',
        'followers_url',
        'following_url',
        'gists_url',
        'starred_url',
        'subscriptions_url',
        'organizations_url',
        'repos_url',
        'events_url',
        'received_events_url',
    ]),
});*/

export const repoSchema = new schema.Entity(
  'repos',
  {
    owner: userSchema,
  },
  {
    idAttribute: repo => {
      if (typeof repo.full_name === 'string') {
        return repo.full_name.toLowerCase();
      }

      // In Events
      return repo.name.toLowerCase();
    },
  }
);
