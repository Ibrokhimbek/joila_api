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
  fastify.post("/register", {
    preHandler: [auth(["admin"])],
    schema: {
      tags: ["Employer"],
    },
    handler: registerEmployer,
  });

  fastify.post("/login", {
    schema: {
      tags: ["Employer"],
    },
    handler: loginEmployer,
  });

  fastify.get("/", {
    preHandler: [auth(["admin"])],
    schema: {
      tags: ["Employer"],
    },
    handler: getAllEmployers,
  });

  fastify.get("/:id", {
    preHandler: [auth(["admin", "employer"])],
    schema: {
      tags: ["Employer"],
    },
    handler: getEmployer,
  });

  fastify.delete("/:id", {
    preHandler: [auth(["admin"])],
    schema: {
      tags: ["Employer"],
    },
    handler: deleteEmployer,
  });

  fastify.put("/:id", {
    preHandler: [auth(["admin", "employer"])],
    schema: {
      tags: ["Employer"],
    },
    handler: editEmployer,
  });

  done();
}

module.exports = employerRoutes;
