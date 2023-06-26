const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const auth = require("../middlewares/auth");

function adminRoutes(fastify, options, done) {
  //* Register admin
  fastify.post("/register", {
    schema: {
      tags: ["Admin"],
    },
    handler: registerAdmin,
  });

  //* Login admin
  fastify.post("/login", {
    schema: {
      tags: ["Admin"],
    },
    handler: loginAdmin,
  });

  done();
}

module.exports = adminRoutes;
