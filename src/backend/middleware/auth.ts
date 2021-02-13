import { Response, NextFunction } from 'express';
import { verify, TokenExpiredError } from 'jsonwebtoken';

import RequestWithUser from '../interfaces/request-with-user';
import TokenPayload from '../interfaces/token-payload';
import User, { UserModel } from '../models/user';

export default async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const secret = process.env.JWT_SECRET as string;

  try {
    const accessToken = (req.headers.authorization as string).split(' ')[1];
    const accessTokenPayload = verify(accessToken, secret) as TokenPayload;

    // prettier-ignore
    req.user = (
      await User.findOne({
        id: accessTokenPayload.userId
      })
    ) as UserModel;

    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      try {
        const refreshToken = req.cookies['Authorization-Refresh'];
        const refreshTokenPayload = verify(
          refreshToken,
          secret
        ) as TokenPayload;

        // prettier-ignore
        req.user = (
          await User.findOne({
            id: refreshTokenPayload.userId
          })
        ) as UserModel;

        return next();
      } catch (e) {
        return next(e);
      }
    }

    return next(error);
  }
}
