import { Hono } from 'hono';
import * as userController from '@/controllers/user';
import auth from '@/middlewares/auth';

const app = new Hono();

app.get('/profile', auth(), userController.getUserProfile);
app
  .get('/', auth('getUsers'), userController.getUsers)
  .post(auth('manageUsers'), userController.createUser);
app
  .get('/:userId', auth('getUsers'), userController.getUserById)
  .patch(auth('manageUsers'), userController.updateUser)
  .delete(auth('manageUsers'), userController.deleteUser);

export default app;

