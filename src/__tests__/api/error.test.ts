/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import { errorConverter } from '@/middlewares/error';
import ApiError from '@/utils/ApiError';
import { Context } from 'hono';

describe('Error middlewares', () => {
  describe('Error converter', () => {
    test('should return the same ApiError object it was called with', async () => {
      // Buat error object
      const error = new ApiError(httpStatus.BAD_REQUEST, 'Any error');

      // Setup mock context dan next function
      const mockContext = {
        // Hono context properties
      } as Context;

      const mockNext = jest.fn().mockImplementation(() => {
        return Promise.reject(error);
      });

      // Jalankan middleware dengan error
      await expect(errorConverter(mockContext, mockNext)).rejects.toThrow(
        error
      );
      expect(mockNext).toHaveBeenCalled();
    });
  });
});

