import { Document } from 'mongoose';

export interface ITodo extends Document<string> {
  name: string;
  description: string;
  status: boolean;
}
