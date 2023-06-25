const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const auth = require("../middlewares/auth");

function adminRoutes(fastify, options, done) {
  fastify.post(
    "/register",
    {
      schema: {
        tags: ["Admin"],
      },
    },
    registerAdmin
  );

  fastify.post(
    "/login",
    {
      schema: {
        tags: ["Admin"],
      },
    },
    loginAdmin
  );

  done();
}

module.exports = adminRoutes;
