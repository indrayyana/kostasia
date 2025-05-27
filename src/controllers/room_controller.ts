import httpStatus from 'http-status';
import { Context } from 'hono';
import * as roomService from '@/services/room';
import { CabangType } from '@/types/room';
import catchAsync from '@/utils/catchAsync';
import ApiError from '@/utils/ApiError';
import {
  bulkDeleteRoomQueryType,
  createRoomBodyType,
  fileUploadSchemaType,
  roomParamsType,
  updateRoomBodyType,
} from '@/validations/room';
import { uploadImageFile } from '../utils/firebase-admin';

export const createRoom = catchAsync(async (c: Context) => {
  // @ts-expect-error off
  const validatedBody: createRoomBodyType = c.req.valid('json');

  const kamar = await roomService.createRoom(validatedBody);

  return c.json(
    {
      code: httpStatus.CREATED,
      status: 'success',
      message: 'Create room successfully',
      kamar,
    },
    httpStatus.CREATED
  );
});

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

export const updateRoom = catchAsync(async (c: Context) => {
  // @ts-expect-error off
  const validatedParam: roomParamsType = c.req.valid('param');
  // @ts-expect-error off
  const validatedBody: updateRoomBodyType = c.req.valid('json');

  const kamar = await roomService.updateRoomById(validatedParam.roomId, validatedBody);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Update room successfully',
    kamar,
  });
});

export const deleteRoom = catchAsync(async (c: Context) => {
  // @ts-expect-error off
  const validatedParam: roomParamsType = c.req.valid('param');

  await roomService.deleteRoomById(validatedParam.roomId);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Delete room successfully',
  });
});

export const bulkDeleteRoom = catchAsync(async (c: Context) => {
  // @ts-expect-error off
  const validatedQuery: bulkDeleteRoomQueryType = c.req.valid('query');

  await roomService.deleteAllRoomById(validatedQuery.id);

  return c.json({
    code: httpStatus.OK,
    status: 'success',
    message: 'Delete rooms successfully',
  });
});

export const uploadRoomImage = catchAsync(async (c: Context) => {
  // @ts-expect-error off
  const validatedParam: roomParamsType = c.req.valid('param');
  // @ts-expect-error off
  const validatedBody: fileUploadSchemaType = c.req.valid('form');

  const imageUrl = await uploadImageFile(validatedParam.roomId.toString(), 'room', validatedBody.file);

  return c.json(
    {
      code: httpStatus.CREATED,
      status: 'success',
      message: 'Upload image successfully',
      imageUrl,
    },
    httpStatus.CREATED
  );
});
