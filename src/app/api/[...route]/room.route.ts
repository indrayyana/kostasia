import { Hono } from 'hono';
import * as roomController from '@/controllers/room';
import auth from '@/middlewares/auth';

const app = new Hono();

app.get('/', auth('getRooms'), roomController.getRooms);
app.get('/:cabang', roomController.getRoomsByCabang);
app.get('/:cabang/:roomId', roomController.getRoomsByCabangId);

export default app;
