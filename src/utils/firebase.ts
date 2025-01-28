import { getMessaging } from 'firebase/messaging';
import { getApps, initializeApp, type FirebaseOptions } from 'firebase/app';
import { config } from './config';
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig: FirebaseOptions = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId,
};

// Initialize Firebase
const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const messaging = () => getMessaging(firebaseApp);

// const analytics = getAnalytics(app);
export default firebaseApp;

