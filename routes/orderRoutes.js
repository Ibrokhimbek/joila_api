const {
  addOrder,
  getEmployeeOrders,
  getMarketOrders,
  deleteOrder,
} = require("../controllers/orderController");
const auth = require("../middlewares/auth");

const orderRoutes = (fastify, options, done) => {
  //* Add order
  fastify.post("", {
    preHandler: [auth(["employee"])],
    schema: {
      tags: ["Order"],
      body: {
        type: "object",
        properties: {
          client_type: {
            type: "string",
            enum: ["Market", "Client"],
          },
          market_id: {
            type: "string",
          },
          client_name: {
            type: "string",
          },
          products: {
            type: "array",
            items: {
              type: "object",
              required: ["productId", "qty", "price"],
              properties: {
                productId: {
                  type: "string",
                },
                qty: {
                  type: "number",
                },
                price: {
                  type: "number",
                },
              },
            },
          },
          paid: {
            type: "number",
          },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            order: {
              type: "object",
              properties: {
                client_type: {
                  type: "string",
                  enum: ["Market", "Client"],
                },
                market_id: {
                  type: "string",
                },
                client_name: {
                  type: "string",
                },
                products: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["productId", "qty", "price"],
                    properties: {
                      productId: {
                        type: "string",
                      },
                      qty: {
                        type: "number",
                      },
                      price: {
                        type: "number",
                      },
                    },
                  },
                },
                paid: {
                  type: "number",
                },
                totalAmount: {
                  type: "number",
                },
              },
            },
          },
        },
      },
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

  //* Delete order
  fastify.delete("/:id", {
    preHandler: [auth(["employer"])],
    schema: {
      tags: ["Order"],
    },
    handler: deleteOrder,
  });

  done();
};

module.exports = orderRoutes;
