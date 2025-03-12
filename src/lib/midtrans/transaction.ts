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
  params: ParamsType
): Promise<TransactionResponse> => {
  return snap.createTransaction(params);
};

// const getTransaction = async (token: string, callback: Function) => {
//   snap.transaction.status(token).then((res: any) => {
//     callback(res);
//   });
// };

export { createTransaction };

