export const config = {
  app: {
    baseURL: process.env.BASE_URL as string,
    apiURL: process.env.NEXT_PUBLIC_API_URL as string,
    dashboardURL: process.env.DASHBOARD_URL as string,
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
    accessExpirationMinutes: process.env
      .JWT_ACCESS_EXPIRATION_MINUTES as string,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS as string,
  },
  oauth: {
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    redirectURL: process.env.GOOGLE_REDIRECT_URL as string,
  },
};

