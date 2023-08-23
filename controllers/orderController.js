const Order = require("../models/Order");
const Product = require("../models/Product");
const Market = require("../models/Market");
const Employee = require("../models/Employee");

//* POST => Add order
exports.addOrder = async (req, res) => {
  try {
    const {
      client_type,
      client_name,
      market_id,
      products,
      paid = 0,
    } = req.body;

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
      paid,
      employee_id: req.employeeId,
    };

    client_type === "Market"
      ? (orderObj.market_id = market_id)
      : (orderObj.client_name = client_name);

    let totalAmount = 0;

    for (let i = 0; i < products.length; i++) {
      const cartItem = products[i];
      totalAmount += cartItem.qty * cartItem.price;
    }
    const debt = totalAmount - paid;

    if (market_id) {
      const market = await Market.findById(market_id).exec();
      market.debt += debt;
      await market.save();
    }

    const employee = await Employee.findById(req.employeeId).exec();
    employee.balance += paid;
    employee.debt += debt;
    await employee.save();

    orderObj.totalAmount = totalAmount;

    //* creating an order
    const order = new Order(orderObj);
    await order.save();

    return res.status(201).send({
      message: "Order successfully created",
      order,
    });
  } catch (error) {
    return res.status(500).send({
      error,
    });
  }
};

//* GET => Orders and search
exports.getOrders = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      const market = await Market.find({
        $or: [{ market_name: { $regex: search, $options: "i" } }],
      });

      query = {
        $or: [
          { market_id: market[0]?._id },
          { client_name: { $regex: search, $options: "i" } },
        ],
      };
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    let lastOrders = [];

    for (let i = 0; i < orders.length; i++) {
      const marketInfo = await Market.findById(orders[i].market_id).exec();
      const products = await Promise.all(
        orders[i].products.map(async (product) => {
          const prod = await Product.findOne({ _id: product.productId });
          return {
            ...JSON.parse(JSON.stringify(prod)),
            soldPrice: product.price,
            qty: product.qty,
          };
        })
      );

      lastOrders.push({
        ...orders[i].toObject(),
        market_name: marketInfo.market_name,
        products,
      });
    }

    return res.send({
      message: "Orders successfully found",
      data: lastOrders,
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};

//* GET => Order by id
exports.getOrderById = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findOne({ _id: id }).exec();

    if (!order) {
      throw new Error("Order was not found!");
    } else {
      const products = [];

      let product = await Product.findById(order.products[i].productId);
      const marketInfo = await Market.findById(order.market_id).exec();
      products.push({
        ...product.toObject(),
        market_name: marketInfo.market_name,
        soldPrice: order.products[i].price,
        qty: order.products[i].qty,
      });

      const lastOrder = {
        ...order.toObject(),
        products: [...products],
      };

      return res.send({
        message: "Order was found",
        data: lastOrder,
      });
    }
  } catch (error) {
    return res.status(500).send({
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
    }).countDocuments();
    const orders = await Order.find({
      employee_id: req.employeeId || employeeId,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    let lastOrders = [];

    for (let i = 0; i < orders.length; i++) {
      const marketInfo = await Market.findById(orders[i].market_id).exec() || null;
      const products = await Promise.all(
        orders[i].products.map(async (product) => {
          const prod = await Product.findOne({ _id: product.productId });
          return {
            ...JSON.parse(JSON.stringify(prod)),
            soldPrice: product.price,
            qty: product.qty,
          };
        })
      );

      lastOrders.push({
        ...orders[i].toObject(),
        market_name: marketInfo?.market_name || null,
        products,
      });
    }

    const response = {
      qtyOrders: qtyOrders,
      page,
      count: orders.length,
      page_size: pageSize,
      data: lastOrders,
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
    }).countDocuments();

    const orders = await Order.find({
      market_id: marketId,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    let lastOrders = [];

    for (let i = 0; i < orders.length; i++) {
      const marketInfo = await Market.findById(orders[i].market_id).exec();
      const products = await Promise.all(
        orders[i].products.map(async (product) => {
          const prod = await Product.findOne({ _id: product.productId });
          return {
            ...JSON.parse(JSON.stringify(prod)),
            soldPrice: product.price,
            qty: product.qty,
          };
        })
      );

      lastOrders.push({
        ...orders[i].toObject(),
        market_name: marketInfo.market_name,
        products,
      });
    }

    const response = {
      qtyOrders: qtyOrders,
      page,
      count: orders.length,
      page_size: pageSize,
      data: lastOrders,
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error });
  }
};

//* DELETE => Delete an order
exports.deleteOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findOneAndDelete({ _id: id });

    if (!order) {
      return res.status(400).send({
        message: "Order was not found",
      });
    } else {
      const debt = order.totalAmount - order.paid;

      const market = await Market.findById(market_id).exec();
      market.debt -= debt;
      await market.save();

      const employee = await Employee.findById(req.employeeId).exec();
      employee.balance -= paid;
      employee.debt -= debt;
      await employee.save();

      return res.status(200).send({
        message: "Order successfully deleted",
        order,
      });
    }
  } catch (error) {
    return res.status(400).send({
      error,
    });
  }
};
