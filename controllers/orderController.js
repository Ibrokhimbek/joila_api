const Order = require("../models/Order");
const Product = require("../models/Product");

//* POST => Add order
exports.addOrder = async (req, res) => {
  const { client_type, market_id, products } = req.body;

  try {
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      const product = await Product.findById(products[i].productId).exec();
    }

    //* creating an order
    const order = new Order({
      client_type,
      market_id,
      client_name,
      products,
      totalAmount,
      employee_id: req.employeeId,
    });

    await order.save();

    return res.status(201).send({
      message: "Order successfully created",
      product,
    });
  } catch (error) {
    return res.status(400).send({
      error,
    });
  }
};
