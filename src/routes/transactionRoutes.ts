// transactionRoutes.ts
import express from 'express';
import { TransactionController } from '../controllers/transactionController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.post('/fund', TransactionController.fundAccount);
router.post('/transfer', TransactionController.transferFunds);
router.post('/withdraw', TransactionController.withdrawFunds);
router.get('/history', TransactionController.getTransactions);

export default router;