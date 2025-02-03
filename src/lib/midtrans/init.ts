import midtransClient from 'midtrans-client';
import { config } from '@/utils/config';

const snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: config.midtrans.serverKey,
});

export default snap;

