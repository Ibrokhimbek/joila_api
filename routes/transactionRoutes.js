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
    },
    handler: createTransaction,
  });

  //* Get all transactions
  fastify.get("", {
    preHandler: [auth(["employee"])],
    schema: {
      tags: ["Transaction"],
    },
    handler: getTransactions,
  });

  //* Get one transaction by id
  fastify.get("/:id", {
    preHandler: [auth(["employee"])],
    schema: {
      tags: ["Transaction"],
    },
    handler: getTransaction,
  });

  //* Edit transaction by id
  fastify.put("/:id", {
    preHandler: [auth(["employee"])],
    schema: {
      tags: ["Transaction"],
    },
    handler: updateTransaction,
  });

  //* Delete transaction
  fastify.delete("/:id", {
    preHandler: [auth(["employee"])],
    schema: {
      tags: ["Transaction"],
    },
    handler: deleteTransaction,
  });

  done();
};

module.exports = transactionRoutes;
