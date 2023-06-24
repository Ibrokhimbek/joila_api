const {
  registerEmployer,
  loginEmployer,
  getAllEmployers,
  getEmployer,
  deleteEmployer,
  editEmployer,
} = require("../controllers/employerController");

const auth = require("../middlewares/auth");

function employerRoutes(fastify, options, done) {
  fastify.post(
    "/register",
    { preHandler: [auth(["admin"])] },
    registerEmployer
  );

  fastify.post("/login", loginEmployer);

  fastify.get("/all", { preHandler: [auth(["admin"])] }, getAllEmployers);

  fastify.get(
    "/getOne/:id",
    { preHandler: [auth(["admin", "employer"])] },
    getEmployer
  );

  fastify.delete(
    "/delete/:id",
    { preHandler: [auth(["admin"])] },
    deleteEmployer
  );

  fastify.put(
    "/edit/:id",
    { preHandler: [auth(["admin", "employer"])] },
    editEmployer
  );

  done();
}

module.exports = employerRoutes;
