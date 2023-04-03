import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

import Logging from '../library/Logging';
import { createError } from '../utils/error';
import { createResponse } from '../utils/success';

export const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);
      return createResponse(res, createError(StatusCodes.BAD_REQUEST, error));
    }
  };
};

export const schemas = {
  category: {
    create: Joi.object({
      title: Joi.string().required(),
      desc: Joi.string().allow(''),
      status: Joi.string().valid('active', 'inactive', 'deleted')
    }),
    update: Joi.object({
      title: Joi.string().required(),
      desc: Joi.string().allow(''),
      status: Joi.string().valid('active', 'inactive', 'deleted')
    })
  }
};
