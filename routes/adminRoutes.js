const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const auth = require("../middlewares/auth");

function adminRoutes(fastify, options, done) {
  fastify.post("/register", registerAdmin);

  fastify.post("/login", loginAdmin);

  done();
}

module.exports = adminRoutes;
