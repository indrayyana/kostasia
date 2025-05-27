import { Hono } from 'hono';
import auth from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import * as roomController from '@/controllers/room_controller';
import * as roomValidation from '@/validations/room';

const app = new Hono();

app
  .get('/', auth('getRooms'), roomController.getRooms)
  .post(auth('manageRooms'), validate('json', roomValidation.createRoomBody), roomController.createRoom)
  .delete(auth('manageRooms'), validate('query', roomValidation.bulkDeleteRoomQuery), roomController.bulkDeleteRoom);

app.get('/:cabang', roomController.getRoomsByCabang);
app
  .get('/:cabang/:roomId', roomController.getRoomsByCabangId)
  .patch(
    auth('manageRooms'),
    validate('param', roomValidation.roomParams),
    validate('json', roomValidation.updateRoomBody),
    roomController.updateRoom
  )
  .delete(auth('manageRooms'), validate('param', roomValidation.roomParams), roomController.deleteRoom);

app.post(
  '/:cabang/:roomId/upload-image',
  auth('manageRooms'),
  validate('param', roomValidation.roomParams),
  validate('form', roomValidation.fileUploadSchema),
  roomController.uploadRoomImage
);

export default app;
