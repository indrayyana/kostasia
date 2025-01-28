import { RoleType } from './user';

export type TokenType = 'access' | 'refresh' | 'notification';

export interface JWTPayload {
  sub: string;
  role: RoleType;
  iat: number;
  exp: number;
  type: TokenType;
}

