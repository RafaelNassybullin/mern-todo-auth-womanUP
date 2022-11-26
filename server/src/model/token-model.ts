import mongoose, { Schema } from 'mongoose';
import { IToken } from '../interfaces/token-interface';

const AuthToken: Schema<IToken> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
  }
);

export default mongoose.model<IToken>('AuthToken', AuthToken);