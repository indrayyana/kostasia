/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect, beforeEach } from 'vitest';
import httpStatus from 'http-status';
import { adminAccessToken, userOneAccessToken } from '../fixtures/token.fixture';
import app from '@/app/api/[...route]/app';
import { createUserBodyType, updateUserBodyType } from '@/validations/user';
import { admin, insertUsers, userOne, userTwo } from '../fixtures/user.fixture';
import { clearUsers } from '../utils/setupTestDB';
import { getUserById } from '@/services/user';

describe('User routes', () => {
  describe('POST /api/users', () => {
    let newUser: createUserBodyType;

    beforeEach(async () => {
      newUser = {
        nama: 'I Nyoman Testing',
        email: 'nyomantesting@gmail.com',
        telepon: '081234567890',
        role: 'penyewa',
      };
    });

    test(
      'should return 201 and successfully create new user if data is ok',
      async () => {
        await clearUsers();
        await insertUsers([admin]);

        const res = await app.request('/api/users', {
          method: 'POST',
          headers: {
            Cookie: `access-token=${await adminAccessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        expect(res.status).toBe(httpStatus.CREATED);

        const data = await res.json();

        expect(data).toEqual({
          code: httpStatus.CREATED,
          status: 'success',
          message: expect.any(String),
          user: expect.any(Object),
        });

        expect(data.user).toEqual({
          user_id: expect.any(String),
          nama: newUser.nama,
          email: newUser.email,
          telepon: newUser.telepon,
          role: newUser.role,
          foto: null,
          ktp: null,
          dibuat_pada: expect.any(String),
        });

        const dbUser = await getUserById(data.user.user_id);

        expect(dbUser).toBeDefined();
        expect(dbUser).toMatchObject({
          nama: newUser.nama,
          email: newUser.email,
          role: newUser.role,
          telepon: newUser.telepon,
        });
      },
      { timeout: 10000 }
    );

    test(
      'should be able to create an admin as well',
      async () => {
        await clearUsers();
        await insertUsers([admin]);

        newUser.role = 'admin';

        const res = await app.request('/api/users', {
          method: 'POST',
          headers: {
            Cookie: `access-token=${await adminAccessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });

        const data = await res.json();

        expect(data.user.role).toBe('admin');

        const dbUser = await getUserById(data.user.user_id);
        expect(dbUser?.role).toBe('admin');
      },
      { timeout: 10000 }
    );

    test('should return 401 error if access token is missing', async () => {
      await clearUsers();
      await insertUsers([admin]);

      const res = await app.request('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    });

    test('should return 403 error if logged in user is not admin', async () => {
      await clearUsers();
      await insertUsers([userOne]);

      const res = await app.request('/api/users', {
        method: 'POST',
        headers: {
          Cookie: `access-token=${await userOneAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      expect(res.status).toBe(httpStatus.FORBIDDEN);
    });

    test('should return 400 error if email is invalid', async () => {
      await clearUsers();
      await insertUsers([admin]);

      newUser.email = 'invalidEmail';

      const res = await app.request('/api/users', {
        method: 'POST',
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if email is already used', async () => {
      await clearUsers();
      await insertUsers([admin, userOne]);

      newUser.email = userOne.email;

      const res = await app.request('/api/users', {
        method: 'POST',
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });

    test('should return 400 error if role is neither pengunjung, penyewa nor admin', async () => {
      await clearUsers();
      await insertUsers([admin]);

      // @ts-expect-error off
      newUser.role = 'invalid';

      const res = await app.request('/api/users', {
        method: 'POST',
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET /api/users', () => {
    test('should return 200 and a list of users', async () => {
      await clearUsers();
      await insertUsers([admin, userOne, userTwo]);

      const res = await app.request('/api/users', {
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
        },
      });

      expect(res.status).toBe(httpStatus.OK);

      const data = await res.json();

      expect(data).toEqual({
        code: httpStatus.OK,
        status: 'success',
        message: expect.any(String),
        user: expect.any(Array),
      });

      data.user.forEach((usr) => {
        expect(usr).toEqual({
          user_id: expect.any(String),
          nama: expect.any(String),
          email: expect.any(String),
          telepon: expect.toBeOneOf([expect.any(String), null]),
          role: expect.toBeOneOf(['pengunjung', 'penyewa', 'admin']),
          foto: expect.toBeOneOf([expect.any(String), null]),
          ktp: expect.toBeOneOf([expect.any(String), null]),
          dibuat_pada: expect.any(String),
        });
      });
    });

    test('should return 401 if access token is missing', async () => {
      await clearUsers();
      await insertUsers([admin, userOne, userTwo]);

      const res = await app.request('/api/users');

      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    });

    test('should return 403 if a non-admin is trying to access all users', async () => {
      await clearUsers();
      await insertUsers([admin, userOne, userTwo]);

      const res = await app.request('/api/users', {
        headers: {
          Cookie: `access-token=${await userOneAccessToken}`,
        },
      });

      expect(res.status).toBe(httpStatus.FORBIDDEN);
    });
  });

  describe('GET /api/users/:userId', () => {
    test('should return 200 and the user object if data is ok', async () => {
      await clearUsers();
      await insertUsers([userOne]);

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        headers: {
          Cookie: `access-token=${await userOneAccessToken}`,
        },
      });

      expect(res.status).toBe(httpStatus.OK);

      const data = await res.json();

      expect(data).toEqual({
        code: httpStatus.OK,
        status: 'success',
        message: expect.any(String),
        user: expect.any(Object),
      });

      expect(data.user).toEqual({
        user_id: userOne.user_id,
        nama: userOne.nama,
        email: userOne.email,
        telepon: userOne.telepon,
        role: userOne.role,
        foto: userOne.foto,
        ktp: userOne.ktp,
        dibuat_pada: expect.any(String),
      });
    });

    test('should return 401 error if access token is missing', async () => {
      await clearUsers();
      await insertUsers([userOne]);

      const res = await app.request(`/api/users/${userOne.user_id}`);

      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    });

    test('should return 403 error if user is trying to get another user', async () => {
      await clearUsers();
      await insertUsers([userOne, userTwo]);

      const res = await app.request(`/api/users/${userTwo.user_id}`, {
        headers: {
          Cookie: `access-token=${await userOneAccessToken}`,
        },
      });

      expect(res.status).toBe(httpStatus.FORBIDDEN);
    });

    test('should return 200 and the user object if admin is trying to get another user', async () => {
      await clearUsers();
      await insertUsers([userOne, admin]);

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
        },
      });

      expect(res.status).toBe(httpStatus.OK);
    });

    test('should return 400 error if userId is not a valid uuid', async () => {
      await clearUsers();
      await insertUsers([admin]);

      const res = await app.request('/api/users/invalidId', {
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
        },
      });

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if user is not found', async () => {
      await clearUsers();
      await insertUsers([admin]);

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
        },
      });

      expect(res.status).toBe(httpStatus.NOT_FOUND);
    });
  });

  describe('PATCH /api/users/:userId', () => {
    test('should return 200 and successfully update user if data is ok', async () => {
      await clearUsers();
      await insertUsers([userOne]);

      const updateBody: updateUserBodyType = {
        nama: 'Putu edit',
        email: 'putuedit@gmail.com',
        telepon: '0878787878787',
      };

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        method: 'PATCH',
        headers: {
          Cookie: `access-token=${await userOneAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBody),
      });

      expect(res.status).toBe(httpStatus.OK);

      const data = await res.json();

      expect(data).toEqual({
        code: httpStatus.OK,
        status: 'success',
        message: expect.any(String),
        user: expect.any(Object),
      });

      expect(data.user).toEqual({
        user_id: userOne.user_id,
        nama: updateBody.nama,
        email: updateBody.email,
        telepon: updateBody.telepon,
        role: 'penyewa',
        foto: userOne.foto,
        ktp: userOne.ktp,
        dibuat_pada: expect.any(String),
      });

      const dbUser = await getUserById(userOne.user_id);
      expect(dbUser).toBeDefined();
      expect(dbUser).toMatchObject({
        nama: updateBody.nama,
        email: updateBody.email,
        telepon: updateBody.telepon,
        role: 'penyewa',
      });

      await clearUsers();
    });

    test('should return 401 error if access token is missing', async () => {
      await clearUsers();
      await insertUsers([userOne]);

      const updateBody: updateUserBodyType = {
        nama: 'Putu edit',
      };

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        method: 'PATCH',
        body: JSON.stringify(updateBody),
      });

      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    });

    test('should return 403 if user is updating another user', async () => {
      await clearUsers();
      await insertUsers([userOne, userTwo]);

      const updateBody: updateUserBodyType = {
        nama: 'Kadek edit',
      };

      const res = await app.request(`/api/users/${userTwo.user_id}`, {
        method: 'PATCH',
        headers: {
          Cookie: `access-token=${await userOneAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBody),
      });

      expect(res.status).toBe(httpStatus.FORBIDDEN);
    });

    test('should return 200 and successfully update user if admin is updating another user', async () => {
      await clearUsers();
      await insertUsers([userOne, admin]);

      const updateBody: updateUserBodyType = {
        nama: 'Putu edit',
      };

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        method: 'PATCH',
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBody),
      });

      expect(res.status).toBe(httpStatus.OK);
    });

    test('should return 404 if admin is updating another user that is not found', async () => {
      await clearUsers();
      await insertUsers([admin]);

      const updateBody: updateUserBodyType = {
        nama: 'Putu edit',
      };

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        method: 'PATCH',
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBody),
      });

      expect(res.status).toBe(httpStatus.NOT_FOUND);
    });

    test('should return 400 error if userId is not a valid uuid', async () => {
      await clearUsers();
      await insertUsers([admin]);

      const updateBody: updateUserBodyType = {
        nama: 'Putu edit',
      };

      const res = await app.request('/api/users/invalidId', {
        method: 'PATCH',
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBody),
      });

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if email is invalid', async () => {
      await clearUsers();
      await insertUsers([userOne]);

      const updateBody: updateUserBodyType = {
        email: 'invalidEmail',
      };

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        method: 'PATCH',
        headers: {
          Cookie: `access-token=${await userOneAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBody),
      });

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if email is already taken', async () => {
      await clearUsers();
      await insertUsers([userOne, userTwo]);

      const updateBody: updateUserBodyType = {
        email: userTwo.email,
      };

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        method: 'PATCH',
        headers: {
          Cookie: `access-token=${await userOneAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBody),
      });

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });
  });

  describe('DELETE /api/users/:userId', () => {
    test('should return 200 if data is ok', async () => {
      await clearUsers();
      await insertUsers([userOne]);

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        method: 'DELETE',
        headers: {
          Cookie: `access-token=${await userOneAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      expect(res.status).toBe(httpStatus.OK);

      const data = await res.json();

      expect(data).toEqual({
        code: httpStatus.OK,
        status: 'success',
        message: expect.any(String),
      });

      const dbUser = await getUserById(userOne.user_id);
      expect(dbUser).toBeNull();
    });

    test('should return 401 error if access token is missing', async () => {
      await clearUsers();
      await insertUsers([userOne]);

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        method: 'DELETE',
      });

      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    });

    test('should return 403 error if user is trying to delete another user', async () => {
      await clearUsers();
      await insertUsers([userOne, userTwo]);

      const res = await app.request(`/api/users/${userTwo.user_id}`, {
        method: 'DELETE',
        headers: {
          Cookie: `access-token=${await userOneAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      expect(res.status).toBe(httpStatus.FORBIDDEN);
    });

    test('should return 200 if admin is trying to delete another user', async () => {
      await clearUsers();
      await insertUsers([userOne, admin]);

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        method: 'DELETE',
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      expect(res.status).toBe(httpStatus.OK);
    });

    test('should return 400 error if userId is not a valid uuid', async () => {
      await clearUsers();
      await insertUsers([admin]);

      const res = await app.request('/api/users/invalidId', {
        method: 'DELETE',
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      expect(res.status).toBe(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if user already is not found', async () => {
      await clearUsers();
      await insertUsers([admin]);

      const res = await app.request(`/api/users/${userOne.user_id}`, {
        method: 'DELETE',
        headers: {
          Cookie: `access-token=${await adminAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      expect(res.status).toBe(httpStatus.NOT_FOUND);
    });
  });
});

