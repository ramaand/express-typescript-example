import {
  NextFunction,
  RequestHandler,
  Response,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { JWT_KEY, TOKEN_NAME } from '../constant/index';
import { IUser, IUserTokenResponse } from '../types/User';
import { createError } from '../utils/error';

export const verifyToken: RequestHandler = (req, res, next): Promise<IUserTokenResponse> => {
  return new Promise((resolve: any, reject) => {
    const token = req.cookies[TOKEN_NAME];
    if (!token || token === undefined)
      return next(createError(StatusCodes.UNAUTHORIZED, req.__('ACCESS_DENIED')));

    jwt.verify(token, JWT_KEY, (err: any, user: any) => {
      if (err)
        return next(
          createError(StatusCodes.FORBIDDEN, req.__('MODEL_IS_INVALID', { name: 'Token' }))
        );
      req.user = user;
      resolve(req);
    });
  });
};

export const verifyUser: RequestHandler = (req, res, next) => {
  verifyToken(req, res, next).then((req) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(StatusCodes.FORBIDDEN, req.__('NOT_AUTHORIZE')));
    }
  });
};

export const verifyAdmin = (req: IUserTokenResponse, res: Response, next: NextFunction) => {
  verifyToken(req, res, next).then((resp) => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(StatusCodes.FORBIDDEN, req.__('NOT_AUTHORIZE')));
    }
  });
};
