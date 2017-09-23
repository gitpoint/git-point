import { schema } from 'normalizr';
import omit from 'lodash/omit';

export const userSchema = new schema.Entity(
  'users',
  {},
  {
    idAttribute: user => user.login.toLowerCase(),
    processStrategy: entity =>
      omit(entity, [
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
  }
);
