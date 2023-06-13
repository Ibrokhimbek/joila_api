const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminAuth = (req, res, done) => {
  // Check if the user is authenticated as an admin
  const token = req.headers.authorization;

  jwt.verify(token, process.env.jwt_secret_key, async function (err, decoded) {
    const { email } = decoded;

    const admin = await Admin.findOne({ email }).exec();

    req.adminId = admin._id;
  });

  // If the user is not authenticated as an admin, return an error response
  // if (!isAdmin) {
  //   return reply.code(401).send({ error: "Unauthorized" });
  // }

  // If the user is authenticated as an admin, proceed with the request
  done();
};

module.exports = adminAuth;
