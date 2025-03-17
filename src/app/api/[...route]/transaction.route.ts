import { Hono } from 'hono';
import * as transactionController from '@/controllers/transaction';
import auth from '@/middlewares/auth';

const app = new Hono();

app
  .get('/', auth('getTransactions'), transactionController.getTransactions)
  .post(auth(), transactionController.saveTransaction);
app
  .get('/detail', auth(), transactionController.getTransactionByOrderId)
  .patch(auth(), transactionController.updateTransactionByOrderId);

export default app;
