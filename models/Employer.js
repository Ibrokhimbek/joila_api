const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployerSchema = new Schema({
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    required: true,
    min: 0,
    default: 0,
  },
});

module.exports = mongoose.model("Employer", EmployerSchema);
