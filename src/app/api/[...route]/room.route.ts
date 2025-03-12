import { Hono } from 'hono';
import * as roomController from '@/controllers/room';

const app = new Hono();

app.get('/', roomController.getRooms);
app.get('/:cabang', roomController.getRoomsByCabang);
app.get('/:cabang/:id', roomController.getRoomsByCabangId);

export default app;

