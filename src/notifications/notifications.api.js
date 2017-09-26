import { v3 } from 'api';

export const fetchNotifications = (participating, all, accessToken) =>
  v3.getJson(
    `/notifications?participating=${participating}&all=${all}`,
    accessToken
  );

export const fetchMarkNotificationAsRead = (notificationID, accessToken) =>
  v3.patch(`/notifications/threads/${notificationID}`, accessToken);

export const fetchMarkRepoNotificationAsRead = (repoFullName, accessToken) =>
  v3.put(`/repos/${repoFullName}/notifications`, accessToken);
