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
    required: false,
  },
});

module.exports = mongoose.model("Market", MarketSchema);
