import snap from './init';
import { StatusTransaksi } from '@/types/transaction';

interface ParamsType {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details: {
    first_name: string;
    email: string;
    phone: string;
  };
}

interface TransactionResponse {
  token: string;
  redirect_url: string;
}

interface DetailTransaction {
  status_code: string;
  transaction_id: string;
  gross_amount: string;
  currency: string;
  order_id: string;
  payment_type: string;
  signature_key: string;
  transaction_status: StatusTransaksi;
  fraud_status: string;
  status_message: string;
  merchant_id: string;
  bill_key: string;
  biller_code: string;
  transaction_time: string;
  settlement_time: string;
  expiry_time: string;
}

const createTransaction = async (
  params: ParamsType
): Promise<TransactionResponse> => {
  return snap.createTransaction(params);
};

const getTransaction = async (token: string): Promise<DetailTransaction> => {
  return await snap.transaction.status(token);
};

export { createTransaction, getTransaction };
