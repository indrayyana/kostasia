import moment from 'moment';
import * as tokenService from '@/services/token';

const userOneId = '4f7feb78-4342-4be3-bfd5-090dac08b309';
const adminId = 'ed0695cf-24e7-44a3-b86c-86e0786eeb23';

const accessTokenExpires = moment().add(180, 'minute');
export const userOneAccessToken = tokenService.generateToken(userOneId, 'penyewa', accessTokenExpires, 'access');
export const adminAccessToken = tokenService.generateToken(adminId, 'admin', accessTokenExpires, 'access');

