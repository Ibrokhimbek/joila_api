const mongoose = require("mongoose");
const { Schema } = mongoose;

const MarketSchema = new Schema({
  market_name: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  employerId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Market", MarketSchema);
