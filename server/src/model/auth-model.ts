import mongoose, { Schema } from 'mongoose';
import { IAuth } from '../interfaces/auth-inteface';

const Auth: Schema<IAuth> = new Schema(
  {
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

export const AuthModel = mongoose.model<IAuth>('AuthModel', Auth);