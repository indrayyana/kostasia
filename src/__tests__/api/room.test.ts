/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect } from 'vitest';
import httpStatus from 'http-status';
import { adminAccessToken, userOneAccessToken } from '../fixtures/token.fixture';
import app from '@/app/api/[...route]/app';

describe('Room routes', () => {
  describe('GET /api/rooms', () => {
    test('should return 200 and a list of rooms', async () => {
      const res = await app.request('/api/rooms', {
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
        kamar: expect.any(Array),
      });

      expect(data.kamar).toHaveLength(16);

      data.kamar.forEach((room) => {
        expect(room).toEqual({
          kamar_id: expect.any(Number),
          user_id: expect.toBeOneOf([expect.any(String), null]),
          nama: expect.any(String),
          harga: expect.any(Number),
          status: expect.toBeOneOf(['kosong', 'terisi']),
          gambar: expect.any(String),
          cabang: expect.toBeOneOf(['denpasar', 'klungkung']),
        });
      });
    });
  });

  describe('GET /api/rooms', () => {
    test('should return 401 error if access token is missing', async () => {
      const res = await app.request('/api/rooms');

      expect(res.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /api/rooms', () => {
    test('should return 403 if a non-admin is trying to access all rooms', async () => {
      const res = await app.request('/api/rooms', {
        headers: {
          Cookie: `access-token=${await userOneAccessToken}`,
        },
      });

      expect(res.status).toBe(httpStatus.FORBIDDEN);
    });
  });

  describe('GET /api/rooms/denpasar', () => {
    test('should return 200 and a list of rooms', async () => {
      const res = await app.request('/api/rooms/denpasar');

      expect(res.status).toBe(httpStatus.OK);

      const data = await res.json();

      expect(data).toEqual({
        code: httpStatus.OK,
        status: 'success',
        message: expect.any(String),
        kamar: expect.any(Array),
      });

      expect(data.kamar).toHaveLength(10);

      expect(data.kamar[0]).toEqual({
        kamar_id: expect.any(Number),
        user_id: expect.toBeOneOf([expect.any(String), null]),
        nama: expect.any(String),
        harga: expect.any(Number),
        status: expect.toBeOneOf(['kosong', 'terisi']),
        gambar: expect.any(String),
        cabang: 'denpasar',
      });
    });
  });

  describe('GET /api/rooms/klungkung', () => {
    test('should return 200 and a list of rooms', async () => {
      const res = await app.request('/api/rooms/klungkung');

      expect(res.status).toBe(httpStatus.OK);

      const data = await res.json();

      expect(data).toEqual({
        code: httpStatus.OK,
        status: 'success',
        message: expect.any(String),
        kamar: expect.any(Array),
      });

      expect(data.kamar).toHaveLength(6);

      expect(data.kamar[0]).toEqual({
        kamar_id: expect.any(Number),
        user_id: expect.toBeOneOf([expect.any(String), null]),
        nama: expect.any(String),
        harga: expect.any(Number),
        status: expect.toBeOneOf(['kosong', 'terisi']),
        gambar: expect.any(String),
        cabang: 'klungkung',
      });
    });
  });

  describe('GET /api/rooms/:cabang', () => {
    test('should return 404 error if cabang room is not found', async () => {
      const res = await app.request('/api/rooms/badung');

      expect(res.status).toBe(httpStatus.NOT_FOUND);
    });
  });

  describe('GET /api/rooms/denpasar/:roomId', () => {
    test('should return 200 and the room object if data is ok', async () => {
      const res = await app.request('/api/rooms/denpasar/7');

      expect(res.status).toBe(httpStatus.OK);

      const data = await res.json();

      expect(data).toEqual({
        code: httpStatus.OK,
        status: 'success',
        message: expect.any(String),
        kamar: expect.any(Object),
      });

      expect(data.kamar).toEqual({
        kamar_id: expect.any(Number),
        user_id: expect.toBeOneOf([expect.any(String), null]),
        nama: expect.any(String),
        harga: expect.any(Number),
        status: expect.toBeOneOf(['kosong', 'terisi']),
        gambar: expect.any(String),
        cabang: 'denpasar',
      });
    });
  });

  describe('GET /api/rooms/denpasar/:roomId', () => {
    test('should return 404 error if room is not found', async () => {
      const res = await app.request('/api/rooms/denpasar/17');

      expect(res.status).toBe(httpStatus.NOT_FOUND);
    });
  });

  describe('GET /api/rooms/klungkung/:roomId', () => {
    test('should return 200 and the room object if data is ok', async () => {
      const res = await app.request('/api/rooms/klungkung/11');

      expect(res.status).toBe(httpStatus.OK);

      const data = await res.json();

      expect(data).toEqual({
        code: httpStatus.OK,
        status: 'success',
        message: expect.any(String),
        kamar: expect.any(Object),
      });

      expect(data.kamar).toEqual({
        kamar_id: expect.any(Number),
        user_id: expect.toBeOneOf([expect.any(String), null]),
        nama: expect.any(String),
        harga: expect.any(Number),
        status: expect.toBeOneOf(['kosong', 'terisi']),
        gambar: expect.any(String),
        cabang: 'klungkung',
      });
    });
  });

  describe('GET /api/rooms/klungkung/:roomId', () => {
    test('should return 404 error if room is not found', async () => {
      const res = await app.request('/api/rooms/klungkung/21');

      expect(res.status).toBe(httpStatus.NOT_FOUND);
    });
  });
});

