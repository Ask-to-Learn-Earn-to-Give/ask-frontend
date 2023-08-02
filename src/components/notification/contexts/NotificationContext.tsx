'use client';

import { createContext, useContext } from 'react';

export type NotificationContextProps = {
  openNotificationDrawer: boolean;
  onToggleNotificationDrawer: VoidFunction;
  onCloseNotificationDrawer: VoidFunction;
  notifications: Notification[];
  addNewNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
};

const NotificationContext = createContext({} as NotificationContextProps);

export const useNotificationContext = () => useContext(NotificationContext);

export default NotificationContext;
