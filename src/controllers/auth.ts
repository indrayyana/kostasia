import httpStatus from 'http-status';
import { Context } from 'hono';
import { getCookie } from 'hono/cookie';
// import ApiError from '@/utils/ApiError';
import { ApiError, catchAsync } from '@/utils/catchAsyncHono';
import tokenService from '@/services/token';
import userService from '@/services/user';
import { RoleType } from '@/types/user';
import { setToken } from '@/utils/cookies';
import { authorizationUrl, google, oauth2Client } from '@/lib/oauth';
import { config } from '@/utils/config';

export const redirectGoogleLogin = catchAsync(async (c: Context) => {
  return c.redirect(authorizationUrl);
});

export const loginWithGoogle = catchAsync(async (c: Context) => {
  const code = c.req.query('code');
  if (!code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Authorization code is missing');
  }

  const { tokens: googleTokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(googleTokens);

  const { data } = await google
    .oauth2({ auth: oauth2Client, version: 'v2' })
    .userinfo.get();

  if (!data.email || !data.name) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Login failed');
  }

  // save user when first login
  let user = await userService.getUserByEmail(data.email);
  let userId;

  if (user) {
    userId = user.user_id;

    user = await userService.updateGoogleUserById(userId, data);
  } else {
    user = await userService.createGoogleUser(data);

    userId = user.user_id;
  }

  const authTokens = await tokenService.generateAuthTokens({
    id: userId,
    role: user.role as RoleType,
  });

  setToken(authTokens.access.token, authTokens.refresh.token);

  return c.redirect(config.app.dashboardURL);
});

export const logout = catchAsync(async (c: Context) => {
  const refreshToken = getCookie(c, 'refresh-token');
  if (!refreshToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }

  const tokenDoc = await tokenService.getTokenByType(refreshToken, 'refresh');
  if (!tokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
  }

  await tokenService.deleteToken(refreshToken);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Logout successfully',
  });
});

export const refreshTokens = catchAsync(async (c: Context) => {
  const refreshToken = getCookie(c, 'refresh-token');
  if (!refreshToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }

  const refreshTokenDoc = await tokenService.verifyToken(
    refreshToken,
    'refresh'
  );
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Token');
  }

  const user = await userService.getUserById(refreshTokenDoc.user_id);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Token');
  }

  const authTokens = await tokenService.generateAuthTokens({
    id: user.user_id,
    role: user.role as RoleType,
  });

  setToken(authTokens.access.token, authTokens.refresh.token);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    tokens: authTokens,
  });
});

