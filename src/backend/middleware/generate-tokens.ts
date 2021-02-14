import { Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';

import RequestWithUser from '../interfaces/request-with-user';
import { UserModel } from '../models/user';

export default async function generateTokensMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const secret = process.env.JWT_SECRET as string;
  const user = req.user as UserModel;

  // prettier-ignore
  const accessToken = sign(
    { userId: user.id, grant: 'ACCESS' },
    secret,
    { expiresIn: '15m' }
  );

  // prettier-ignore
  const refreshToken = sign(
    { userId: user.id, grant: 'REFRESH' },
    secret,
    { expiresIn: '14d' }
  );

  res.setHeader('Authorization', accessToken);
  res.cookie('Authorization-Refresh', refreshToken, {
    maxAge: 3600 * 24 * 14 * 1000,
    httpOnly: true
  });

  const { id, username } = user;

  return res.status(200).json({ id, username });
}
