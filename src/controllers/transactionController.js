import Transaction from '../models/transaction.js';
import { ErrorHandler } from '../utils/errorHandler.js';

/**
 * Créer une transaction
 * @route POST /api/transactions
 * @access Public
 */
export const createTransaction = async (req, res, next) => {
  try {
    console.log('Request body:', req.body); // Ajouter ceci
    const { sender, accountNumber, receiver, type, amount, description } = req.body;

    // Validation des données d'entrée
    if (!sender || !accountNumber || !receiver || !type || !amount) {
      throw new ErrorHandler('Sender, account number, receiver, type, and amount are required', 400);
    }

    // Création de la transaction
    const transaction = new Transaction({
      sender,
      accountNumber,
      receiver,
      type,
      amount,
      description,
    });

    await transaction.save();
    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    console.error('Error during transaction creation:', error); // Ajouter ceci
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
    const { page = 1, limit = 10 } = req.query;
    const transactions = await Transaction.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Transaction.countDocuments();

    res.status(200).json({
      success: true,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      data: transactions,
    });
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
 * Mettre à jour le statut d'une transaction
 * @route PATCH /api/transactions/:id/status
 * @access Public
 */
export const updateTransactionStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'completed', 'failed'].includes(status)) {
      throw new ErrorHandler('Invalid status', 400);
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      throw new ErrorHandler('Transaction not found', 404);
    }

    transaction.status = status;
    await transaction.save();

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

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      throw new ErrorHandler('Transaction not found', 404);
    }

    if (transaction.isCancelled) {
      throw new ErrorHandler('Transaction is already cancelled', 400);
    }

    transaction.isCancelled = true;
    transaction.cancelledAt = new Date();
    transaction.status = 'failed'; // Mettre à jour le statut lorsque la transaction est annulée

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
