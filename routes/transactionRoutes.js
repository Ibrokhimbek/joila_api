const {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const auth = require("../middlewares/auth");

const transactionRoutes = (fastify, options, done) => {
  //* Add transaction
  fastify.post("", {
    preHandler: [auth(["employee"])],
    schema: {
      tags: ["Transaction"],
      body: {
        type: "object",
        required: ["amountPaid"],
        properties: {
          amountPaid: {
            type: "number",
          },
        },
      },
      headers: {
        type: "object",
        required: ["Authorization"],
        properties: {
          Authorization: {
            type: "string",
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
            data: {
              type: "object",
            },
          },
        },
      },
    },
    handler: createTransaction,
  });

  //* Get all transactions by employee id
  fastify.get("", {
    preHandler: [auth(["employee", "employer"])],
    schema: {
      tags: ["Transaction"],
      headers: {
        type: "object",
        required: ["Authorization"],
        properties: {
          Authorization: {
            type: "string",
            description: "Employee or Employer token",
          },
        },
      },
      query: {
        type: "object",
        properties: {
          employeeId: {
            type: "string",
            description: "When employer requests this route",
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
            data: {
              type: "array",
            },
          },
        },
      },
    },
    handler: getTransactions,
  });

  //* Get one transaction by id
  fastify.get("/:id", {
    preHandler: [auth(["employee", "employer"])],
    schema: {
      tags: ["Transaction"],
      headers: {
        type: "object",
        required: ["Authorization"],
        properties: {
          Authorization: {
            type: "string",
            description: "Employee or Employer token",
          },
        },
      },
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
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
            data: {
              type: "object",
            },
          },
        },
      },
    },
    handler: getTransaction,
  });

  //* Edit transaction by id
  fastify.put("/:id", {
    preHandler: [auth(["employer"])],
    schema: {
      tags: ["Transaction"],
      headers: {
        type: "object",
        required: ["Authorization"],
        properties: {
          Authorization: {
            type: "string",
            description: "Employer token",
          },
        },
      },
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
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
            data: {
              type: "object",
            },
          },
        },
      },
    },
    handler: updateTransaction,
  });

  //* Delete transaction
  fastify.delete("/:id", {
    preHandler: [auth(["employee"])],
    schema: {
      tags: ["Transaction"],
      headers: {
        type: "object",
        required: ["Authorization"],
        properties: {
          Authorization: {
            type: "string",
            description: "Employee token",
          },
        },
      },
      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
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
          },
        },
      },
    },
    handler: deleteTransaction,
  });

  done();
};

module.exports = transactionRoutes;
