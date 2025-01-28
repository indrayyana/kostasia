importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyDGKdrlSzjZVejAjyf5L7kGPz7NdDfdc3E',
  authDomain: 'kost-asia.firebaseapp.com',
  projectId: 'kost-asia',
  storageBucket: 'kost-asia.firebasestorage.app',
  messagingSenderId: '12716216162',
  appId: '1:12716216162:web:e616e22a34d988ecebe63b',
  measurementId: 'G-FN5GBZDNFY',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

