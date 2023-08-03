const Employee = require("../models/Employee");
const Employer = require("../models/Employer");
const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  try {
    const { amountPaid } = req.body;
    const transaction = new Transaction({
      fromEmployeeId: req.employeeId,
      toEmployerId: req.employerId,
      amountPaid,
    });
    await transaction.save();
    res.send({ message: "", data: transaction });
  } catch (err) {
    res.status(500).send({ error: "Failed to create transaction" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.send(transactions);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch transactions" });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).send({ error: "Transaction not found" });
    }
    res.send(transaction);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch transaction" });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findByIdAndUpdate(
      transactionId,
      {
        $set: { employerAccepted: true },
      },
      { new: true }
    );
    if (!transaction) {
      return res.status(404).send({ error: "Transaction not found" });
    }

    await Employer.findByIdAndUpdate(transaction.toEmployerId, {
      $inc: { balance: transaction.amountPaid },
    });

    await Employee.findByIdAndUpdate(transaction.fromEmployeeId, {
      $inc: { balance: -transaction.amountPaid },
    });

    res.send(transaction);

    res.send(transaction);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Failed to update transaction: " + err });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) {
      return res.status(404).send({ error: "Transaction not found" });
    }
    res.send({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete transaction" });
  }
};
