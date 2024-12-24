import express from 'express';
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  cancelTransaction,
  exampleController,
} from '../controllers/transactionController.js';

const router = express.Router();


router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.patch('/:id/cancel', cancelTransaction);
router.post('/example', exampleController);

export default router;
