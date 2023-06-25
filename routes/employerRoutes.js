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
    {
      preHandler: [auth(["admin"])],
      schema: {
        tags: ["Employer"],
      },
    },
    registerEmployer
  );

  fastify.post(
    "/login",
    {
      schema: {
        tags: ["Employer"],
      },
    },
    loginEmployer
  );

  fastify.get(
    "/",
    {
      preHandler: [auth(["admin"])],
      schema: {
        tags: ["Employer"],
      },
    },
    getAllEmployers
  );

  fastify.get(
    "/:id",
    {
      preHandler: [auth(["admin", "employer"])],
      schema: {
        tags: ["Employer"],
      },
    },
    getEmployer
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [auth(["admin"])],
      schema: {
        tags: ["Employer"],
      },
    },
    deleteEmployer
  );

  fastify.put(
    "/:id",
    {
      preHandler: [auth(["admin", "employer"])],
      schema: {
        tags: ["Employer"],
      },
    },
    editEmployer
  );

  done();
}

module.exports = employerRoutes;
