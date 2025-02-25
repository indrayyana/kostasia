export interface ErrorInterface {
  response: {
    status: number;
    data: {
      code: number;
      status: string;
      message: string;
    };
  };
}

