const Order = require("../models/Order");
const Product = require("../models/Product");

//* POST => Add order
exports.addOrder = async (req, res) => {
  try {
    const { client_type, client_name, market_id, products } = req.body;

    if (products.length <= 0) {
      return res.status(400).send({
        message: "Please provide at least one product in the cart",
      });
    } else if (client_type !== "Market" && client_type !== "Client") {
      return res.status(400).send({
        message: "Client type must be either Market or Client",
      });
    } else if (client_type === "Market" && !market_id) {
      return res.status(400).send({
        message: "Market id is required",
      });
    } else if (client_type === "Client" && !client_name) {
      return res.status(400).send({
        message: "Client name is required",
      });
    }

    const orderObj = {
      client_type,
      products,
      employee_id: req.employeeId,
    };

    client_type === "Market"
      ? (orderObj.market_id = market_id)
      : (orderObj.client_name = client_name);

    let totalAmount = 0;

    for (let i = 0; i < products.length; i++) {
      const cartItem = products[i];
      totalAmount += totalAmount + cartItem.qty * cartItem.price;
    }

    orderObj.totalAmount = totalAmount;

    //* creating an order
    const order = new Order(orderObj);
    await order.save();

    return res.status(201).send({
      message: "Order successfully created",
      order,
    });
  } catch (error) {
    return res.status(400).send({
      error,
    });
  }
};

//* GET => Pagination orders by employee id
exports.getEmployeeOrders = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, employeeId } = req.query;
    const skip = (page - 1) * pageSize;

    if (!req.employeeId && !employeeId) {
      res.status(400).send({
        message: "Employee Id is required",
      });
    }

    const qtyOrders = await Order.find({
      employee_id: req.employeeId || employeeId,
    });
    const orders = await Order.find({
      employee_id: req.employeeId || employeeId,
    })
      .skip(skip)
      .limit(pageSize);

    const response = {
      qtyOrders: qtyOrders.length,
      page,
      count: orders.length,
      page_size: pageSize,
      data: orders,
    };

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

//* GET => Pagination orders by market id
exports.getMarketOrders = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, marketId } = req.query;
    const skip = (page - 1) * pageSize;

    const qtyOrders = await Order.find({
      market_id: marketId,
    });
    const orders = await Order.find({
      market_id: marketId,
    })
      .skip(skip)
      .limit(pageSize);

    const response = {
      qtyOrders: qtyOrders.length,
      page,
      count: products.length,
      page_size: pageSize,
      data: orders,
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({ error });
  }
};
