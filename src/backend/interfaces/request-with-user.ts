import { Request } from 'express';
import { UserModel } from '../models/user';

export default interface RequestWithUser extends Request {
  user?: UserModel;
}
