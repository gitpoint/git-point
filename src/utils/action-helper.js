export const createActionSet = actionName => ({
  PENDING: `${actionName}_PENDING`,
  SUCCESS: `${actionName}_SUCCESS`,
  ERROR: `${actionName}_ERROR`,
  actionName,
});

export const createPaginationActionSet = actionName => ({
  ...createActionSet(actionName),
  RESET: `${actionName}_RESET`,
});
