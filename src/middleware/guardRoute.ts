import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { JWT_KEY, TOKEN_NAME } from '../constant/index';
import { IUserTokenResponse } from '../types/User';
import { createError } from '../utils/error';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IUserTokenResponse> => {
  return new Promise((resolve: any, reject) => {
    const token = req.cookies[TOKEN_NAME];
    if (!token || token === undefined)
      return next(createError(StatusCodes.UNAUTHORIZED, req.__('ACCESS_DENIED')));

    jwt.verify(token, JWT_KEY, (err: any, user: any) => {
      if (err)
        return next(
          createError(StatusCodes.FORBIDDEN, req.__('MODEL_IS_INVALID', { name: 'Token' }))
        );
      (req as unknown as IUserTokenResponse).user = user;
      resolve(req);
    });
  });
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, next).then((req) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(StatusCodes.FORBIDDEN, req.__('NOT_AUTHORIZE')));
    }
  });
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, next).then((resp) => {
    if ((req as unknown as IUserTokenResponse).user.isAdmin) {
      next();
    } else {
      return next(createError(StatusCodes.FORBIDDEN, req.__('NOT_AUTHORIZE')));
    }
  });
};
