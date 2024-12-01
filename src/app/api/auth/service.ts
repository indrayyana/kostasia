import { jwtVerify, SignJWT } from 'jose';
import moment, { Moment } from 'moment';
import prisma from '@/lib/prisma';
import { config } from '@/utils/config';
import { roleType } from '@/types/user';

export const secretKey = new TextEncoder().encode(config.jwt.secret);

export const generateToken = async (
  userId: string,
  role: roleType,
  expires: Moment,
  type: string
): Promise<string> => {
  const token = await new SignJWT({ sub: userId, role, type })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expires.unix())
    .sign(secretKey);

  return token;
};

export const saveToken = async (
  token: string,
  userId: string,
  expires: Moment,
  type: string
) => {
  await deleteToken(userId);

  return await prisma.token.create({
    data: {
      token,
      user_id: userId,
      expires: expires.toDate(),
      type,
    },
  });
};

export const deleteToken = async (userId: string) => {
  return await prisma.token.deleteMany({
    where: { user_id: userId },
  });
};

export const verifyToken = async (token: string, type: string) => {
  const { payload } = await jwtVerify(token, secretKey);
  if (!payload) {
    throw new Error('Invalid token');
  }

  const tokenDoc = await prisma.token.findFirst({
    where: {
      token,
      type,
      user_id: payload.sub,
    },
  });

  if (!tokenDoc) {
    throw new Error('Token not found');
  }

  return tokenDoc;
};

export const generateAuthTokens = async (user: {
  id: string;
  role: roleType;
}) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = await generateToken(
    user.id,
    user.role,
    accessTokenExpires,
    'access'
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days'
  );
  const refreshToken = await generateToken(
    user.id,
    user.role,
    refreshTokenExpires,
    'refresh'
  );
  await saveToken(refreshToken, user.id, refreshTokenExpires, 'refresh');

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

