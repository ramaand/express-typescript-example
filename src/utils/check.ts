import mongoose from 'mongoose';

export const isID = (value) => {
  return mongoose.Types.ObjectId.isValid(value)
}

export const isArray = (value) => {
  return Array.isArray(value)
}