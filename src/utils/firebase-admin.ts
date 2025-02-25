'use server';

import admin from 'firebase-admin';
import { config } from './config';

const serviceAccount = {
  type: config.firebase.type,
  projectId: config.firebase.projectId,
  privateKey: config.firebase.privateKey,
  privateKeyId: config.firebase.privateKeyId,
  clientEmail: config.firebase.clientEmail,
  clientId: config.firebase.clientId,
  authUri: config.firebase.authUri,
  tokenUri: config.firebase.tokenUri,
  authProviderCertUrl: config.firebase.authProviderCertUrl,
  clientCertUrl: config.firebase.clientCertUrl,
  universeDomain: config.firebase.universeDomain,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

interface notifPayload {
  judul?: string;
  text?: string;
}

export const sendPushNotification = async (
  token: string,
  payload: notifPayload
) => {
  const message: admin.messaging.Message = {
    notification: {
      title: payload.judul,
      body: payload.text,
      imageUrl: 'https://www.kostasia.com/assets/logo.png',
    },
    android: {
      notification: {
        icon: 'https://www.kostasia.com/assets/logo.png',
      },
    },
    token: token,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log('Notification Sent: ', message, response);
    })

    .catch((error) => {
      console.error('Error sending message: ', error);
    });
};

