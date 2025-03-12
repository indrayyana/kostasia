import httpStatus from 'http-status';
import { Context } from 'hono';
import roomService from '@/services/room';
// import ApiError from '@/utils/ApiError';
import { ApiError, catchAsync } from '@/utils/catchAsyncHono';
import { CabangType } from '@/types/room';

export const getRooms = catchAsync(async (c: Context) => {
  const kamar = await roomService.getAllRooms();

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

  const kamar = await roomService.getRoomsByCabang(cabang as CabangType);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: `Get ${cabang} rooms successfully`,
    kamar,
  });
});

export const getRoomsByCabangId = catchAsync(async (c: Context) => {
  const cabang = c.req.param('cabang');
  const id = c.req.param('id');

  if (!['denpasar', 'klungkung'].includes(cabang)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kamar not found');
  }

  const kamar = await roomService.getRoomById(Number(id), cabang as CabangType);
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

