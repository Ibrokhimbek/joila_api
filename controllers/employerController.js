const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employer = require("../models/Employer");

//* POST => Register employer
const registerEmployer = async (req, res) => {
  const { fullname, phone_number, password } = req.body;

  // Validate phone number format
  const phoneNumberRegEx = /^(\+998)-\d{2}-\d{3}-\d{2}-\d{2}$/;

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
    // Creating new employer
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

  res.status(201).send({
    message: "Employer created successfully",
  });
};

//* POST => Login employer
const loginEmployer = async (req, res) => {
  const { phone_number, password } = req.body;

  const phoneNumberRegEx = /^(\+998)-\d{2}-\d{3}-\d{2}-\d{2}$/;

  let errorMessage = "";
  if (!phone_number || !password) {
    errorMessage = "Phone number and Password are required";
  }

  if (errorMessage) {
    return res.status(400).send({
      error: errorMessage,
    });
  } else if (!phoneNumberRegEx.test(phone_number)) {
    return res.status(400).send({
      error: "Invalid phone number",
    });
  }

  try {
    const foundUser = await Employer.find({ phone_number }).exec();
    if (foundUser.length > 0) {
      bcrypt.compare(password, foundUser[0].password, (err, decoded) => {
        if (!decoded) {
          return res.status(400).send({
            error: "Invalid Password",
          });
        }
        const token = jwt.sign(
          {
            phone_number,
            role: "employer",
          },
          process.env.jwt_secret_key
        );

        return res.status(200).send({
          message: "Employer successfully logged in",
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

//* GET => Get all employers
const getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.find().exec();

    if (employers.length > 0) {
      return res
        .code(200)
        .send({ message: "Employees were found", employers: [...employers] });
    }

    return res.code(200).send({ message: "There are no employers" });
  } catch (error) {
    return res.code(500).send({ message: error });
  }
};

//* GET => Get one employer
const getEmployer = async (req, res) => {
  const id = req.params.id;

  try {
    const employer = await Employer.findOne({ _id: id }).exec();

    if (!employer) {
      return res.status(400).send({
        message: "Employer was not found",
      });
    } else {
      return res.status(200).send({
        message: "Employer was found",
        employer,
      });
    }
  } catch (err) {
    return res.status(500).send({
      error: err,
    });
  }
};

//* DELETE => Delete an employer
const deleteEmployer = async (req, res) => {
  const id = req.params.id;

  try {
    const employer = await Employer.findOneAndDelete({ _id: id });

    if (!employer) {
      return res.status(400).send({
        message: "Employer was not found",
      });
    } else {
      return res.status(200).send({
        message: "Employer successfully deleted",
        employer,
      });
    }
  } catch (err) {
    return res.status(400).send({
      error: "Error while deleting an employer",
      description: err,
    });
  }
};

//* PUT => Update employer's fullname vs phone number
const editEmployer = async (req, res) => {
  const id = req.params.id;

  try {
    const employer = await Employer.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          fullname: req.body.fullname,
          phone_number: req.body.phone_number,
        },
      }
    );

    if (!employer) {
      return res.status(400).send({
        message: "Employer was not found",
      });
    } else {
      return res.status(200).send({
        message: "Employer successfully updated",
        employer,
      });
    }
  } catch (err) {
    return res.send({
      error: "Error while updating an employer",
      description: err,
    });
  }
};

module.exports = {
  registerEmployer,
  loginEmployer,
  getAllEmployers,
  getEmployer,
  deleteEmployer,
  editEmployer,
};
