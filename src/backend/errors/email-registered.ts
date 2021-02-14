import BaseHttpError from './base-http';

export default class EmailRegisteredError extends BaseHttpError {
  constructor() {
    super(422, 'This email address has already been registered');
  }
}
