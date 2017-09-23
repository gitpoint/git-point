export * from '../event/event.type';
export * from '../repository/repository.type';
export * from '../user/user.type';

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
});
