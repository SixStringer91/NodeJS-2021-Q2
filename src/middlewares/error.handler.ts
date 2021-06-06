import { Response } from 'express';
import { loggerErrors } from './logger.requests';

export class ErrorHandler extends Error {
  statusCode: number;

  constructor(statusCode: number, message?: string) {
    super();
    this.statusCode = statusCode || 500;
    if (message) {
      this.message = message;
    }
  }
}

export const handleError = (
  err: ErrorHandler,
  res: Response
): void => {
  const { statusCode, message } = err;
  loggerErrors(statusCode, message);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};
