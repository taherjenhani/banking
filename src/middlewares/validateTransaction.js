export const validateTransaction = (req, res, next) => {
    const { accountNumber, type, amount } = req.body;
  
    if (!accountNumber || !type || !amount) {
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