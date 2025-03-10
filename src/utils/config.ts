export const config = {
  app: {
    baseURL: `${process.env.BASE_URL}`,
    apiURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    dashboardURL: `${process.env.DASHBOARD_URL}`,
  },
  jwt: {
    secret: `${process.env.JWT_SECRET}`,
    accessExpirationMinutes: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}`,
    refreshExpirationDays: `${process.env.JWT_REFRESH_EXPIRATION_DAYS}`,
  },
  oauth: {
    clientId: `${process.env.GOOGLE_OAUTH_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_OAUTH_CLIENT_SECRET}`,
    redirectURL: `${process.env.GOOGLE_REDIRECT_URL}`,
  },
  firebase: {
    apiKey: `${process.env.API_KEY}`,
    authDomain: `${process.env.AUTH_DOMAIN}`,
    projectId: `${process.env.PROJECT_ID}`,
    storageBucket: `${process.env.STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`,
    appId: `${process.env.APP_ID}`,
    measurementId: `${process.env.MEASUREMENT_ID}`,
    type: `${process.env.TYPE}`,
    privateKey: `${process.env.PRIVATE_KEY?.replace(/\\n/g, '\n')}`,
    privateKeyId: `${process.env.PRIVATE_KEY_ID}`,
    clientEmail: `${process.env.CLIENT_EMAIL}`,
    clientId: `${process.env.CLIENT_ID}`,
    authUri: `${process.env.AUTH_URI}`,
    tokenUri: `${process.env.TOKEN_URI}`,
    authProviderCertUrl: `${process.env.AUTH_PROVIDER_CERT_URL}`,
    clientCertUrl: `${process.env.CLIENT_CERT_URL}`,
    universeDomain: `${process.env.UNIVERSE_DOMAIN}`,
    vapidKey: `${process.env.VAPID_KEY}`,
  },
  midtrans: {
    merchantId: `${process.env.MIDTRANS_MERCHANT_ID}`,
    clientKey: `${process.env.MIDTRANS_CLIENT_KEY}`,
    serverKey: `${process.env.MIDTRANS_SERVER_KEY}`,
    snapUrl: `${process.env.MIDTRANS_SNAP_URL}`,
  },
};

