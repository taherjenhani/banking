import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    accountNumber: { type: String, required: true },
    type: { type: String, required: true, enum: ['credit', 'debit'] },
    amount: { type: Number, required: true },
    description: { type: String },
    isCancelled: { type: Boolean, default: false },
    cancelledAt: { type: Date, default: null },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
