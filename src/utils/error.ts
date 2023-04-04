interface ICreateErrorResponse extends Error {
  status: number;
  message: string;
}

export const createError = (status: number, message: string): ICreateErrorResponse => {
  const err: ICreateErrorResponse = new Error(message) as ICreateErrorResponse;
  err.status = status;
  err.message = message;
  return err;
};
