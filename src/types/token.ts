import { roleType } from './user';

export interface JWTPayload {
  sub: string;
  role: roleType;
  iat: number;
  exp: number;
  type: string;
}

