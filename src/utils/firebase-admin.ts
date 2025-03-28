'use server';

import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { config } from './config';
import { updateUserById } from '@/services/user';

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
    storageBucket: 'gs://kost-asia.firebasestorage.app',
  });
}

interface notifPayload {
  judul?: string;
  deskripsi?: string;
}

export const sendPushNotification = async (token: string, payload: notifPayload) => {
  const message: admin.messaging.Message = {
    notification: {
      title: payload.judul,
      body: payload.deskripsi,
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
      console.log('Notification Sent', response);
    })

    .catch((error) => {
      console.log('Error sending notification', { message: error });
    });
};

export const uploadImageFile = async (userId: string, folderName: 'profile' | 'ktp', file: File) => {
  const bucket = admin.storage().bucket();

  if (!file) {
    throw new Error('No file uploaded');
  }

  const validTypes = [
    'image/apng',
    'image/avif',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
  ];

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds the maximum limit of 5MB');
  }

  const downloadToken = uuidv4();
  const fileName = `${folderName}/${userId}`;

  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: downloadToken,
    },
    contentType: file.type,
    cacheControl: 'public, max-age=31536000',
  };

  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream({
    metadata,
    gzip: true,
  });

  return new Promise((resolve, reject) => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    blobStream.on('error', (err) => {
      reject(new Error('Unable to upload image'));
    });

    blobStream.on('finish', async () => {
      try {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
          blob.name
        )}?alt=media&token=${downloadToken}`;

        if (folderName === 'ktp') {
          await updateUserById(userId, {
            ktp: imageUrl,
          });
        } else {
          await updateUserById(userId, {
            foto: imageUrl,
          });
        }

        resolve(imageUrl);
      } catch (err) {
        reject(err);
      }
    });

    file.arrayBuffer().then((buffer) => {
      blobStream.end(Buffer.from(buffer));
    });
  });
};

