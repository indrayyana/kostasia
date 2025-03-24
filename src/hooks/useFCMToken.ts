'use client';

import { getToken, isSupported } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { messaging } from '@/utils/firebase';
import useNotificationPermission from './useNotificationPermission';
import { config } from '@/utils/config';

const useFCMToken = () => {
  const permission = useNotificationPermission();
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        if (permission === 'granted') {
          const isFCMSupported = await isSupported();
          if (!isFCMSupported) return;

          const fcmToken = await getToken(messaging(), {
            vapidKey: config.firebase.vapidKey,
          });

          setFcmToken(fcmToken);
        }
      }
    };
    retrieveToken();
  }, [permission]);

  return fcmToken;
};

export default useFCMToken;

