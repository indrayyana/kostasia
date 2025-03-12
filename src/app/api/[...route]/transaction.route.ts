import { Hono } from 'hono';
import * as transactionController from '@/controllers/transaction';

const app = new Hono();

app
  .get('/', transactionController.getTransactions)
  .post(transactionController.saveTransaction);

export default app;

