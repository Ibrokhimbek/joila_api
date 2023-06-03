const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: {
          type: Number,
          min: 0,
        },
        price: {
          type: Number,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
