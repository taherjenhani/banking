import Transaction from '../models/transaction.js';
import { ErrorHandler } from '../utils/errorHandler.js';

/**
 * Créer une transaction
 * @route POST /api/transactions
 * @access Public
 */
export const createTransaction = async (req, res, next) => {
  try {
    const { accountNumber, type, amount, description } = req.body;

    // Validation des données d'entrée
    if (!accountNumber || !type || !amount) {
      throw new ErrorHandler('Account number, type, and amount are required', 400);
    }

    if (!['credit', 'debit'].includes(type)) {
      throw new ErrorHandler('Invalid transaction type', 400);
    }

    if (amount <= 0) {
      throw new ErrorHandler('Amount must be greater than zero', 400);
    }

    // Création de la transaction
    const transaction = new Transaction({
      accountNumber,
      type,
      amount,
      description,
    });

    await transaction.save();
    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtenir toutes les transactions
 * @route GET /api/transactions
 * @access Public
 */
export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtenir une transaction par ID
 * @route GET /api/transactions/:id
 * @access Public
 */
export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      throw new ErrorHandler('Transaction not found', 404);
    }

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    next(error);
  }
};

/**
 * Annuler une transaction
 * @route PATCH /api/transactions/:id/cancel
 * @access Public
 */
export const cancelTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Recherche de la transaction
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      throw new ErrorHandler('Transaction not found', 404);
    }

    if (transaction.isCancelled) {
      throw new ErrorHandler('Transaction is already cancelled', 400);
    }

    // Marquer la transaction comme annulée
    transaction.isCancelled = true;
    transaction.cancelledAt = new Date();

    await transaction.save();

    res.status(200).json({
      success: true,
      message: 'Transaction cancelled successfully',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Exemple de contrôleur avec gestion d'erreurs simulée
 * @route POST /api/example
 * @access Public
 */
export const exampleController = (req, res, next) => {
  try {
    // Vérification de la donnée "data"
    if (!req.body.data) {
      throw new ErrorHandler('Data is required', 400);
    }

    // Retourner une réponse si tout va bien
    res.status(200).json({ success: true, data: 'OK' });
  } catch (error) {
    next(error);
  }
};
