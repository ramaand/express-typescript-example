import { Document } from 'mongoose';

interface DocumentResult extends Document {
  _doc?: any;
}
