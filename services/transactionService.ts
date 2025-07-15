import { Users } from '../models/User';
import { Transactions, Transaction } from '../models/Transaction';
import { UserService } from './userService';

export class TransactionService {
  static async fundAccount(userId: number, amount: number): Promise<Transaction> {
    if (amount <= 0) throw new Error('Invalid amount');

    const user = await UserService.getUserById(userId);
    if (!user) throw new Error('User not found');

    // Update balance
    await UserService.updateBalance(userId, amount);

    // Create transaction record
    const [transaction] = await Transactions().insert({
      type: 'FUND',
      amount,
      recipient_id: userId
    }).returning('*');

    return transaction;
  }

  static async transferFunds(senderId: number, recipientId: number, amount: number): Promise<Transaction> {
    if (amount <= 0) throw new Error('Invalid amount');
    if (senderId === recipientId) throw new Error('Cannot transfer to yourself');

    const sender = await UserService.getUserById(senderId);
    const recipient = await UserService.getUserById(recipientId);

    if (!sender || !recipient) throw new Error('User not found');
    if (sender.balance < amount) throw new Error('Insufficient funds');

    // Perform transaction
    await Promise.all([
      UserService.updateBalance(senderId, -amount),
      UserService.updateBalance(recipientId, amount)
    ]);

    // Create transaction record
    const [transaction] = await Transactions().insert({
      type: 'TRANSFER',
      amount,
      sender_id: senderId,
      recipient_id: recipientId
    }).returning('*');

    return transaction;
  }

  static async withdrawFunds(userId: number, amount: number): Promise<Transaction> {
    if (amount <= 0) throw new Error('Invalid amount');

    const user = await UserService.getUserById(userId);
    if (!user) throw new Error('User not found');
    if (user.balance < amount) throw new Error('Insufficient funds');

    // Update balance
    await UserService.updateBalance(userId, -amount);

    // Create transaction record
    const [transaction] = await Transactions().insert({
      type: 'WITHDRAWAL',
      amount,
      sender_id: userId
    }).returning('*');

    return transaction;
  }

  static async getUserTransactions(userId: number): Promise<Transaction[]> {
    return Transactions()
      .where('sender_id', userId)
      .orWhere('recipient_id', userId)
      .orderBy('created_at', 'desc');
  }
}