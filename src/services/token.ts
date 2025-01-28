import { jwtVerify, SignJWT } from 'jose';
import moment, { Moment } from 'moment';
import httpStatus from 'http-status';

import prisma from '@/lib/prisma';
import { config } from '@/utils/config';
import { TokenType } from '@/types/token';
import { RoleType } from '@/types/user';
import ApiError from '@/utils/ApiError';

export const secretKey = new TextEncoder().encode(config.jwt.secret);

const tokenService = {
  generateToken: async (
    userId: string,
    role: RoleType,
    expires: Moment,
    type: TokenType
  ): Promise<string> => {
    const token = await new SignJWT({ sub: userId, role, type })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expires.unix())
      .sign(secretKey);

    return token;
  },

  saveToken: async (
    token: string,
    userId: string,
    expires: Moment | null,
    type: TokenType
  ) => {
    await tokenService.deleteToken(userId, type);

    return await prisma.token.create({
      data: {
        token,
        user_id: userId,
        expires: expires ? expires.toDate() : null,
        type,
      },
    });
  },

  deleteToken: async (userId: string, type: TokenType) => {
    return await prisma.token.deleteMany({
      where: { user_id: userId, type },
    });
  },

  verifyToken: async (token: string, type: TokenType) => {
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
  },

  generateAuthTokens: async (user: { id: string; role: RoleType }) => {
    const accessTokenExpires = moment().add(
      config.jwt.accessExpirationMinutes,
      'minutes'
    );
    const accessToken = await tokenService.generateToken(
      user.id,
      user.role,
      accessTokenExpires,
      'access'
    );

    const refreshTokenExpires = moment().add(
      config.jwt.refreshExpirationDays,
      'days'
    );
    const refreshToken = await tokenService.generateToken(
      user.id,
      user.role,
      refreshTokenExpires,
      'refresh'
    );
    await tokenService.saveToken(
      refreshToken,
      user.id,
      refreshTokenExpires,
      'refresh'
    );

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
  },

  getNotificationToken: async (userId: string) => {
    const token = await prisma.token.findFirst({
      where: {
        user_id: userId,
        type: 'notification',
      },
      select: {
        token: true,
      },
    });

    if (!token) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
    }

    return token;
  },

  getAllNotificationToken: async () => {
    const token = await prisma.token.findMany({
      where: {
        type: 'notification',
      },
      select: {
        token: true,
        user: {
          select: {
            nama: true,
          },
        },
      },
    });

    return token;
  },
};

export default tokenService;

