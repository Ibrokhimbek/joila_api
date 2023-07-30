const {
  addOrder,
  getEmployeeOrders,
  getMarketOrders,
} = require("../controllers/orderController");
const auth = require("../middlewares/auth");

const orderRoutes = (fastify, options, done) => {
  //* Add order
  fastify.post("", {
    preHandler: [auth(["employee"])],
    schema: {
      tags: ["Order"],
    },
    handler: addOrder,
  });

  //* Order pagination by employee id
  fastify.get("/employee/pagination", {
    preHandler: [auth(["employee"])],
    schema: {
      tags: ["Order"],
    },
    handler: getEmployeeOrders,
  });

  //* Order pagination by employee id
  fastify.get("/market/pagination", {
    preHandler: [auth(["employee"])],
    schema: {
      tags: ["Order"],
    },
    handler: getMarketOrders,
  });

  //* Get one order
  // fastify.get("/:id", {
  //   preHandler: [auth(["employer"])],
  //   // schema: getOrderOpts,
  //   handler: getOrder,
  // });

  //* Update order
  // fastify.put("/:id", {
  //   preHandler: [auth(["employer"])],
  //   // schema: updateOrderOpts,
  //   handler: editOrder,
  // });

  //* Delete order
  // fastify.delete("/:id", {
  //   preHandler: [auth(["employer"])],
  //   // schema: deleteOrderOpts,
  //   handler: deleteOrder,
  // });

  done();
};

module.exports = orderRoutes;
