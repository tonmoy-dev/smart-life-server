const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getProducts = asyncHandler(async (req, res, next) => {
  // find all Products
  const products = await Product.find({});
  res.status(200).json(products);
});

const getProduct = asyncHandler(async (req, res, next) => {
  // console.log(req.params.id)
  const _id = req.params.id;
  // find one Product
  const product = await Product.findById(_id);
  res.status(200).json(product);
});

const addProduct = asyncHandler(async (req, res, next) => {
  const product = req.body;
  // add Product
  const result = await Product.create(product);
  res.status(200).json(result);
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateProduct);
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  await product.remove();
  res.status(200).json({ _id: req.params.id });
});
module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
