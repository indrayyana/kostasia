import { Hono } from "hono";
import * as notificationController from "@/controllers/notification";
import auth from "@/middlewares/auth";
import { validate } from "@/middlewares/validate";
import * as userValidation from "@/validations/user";
import * as notifValidation from "@/validations/notif";

const app = new Hono();

app
  .get("/", auth("getNotifications"), notificationController.getNotifications)
  .post(auth("manageNotifications"), notificationController.createNotification)
  .delete(auth("manageNotifications"), notificationController.deleteNotifications);

app.get("/users", auth("getNotifications"), notificationController.getNotificationTokenWithUsers);
app.post("/token", auth(), notificationController.createNotificationToken);
app.get(
  "/token/:userId",
  auth(),
  validate("param", userValidation.userParams),
  notificationController.getNotificationTokenUser
);

app.get("/:userId", auth(), notificationController.getNotification);
app.delete(
  "/:notificationId",
  auth(),
  validate("param", notifValidation.notifParams),
  notificationController.deleteNotification
);

export default app;
