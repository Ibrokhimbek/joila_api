const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminAuth = (req, res, done) => {
  // Check if the user is authenticated as an admin
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).send({ error: "Token was not found" });
  }

  jwt.verify(token, process.env.jwt_secret_key, async function (err, decoded) {
    if (err) {
      res.code(400).send({
        error: "Invalid token",
        description: err,
      });
      return;
    }

    const { email } = decoded;

    const admin = await Admin.findOne({ email }).exec();

    // If the user is not authenticated as an admin, return an error response
    if (!admin) {
      return res.code(401).send({ error: "Unauthorized" });
    }

    req.adminId = admin._id;
  });

  // If the user is authenticated as an admin, proceed with the request
  done();
};

module.exports = adminAuth;
