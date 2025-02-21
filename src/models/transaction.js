import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    accountNumber: { type: String, required: true },
    receiver: { type: String, required: true },
    type: { type: String, required: true, enum: ['credit', 'debit'] },
    amount: { type: Number, required: true },
    description: { type: String },
    isCancelled: { type: Boolean, default: false },
    cancelledAt: { type: Date, default: null },
    status: { 
      type: String, 
      required: true, 
      enum: ['pending', 'completed', 'failed'], 
      default: 'pending' 
    },
     
  },
  {
    timestamps: true, 
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
