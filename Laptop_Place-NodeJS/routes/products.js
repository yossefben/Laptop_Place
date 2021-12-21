const express = require("express");
const {
  ProductModel,
  validateProd,
  generateProductNumber,
} = require("../models/productModel");
const { authToken } = require("../middleware/authToken");

let router = express.Router();

router.delete("/del/:id", authToken, async (req, res) => {
  try {
    let product = await ProductModel.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userToken._id,
    });

    if (!product) {
      return res.status(404).json({
        msg: "The Product with the given id was not found or you are not the owner of this product",
      });
    }
    res.json({ msg: "product Deleted : ", product });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.get("/all", async (req, res) => {
  let PerPage = 100;
  let page = req.query.page ? req.query.page * PerPage : 0;
  let sortBy = req.query.sort ? req.query.sort : "productName";
  let sortOrder = req.query.reverse == "true" ? -1 : 1;
  try {
    let product = await ProductModel.find({})
      .limit(PerPage)
      .skip(page)
      .sort({ [sortBy]: sortOrder });
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.get("/myProducts", authToken, async (req, res) => {
  let PerPage = 100;
  let page = req.query.page ? req.query.page * PerPage : 0;
  let sortBy = req.query.sort ? req.query.sort : "productName";
  let sortOrder = req.query.reverse == "true" ? -1 : 1;
  try {
    let product = await ProductModel.find({
      user_id: req.userToken._id,
    })
      .limit(PerPage)
      .skip(page)
      .sort({ [sortBy]: sortOrder });
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.get("/search", authToken, async (req, res) => {
  let searchQ = req.query.q;
  let expSearchQ = new RegExp(searchQ, "i");
  try {
    let product = await ProductModel.find({
      $or: [{ productName: expSearchQ }, { productDescription: expSearchQ }],
    });
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.get("/single/:id", authToken, async (req, res) => {
  try {
    let product = await ProductModel.findOne({
      _id: req.params.id,
    });
    if (!product) {
      return res
        .status(404)
        .json("The Product with the given id was not found");
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.post("/add", authToken, async (req, res) => {
  let { error } = validateProd(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  try {
    let product = new ProductModel(req.body);
    product.user_id = req.userToken._id;
    product.user_email = req.userToken.email;

    product.productNumber = await generateProductNumber(ProductModel);

    let defaultProdImg =
      "http://www.sitech.co.id/assets/img/products/default.jpg";
    product.productImage = product.productImage || defaultProdImg;
    let productData = await product.save();
    res.status(201).json(productData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.put("/edit/:id", authToken, async (req, res) => {
  let { error } = validateProd(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  try {
    let defaultProdImg =
      "http://www.sitech.co.id/assets/img/products/default.jpg";
    req.body.bizImage = req.body.bizImage || defaultProdImg;
    let productUpdated = await ProductModel.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.userToken._id,
      },
      req.body
    );
    if (!productUpdated) {
      return res.status(404).json({
        msg: "The Product with the given id was not found or you are not the owner of this product",
      });
    }
    res.json(productUpdated);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

module.exports = router;
