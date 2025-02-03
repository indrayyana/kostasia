import snap from './init';

type ParamsType = {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details: {
    first_name: string;
    email: string;
    phone: string;
  };
};

type TransactionResponse = {
  token: string;
  redirect_url: string;
};

const createTransaction = async (
  params: ParamsType,
  callback: (transaction: TransactionResponse) => void
) => {
  snap
    .createTransaction(params)
    .then((transaction: { token: string; redirect_url: string }) => {
      callback(transaction);
    });
};

export default createTransaction;

