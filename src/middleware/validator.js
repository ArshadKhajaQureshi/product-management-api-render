import { validationResult } from 'express-validator';
import { sendResponse } from './responseHandler.js';

export const checkBodyNotEmpty = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return sendResponse(res, 400, null, { message: 'Request body cannot be empty' });
  }
  next();
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(res, 422, null, {
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};
