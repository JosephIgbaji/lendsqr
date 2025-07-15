import db from '../config/database';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
  created_at: Date;
}

export const Users = () => db<User>('users');