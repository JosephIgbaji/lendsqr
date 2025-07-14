import db from '../config/database';

export interface Transaction {
  id: number;
  type: 'FUND' | 'TRANSFER' | 'WITHDRAWAL';
  amount: number;
  sender_id?: number;
  recipient_id?: number;
  created_at: Date;
}

export const Transactions = () => db<Transaction>('transactions');