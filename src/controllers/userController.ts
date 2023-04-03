import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';

import User from '../models/User';
import { IUser } from '../types/User';
import { createResponse } from '../utils/success';

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const { password, isAdmin, ...otherDetails } = updatedUser!._doc;
    createResponse(res, {
      message: req.__('SUCCESS_UPDATE', { name: 'user' }),
      data: otherDetails
    });
  } catch (err) {
    next(err);
  }
};

// export const deleteUser: RequestHandler<{ id: string }, IUser> = async (req, res, next) => {
export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    createResponse(res, { message: req.__('SUCCESS_DELETE', { name: 'user' }) });
  } catch (err) {
    next(err);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    createResponse(res, {
      message: user
        ? req.__('SUCCESS_RETRIEVE', { name: 'user' })
        : req.__('MODEL_NOT_FOUND', { name: 'User' }),
      data: user
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users: (IUser & { _id: string })[] = await User.find().select('-password');
    createResponse(res, { message: req.__('SUCCESS_RETRIEVE', { name: 'users' }), data: users });
  } catch (err) {
    next(err);
  }
};
