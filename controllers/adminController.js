const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let errorMessage = "";

  if (!email || !password) {
    errorMessage = "Please provide email and password";
  } else if (!emailRegex.test(email)) {
    errorMessage = "Invalid email format";
  } else if (password.length < 8) {
    errorMessage = "Password must be at least 8 characters long";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  }

  // Creating new admin
  const admin = new Admin({
    email,
    password,
  });

  try {
    foundUser = await Admin.find({ email }).exec();
    if (foundUser.length > 0) {
      return res.status(400).send({
        error: "This user has already registered!",
      });
    }

    await admin.save();
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while creating the admin",
      description: error,
    });
  }

  const token = jwt.sign(
    {
      email,
      role: "admin",
    },
    process.env.jwt_secret_key
  );

  res.status(201).send({
    message: "Admin created successfully",
    token,
  });
};

module.exports = {
  registerAdmin,
};
