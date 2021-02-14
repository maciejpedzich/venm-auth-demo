import { Request, Response, NextFunction } from 'express';
import BaseHttpError from '../errors/base-http';

export default function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(error instanceof BaseHttpError)) {
    console.error(error);
  }

  let status = 500;
  let message = 'An unexpected server error occurred';

  if (error instanceof BaseHttpError) {
    status = error.status;
    message = error.message;
  }

  return res.status(status).json({ error: message });
}
