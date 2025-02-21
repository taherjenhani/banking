export const validateTransaction = (req, res, next) => {
  const { sender, receiver, accountNumber, type, amount } = req.body;

  if (!sender || !receiver || !accountNumber || !type || !amount) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  if (type !== 'credit' && type !== 'debit') {
    return res.status(400).json({ success: false, error: 'Invalid transaction type' });
  }

  if (amount <= 0) {
    return res.status(400).json({ success: false, error: 'Amount must be greater than zero' });
  }

  next();
};
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};