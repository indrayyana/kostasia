import { errors, JWTPayload, jwtVerify } from 'jose';
import httpStatus from 'http-status';
import ApiError from './ApiError';
import { secretKey } from '@/services/token';

const verifyToken = async (token: string): Promise<JWTPayload> => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    if (payload.type !== 'access') {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }

    return payload;
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    } else if (error instanceof errors.JWSSignatureVerificationFailed) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }

    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

export default verifyToken;

