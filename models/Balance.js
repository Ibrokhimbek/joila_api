const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Balance", BalanceSchema);

module.exports = Admin;
