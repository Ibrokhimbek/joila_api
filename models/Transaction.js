const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    fromEmployeeId: {
      type: String,
      required: true,
    },
    toEmployerId: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      min: 0,
      required: true,
    },
    employerAccepted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
