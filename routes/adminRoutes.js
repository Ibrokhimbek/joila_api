const { registerAdmin } = require("../controllers/adminController");

function adminRoutes(fastify, options, done) {
  fastify.post("/register", registerAdmin);

  done();
}

module.exports = adminRoutes;
