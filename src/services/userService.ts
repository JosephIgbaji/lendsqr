import bcrypt from 'bcrypt';
import { Users, User } from '../models/User';
import { AdjutorService } from './adjutorService';
import { Transactions, Transaction } from '../models/Transaction';

export class UserService {
  static async createUser(userData: Omit<User, 'id' | 'balance' | 'created_at'>): Promise<User> {
    // Check blacklist
    const isBlacklisted = await AdjutorService.checkBlacklist(userData.email);
    if (isBlacklisted) {
      throw new Error('User is blacklisted and cannot be onboarded');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const insertedIds = await Users().insert({
      ...userData,
      password: hashedPassword,
      balance: 0.00
    });

    const newUserId = insertedIds[0];
    const newUser = await Users().where('id', newUserId).first();
    return newUser;
  }

  static async getUserById(id: number): Promise<User | undefined> {
    return Users().where({ id }).first();
  }

  static async getUserByEmail(email: string): Promise<User | undefined> {
    return Users().where({ email }).first();
  }

  static async updateBalance(userId: number, amount: number): Promise<void> {
    await Users().where({ id: userId }).increment('balance', amount);
  }

   static async getUserBalance(userId: number): Promise<number> {
    const user = await Users().where({ id: userId }).first();
    if (!user) throw new Error('User not found');
    return user.balance;
  }
}