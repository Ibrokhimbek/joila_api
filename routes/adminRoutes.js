const {
  registerAdmin,
  loginAdmin,
  createEmployer,
} = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");

function adminRoutes(fastify, options, done) {
  fastify.post("/admin/register", registerAdmin);

  fastify.post("/admin/login", loginAdmin);

  fastify.post(
    "/admin/createEmployer",
    { preHandler: [adminAuth] },
    createEmployer
  );

  done();
}

module.exports = adminRoutes;
