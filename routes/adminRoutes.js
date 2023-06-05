const { registerAdmin, loginAdmin } = require("../controllers/adminController");

function adminRoutes(fastify, options, done) {
  fastify.post("/register", registerAdmin);

  fastify.post("/login", loginAdmin);

  done();
}

module.exports = adminRoutes;
