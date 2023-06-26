const {
  registerEmployee,
  loginEmployee,
  getAllEmployees,
} = require("../controllers/employeeController");

const auth = require("../middlewares/auth");

function employeeRoutes(fastify, options, done) {
  //* Register employee
  fastify.post("/register", {
    preHandler: [auth(["admin", "employer"])],

    schema: {
      tags: ["Employee"],
    },
    handler: registerEmployee,
  });

  //* Login employee
  fastify.post("/login", {
    schema: {
      tags: ["Employee"],
    },
    handler: loginEmployee,
  });

  //* Get all employees
  fastify.get("/", {
    preHandler: [auth(["admin", "employer"])],
    schema: {
      tags: ["Employee"],
    },
    handler: getAllEmployees,
  });

  // fastify.get(
  //   "/:id",
  //   { preHandler: [auth(["admin", "employer"])] },
  //   getEmployee
  // );

  // fastify.delete(
  //   "/:id",
  //   { preHandler: [auth(["admin", "employer"])] },
  //   deleteEmployee
  // );

  // fastify.put(
  //   "/:id",
  //   { preHandler: [auth(["admin", "employer"])] },
  //   editEmployee
  // );

  done();
}

module.exports = employeeRoutes;
