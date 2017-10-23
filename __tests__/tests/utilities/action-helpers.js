import { createActionSet } from 'utils';

describe('Action Helpers', () => {
  it('should generate the right actions', () => {
    const result = createActionSet('FOO');

    expect(result).toMatchObject({
      PENDING: 'FOO_PENDING',
      SUCCESS: 'FOO_SUCCESS',
      ERROR: 'FOO_ERROR',
    });
  });
});
