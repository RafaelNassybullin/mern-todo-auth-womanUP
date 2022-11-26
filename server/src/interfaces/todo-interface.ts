import { Document } from 'mongoose';

export interface ITodo extends Document {
  id?: string,
  title: string,
  description: string
  userID: string,
  checked: boolean,
  image: string
}

