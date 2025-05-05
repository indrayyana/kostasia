import { Hono } from 'hono';
import * as authController from '@/controllers/auth_controller';

const app = new Hono();

app.get('/login', authController.redirectGoogleLogin);
app.get('/login/callback', authController.loginWithGoogle);
app.post('/logout', authController.logout);
app.post('/refresh-tokens', authController.refreshTokens);

export default app;
