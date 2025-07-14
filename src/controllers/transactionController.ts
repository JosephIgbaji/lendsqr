// transactionController.ts
import { Request, Response } from 'express';
import { TransactionService } from '../services/transactionService';
import { AuthRequest } from '../middleware/auth';

export class TransactionController {
  static async fundAccount(req: AuthRequest, res: Response) {
    try {
      const transaction = await TransactionService.fundAccount(
        req.userId!,
        parseFloat(req.body.amount)
      );
      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async transferFunds(req: AuthRequest, res: Response) {
    try {
      const transaction = await TransactionService.transferFunds(
        req.userId!,
        parseInt(req.body.recipientId),
        parseFloat(req.body.amount)
      );
      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async withdrawFunds(req: AuthRequest, res: Response) {
    try {
      const transaction = await TransactionService.withdrawFunds(
        req.userId!,
        parseFloat(req.body.amount)
      );
      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getTransactions(req: AuthRequest, res: Response) {
    try {
      const transactions = await TransactionService.getUserTransactions(req.userId!);
      res.json(transactions);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}