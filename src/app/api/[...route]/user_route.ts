import { Hono } from 'hono';
import auth from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import * as userController from '@/controllers/user_controller';
import * as userValidation from '@/validations/user';

const app = new Hono();

app.get('/profile', auth(), userController.getUserProfile);
app.get('/dashboard', auth('getUsers'), userController.getUserDashboard);
app.patch('/update', auth(), validate('json', userValidation.updateUserBody), userController.updateUser);

app
  .get('/', auth('getUsers'), userController.getUsers)
  .post(auth('manageUsers'), validate('json', userValidation.createUserBody), userController.createUser)
  .delete(auth('manageUsers'), validate('query', userValidation.bulkDeleteUserQuery), userController.bulkDeleteUser);

app
  .get('/:userId', auth('getUsers'), validate('param', userValidation.userParams), userController.getUserById)
  .patch(
    auth('manageUsers'),
    validate('param', userValidation.userParams),
    validate('json', userValidation.updateUserByAdminBody),
    userController.updateUserByAdmin
  )
  .delete(auth('manageUsers'), validate('param', userValidation.userParams), userController.deleteUser);

app.post(
  '/:userId/upload-profile',
  auth(),
  validate('param', userValidation.userParams),
  validate('form', userValidation.fileUploadSchema),
  userController.uploadProfileImage
);

app.post(
  '/:userId/upload-ktp',
  auth(),
  validate('param', userValidation.userParams),
  validate('form', userValidation.fileUploadSchema),
  userController.uploadKTP
);

export default app;
