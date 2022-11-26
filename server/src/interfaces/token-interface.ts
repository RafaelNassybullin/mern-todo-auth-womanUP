import { Schema, Document } from "mongoose";

export interface IToken extends Document {
  user: typeof Schema.Types.ObjectId,
  refreshToken: string,
}