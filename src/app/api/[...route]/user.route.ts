import { Hono } from 'hono';
import * as userController from '@/controllers/user';

const app = new Hono();

app.get('/profile', userController.getUserProfile);
app
  .get('/', userController.getUsers)
  .post(userController.createUser);
app
  .get('/:id', userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default app;

