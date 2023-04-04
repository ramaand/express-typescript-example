import { Document } from 'mongoose';

interface DocumentResult extends Document {
  _doc?: any;
}

interface IErrorResponse {
  success: boolean;
  status: number;
  message: string;
  stack?: any;
}
