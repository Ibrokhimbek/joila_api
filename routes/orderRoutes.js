const { addOrder } = require("../controllers/orderController");
const auth = require("../middlewares/auth");

const orderRoutes = (fastify, options, done) => {
  //* Add order
  fastify.post("", {
    preHandler: [auth(["employer"])],
    // schema: addOrderOpts,
    handler: addOrder,
  });

  //* Order pagination
  // fastify.get("/pagination", {
  //   preHandler: [auth(["employer"])],
  //   // schema: orderPaginationOpts,
  //   handler: allOrders,
  // });

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
