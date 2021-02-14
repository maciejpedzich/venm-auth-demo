import BaseHttpError from './base-http';

export default class UsernameTakenError extends BaseHttpError {
  constructor() {
    super(409, 'This username has already been taken');
  }
}
