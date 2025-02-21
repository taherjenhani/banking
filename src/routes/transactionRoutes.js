import express from 'express';
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  cancelTransaction,
  
} from '../controllers/transactionController.js';
import { validateTransaction } from '../middlewares/validateTransaction.js';
const router = express.Router();


router.post('/', validateTransaction, createTransaction);
router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.patch('/:id/cancel', cancelTransaction);


export default router;
