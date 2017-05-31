import { createActionSet } from "utils";

export const GET_UNREAD_NOTIFICATIONS = createActionSet(
  "GET_UNREAD_NOTIFICATIONS"
);
export const GET_PARTICIPATING_NOTIFICATIONS = createActionSet(
  "GET_PARTICIPATING_NOTIFICATIONS"
);
export const GET_ALL_NOTIFICATIONS = createActionSet("GET_ALL_NOTIFICATIONS");
export const MARK_NOTIFICATION_AS_READ = createActionSet(
  "MARK_NOTIFICATION_AS_READ"
);
export const MARK_REPO_AS_READ = createActionSet("MARK_REPO_AS_READ");
