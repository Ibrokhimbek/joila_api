const Product = require("../models/Product");

//* POST => Add product
exports.addProduct = async (req, res) => {
  const { code, name, qty, price, unit } = req.body;

  try {
    //* creating a product
    const product = new Product({
      code,
      name,
      qty,
      price,
      unit,
      employerId: req.employerId,
    });

    await product.save();

    return res.status(201).send({
      message: "Product successfully created",
      product,
    });
  } catch (error) {
    return res.status(400).send({
      error,
    });
  }
};

//* GET => Product pagination
exports.allProducts = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const skip = (page - 1) * pageSize;

    const totalProducts = await Product.countDocuments();
    const products = await Product.find({ employerId: req.employerId })
      .skip(skip)
      .limit(pageSize);

    const response = {
      all: totalProducts,
      page,
      count: products.length,
      page_size: pageSize,
      data: products,
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error });
  }
};

//* GET => Get one product
exports.getProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findOne({ _id: id }).exec();

    if (!product) {
      return res.status(400).send({
        message: "Product was not found",
      });
    } else {
      return res.status(200).send({
        message: "Product was found",
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: "Wrong id pattern",
      description: error,
    });
  }
};

//* PUT => Update product
exports.editProduct = async (req, res) => {
  const prodId = req.params.id;

  try {
    const product = await Product.findOneAndUpdate(
      { _id: prodId },
      {
        $set: {
          ...req.body,
        },
      }
    );

    if (!product) {
      return res.status(400).send({
        message: "Product was not found",
      });
    } else {
      return res.status(200).send({
        message: "Product successfully updated",
        product,
      });
    }
  } catch (error) {
    return res.status(400).send({
      error,
    });
  }
};

//* DELETE => Delete product
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
      return res.status(400).send({
        message: "Product was not found",
      });
    } else {
      return res.status(200).send({
        message: "Product successfully deleted",
        product,
      });
    }
  } catch (error) {
    return res.status(400).send({
      error,
    });
  }
};
