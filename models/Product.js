const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      validate: {
        validator: function (value) {
          return /\.(png|jpe?g)$/i.test(value);
        },
        message: "Invalid image file format",
      },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      enum: ["kg", "dona", "qadoq", "m2"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
