import { Hono } from 'hono';
import * as notificationController from '@/controllers/notification';
import auth from '@/middlewares/auth';

const app = new Hono();

app
  .get('/', auth('getNotifications'), notificationController.getNotifications)
  .post(auth('manageNotifications'), notificationController.createNotification)
  .delete(
    auth('manageNotifications'),
    notificationController.deleteNotifications
  );
app.get(
  '/users',
  auth('getNotifications'),
  notificationController.getNotificationTokenWithUsers
);
app.post('/token', auth(), notificationController.createNotificationToken);
app.get(
  '/token/:userId',
  auth(),
  notificationController.getNotificationTokenUser
);
app
  .get('/:userId', auth(), notificationController.getNotification)
  .delete(auth(), notificationController.deleteNotification);

export default app;

