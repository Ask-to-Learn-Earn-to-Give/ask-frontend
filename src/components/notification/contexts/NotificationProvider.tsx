'use client';

import { useCallback, useState } from 'react';
import NotificationContext from './NotificationContext';

export type Props = {
  children: React.ReactNode;
};

export default function NotificationProvider({ children }: Props) {
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const onToggleNotificationDrawer = useCallback(() => {
    setOpenNotificationDrawer((prev) => !prev);
  }, []);

  const onCloseNotificationDrawer = useCallback(() => {
    setOpenNotificationDrawer(false);
  }, []);

  const addNewNotification = useCallback((notification: Notification) => {
    setNotifications((prevNotifications) => {
      const newNotifications = [...prevNotifications, notification];
      return newNotifications;
    });
  }, []);

  const removeNotification = useCallback((id: string) => {}, []);

  const markNotificationAsRead = useCallback((id: string) => {}, []);

  return (
    <NotificationContext.Provider
      value={{
        openNotificationDrawer,
        onToggleNotificationDrawer,
        onCloseNotificationDrawer,
        notifications,
        addNewNotification,
        removeNotification,
        markNotificationAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
