'use client';

import { MessagePayload, onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { messaging } from '@/utils/firebase';
import useFCMToken from './useFCMToken';
import Toast from '@/components/Toast';

const useFCM = () => {
  const fcmToken = useFCMToken();
  const [messages, setMessages] = useState<MessagePayload[]>([]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const fcmMessaging = messaging();
      const unsubscribe = onMessage(fcmMessaging, (payload) => {
        Toast(
          payload.notification?.title,
          payload.notification?.body,
          payload.notification?.image
        );

        setMessages((message) => [...message, payload]);
      });

      return () => unsubscribe();
    }
  }, [fcmToken]);

  return { fcmToken, messages };
};

export default useFCM;

