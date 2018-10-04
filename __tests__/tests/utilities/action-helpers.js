import { createActionSet, createPaginationActionSet } from 'utils';

describe('Action Helpers', () => {
  it('should generate the right actions', () => {
    const result = createActionSet('FOO');

    expect(result).toMatchObject({
      PENDING: 'FOO_PENDING',
      SUCCESS: 'FOO_SUCCESS',
      ERROR: 'FOO_ERROR',
      actionName: 'FOO',
    });
  });

  it('should generate right pagination actions', () => {
    const result = createPaginationActionSet('BAR');

    expect(result).toMatchObject({
      PENDING: 'BAR_PENDING',
      SUCCESS: 'BAR_SUCCESS',
      ERROR: 'BAR_ERROR',
      RESET: 'BAR_RESET',
      actionName: 'BAR',
    });
  });
});
