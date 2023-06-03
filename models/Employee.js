const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
