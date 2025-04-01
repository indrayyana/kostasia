import moment from 'moment';
import { admin, userOne } from './user.fixture';
import { generateToken } from '@/services/token';

const accessTokenExpires = moment().add(180, 'minute');
export const userOneAccessToken = generateToken(userOne.user_id, 'penyewa', accessTokenExpires, 'access');
export const adminAccessToken = generateToken(admin.user_id, 'admin', accessTokenExpires, 'access');

