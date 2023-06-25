const {
  registerEmployee,
  loginEmployee,
  getAllEmployees,
} = require("../controllers/employeeController");

const auth = require("../middlewares/auth");

function employeeRoutes(fastify, options, done) {
  fastify.post(
    "/register",
    { preHandler: [auth(["admin", "employer"])] },
    registerEmployee
  );

  fastify.post("/login", loginEmployee);

  fastify.get(
    "/",
    { preHandler: [auth(["admin", "employer"])] },
    getAllEmployees
  );

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
