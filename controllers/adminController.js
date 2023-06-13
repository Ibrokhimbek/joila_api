const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Employer = require("../models/Employer");

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

  try {
    const foundUser = await Admin.find({ email }).exec();
    if (foundUser.length > 0) {
      return res.status(400).send({
        error: "This user has already registered!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating new admin
    const admin = new Admin({
      email,
      password: hashedPassword,
    });

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

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let errorMessage = "";
  if (!email || !password) {
    errorMessage = "Email and Password are required";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  } else if (!emailRegex.test(email)) {
    return res.status(400).send({
      error: "Invalid email address",
    });
  }

  try {
    const foundUser = await Admin.find({ email }).exec();
    if (foundUser.length > 0) {
      bcrypt.compare(password, foundUser[0].password, (err, decoded) => {
        if (!decoded) {
          return res.status(400).send({
            error: "Invalid Password",
          });
        }
        const token = jwt.sign(
          {
            email,
            role: "admin",
          },
          process.env.jwt_secret_key
        );

        return res.status(200).send({
          message: "Admin successfully authenticated",
          token,
        });
      });
    } else {
      return res.status(400).send({
        error: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).send({
      err,
    });
  }
};

const createEmployer = async (req, res) => {
  const { fullname, phone_number, password } = req.body;

  // Validate email format
  const phoneNumberRegEx = /^(\+998)[ -]?\d{2}[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/;

  let errorMessage = "";

  if (!phone_number || !password) {
    errorMessage = "Please provide phone number and password";
  } else if (!phoneNumberRegEx.test(phone_number)) {
    errorMessage = "Invalid phone number format";
  } else if (password.length < 8) {
    errorMessage = "Password must be at least 8 characters long";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  }

  try {
    const foundUser = await Employer.find({ phone_number }).exec();
    if (foundUser.length > 0) {
      return res.status(400).send({
        error: "This employer has already registered!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(req.adminId);
    // Creating new admin
    const employer = new Employer({
      fullname,
      phone_number,
      admin_id: req.adminId,
      password: hashedPassword,
    });

    await employer.save();
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while creating the employer",
      description: error,
    });
  }

  const token = jwt.sign(
    {
      fullname,
      phone_number,
      role: "employer",
    },
    process.env.jwt_secret_key
  );

  res.status(201).send({
    message: "Employer created successfully",
    token,
  });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  createEmployer,
};
