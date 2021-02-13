import { Schema, model, Document } from 'mongoose';

export interface UserModel extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = model<UserModel>('User', userSchema);

export default User;
