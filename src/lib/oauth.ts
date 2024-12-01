import { google } from 'googleapis';
import { config } from '../utils/config';

export const oauth2Client = new google.auth.OAuth2(
  config.oauth.clientId,
  config.oauth.clientSecret,
  config.oauth.redirectURL
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

export const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});

export { google };

