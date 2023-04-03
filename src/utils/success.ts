import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ResponseProps {
  isSuccess?: boolean;
  status?: StatusCodes;
  message?: string;
  data?: any;
  [key: string]: any;
}

export const createResponse = (
  res: Response,
  { isSuccess = true, status = StatusCodes.OK, message = '', data = null, ...props }: ResponseProps
) => {
  try {
    const response = {
      success: isSuccess,
      status: status,
      message: message,
      data: data,
      ...props
    };
    res.status(status).json(response);
  } catch (err) {
    return err;
  }
};
