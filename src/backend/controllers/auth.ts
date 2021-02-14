import { Response, NextFunction, Router } from 'express';
import { hash, compare } from 'bcrypt';

import RequestWithUser from '../interfaces/request-with-user';
import User from '../models/user';
import InvalidCredentialsError from '../errors/invalid-credentials';

import authMiddleware from '../middleware/auth';
import generateTokensMiddleware from '../middleware/generate-tokens';
import UsernameTakenError from '../errors/username-taken';
import EmailRegisteredError from '../errors/email-registered';

export default class AuthController {
  public router = Router();

  constructor() {
    this.router.post('/register', this.register);
    this.router.post('/login', this.logIn);
    this.router.post('/refresh', authMiddleware);

    this.router.use(generateTokensMiddleware);
  }

  private async register(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const usernameTaken = await User.findOne({
        username: req.body.username
      });
      const emailTaken = await User.findOne({ email: req.body.email });

      if (usernameTaken) {
        throw new UsernameTakenError();
      } else if (emailTaken) {
        throw new EmailRegisteredError();
      }

      req.body.password = await hash(req.body.password, 10);
      req.user = await User.create(req.body);

      return next();
    } catch (error) {
      return next(error);
    }
  }

  private async logIn(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({ username: req.body.username });

      if (user) {
        const passwordsMatch = await compare(req.body.password, user.password);

        if (passwordsMatch) {
          req.user = user;

          return next();
        }
      }

      throw new InvalidCredentialsError();
    } catch (error) {
      return next(error);
    }
  }
}
