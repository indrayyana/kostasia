import { Hono } from 'hono';
import * as notificationController from '@/controllers/notification';

const app = new Hono();

app
  .get('/', notificationController.getNotifications)
  .post(notificationController.createNotification)
  .delete(notificationController.deleteNotifications);
app.get('/users', notificationController.getNotificationTokenWithUsers);
app.post('/token', notificationController.createNotificationToken);
app.get('/token/:id', notificationController.getNotificationTokenUser);
app
  .get('/:id', notificationController.getNotification)
  .delete(notificationController.deleteNotification);

export default app;

