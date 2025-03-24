import { Hono } from 'hono';
import auth from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import * as userController from '@/controllers/user';
import * as userValidation from '@/validations/user';

const app = new Hono();

app.get('/profile', auth(), userController.getUserProfile);

app
  .get('/', auth('getUsers'), userController.getUsers)
  .post(auth('manageUsers'), validate('json', userValidation.createUserBody), userController.createUser);

app
  .get('/:userId', auth('getUsers'), validate('param', userValidation.userParams), userController.getUserById)
  .patch(
    auth('manageUsers'),
    validate('param', userValidation.userParams),
    validate('json', userValidation.updateUserBody),
    userController.updateUser
  )
  .delete(auth('manageUsers'), validate('param', userValidation.userParams), userController.deleteUser);

export default app;

