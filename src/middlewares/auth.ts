import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import httpStatus from 'http-status';
import ApiError from '@/utils/ApiError';
import * as userService from '@/services/user';
import { RoleRights } from '@/utils/roles';
import verifyToken from '@/utils/verifyToken';

const auth = (requiredRights?: string | string[]) => {
  return async (c: Context, next: Next) => {
    const token = getCookie(c, 'access-token');
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }

    const payload = await verifyToken(token);

    const user = await userService.getUserById(payload.sub as string);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }

    c.set('user', user);

    const rights = typeof requiredRights === 'string' ? [requiredRights] : requiredRights || [];

    if (rights.length > 0) {
      const userRights = RoleRights[user.role] || [];
      const hasRequiredRights = rights.every((right) => userRights.includes(right));

      if (!hasRequiredRights) {
        throw new ApiError(httpStatus.FORBIDDEN, "You don't have permission to access this resource");
      }
    }

    await next();
  };
};

export default auth;

