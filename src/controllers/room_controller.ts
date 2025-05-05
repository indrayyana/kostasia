import httpStatus from 'http-status';
import { Context } from 'hono';
import * as roomService from '@/services/room';
import { CabangType } from '@/types/room';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';

export const getRooms = catchAsync(async (c: Context) => {
  const { cache, kamar } = await roomService.getAllRooms();

  if (cache) c.header('X-Data-Source', 'cache');

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Get rooms successfully',
    kamar,
  });
});

export const getRoomsByCabang = catchAsync(async (c: Context) => {
  const cabang = c.req.param('cabang');
  if (!['denpasar', 'klungkung'].includes(cabang)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kamar not found');
  }

  const { cache, kamar } = await roomService.getRoomsByCabang(cabang as CabangType);

  if (cache) c.header('X-Data-Source', 'cache');

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: `Get ${cabang} rooms successfully`,
    kamar,
  });
});

export const getRoomsByCabangId = catchAsync(async (c: Context) => {
  const cabang = c.req.param('cabang');
  const roomId = c.req.param('roomId');

  if (!['denpasar', 'klungkung'].includes(cabang)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kamar not found');
  }

  const kamar = await roomService.getRoomById(Number(roomId), cabang as CabangType);
  if (!kamar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kamar not found');
  }

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: `Get ${cabang} rooms successfully`,
    kamar,
  });
});
