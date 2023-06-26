const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const auth = require("../middlewares/auth");

function adminRoutes(fastify, options, done) {
  fastify.post("/register", {
    schema: {
      tags: ["Admin"],
    },
    handler: registerAdmin,
  });

  fastify.post("/login", {
    schema: {
      tags: ["Admin"],
    },
    handler: loginAdmin,
  });

  done();
}

module.exports = adminRoutes;
