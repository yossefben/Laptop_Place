const express = require("express");
const { UserModel } = require("../models/userModel");
const { authToken } = require("../Middleware/authToken");
const { ProductModel } = require("../models/productModel");

let router = express.Router();

router.get("/myFavs", authToken, async (req, res) => {
  try {
    let userData = await UserModel.findOne({
      _id: req.userToken._id,
    });

    let myFavs = userData.favProducts;

    let product = await ProductModel.find({
      _id: myFavs,
    });

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.patch("/add/:id", authToken, async (req, res) => {
  try {
    let userData = await UserModel.findOne(
      { _id: req.userToken._id },
      { password: 0 }
    );

    let temp_ar = userData.favProducts;

    if (temp_ar.includes(req.params.id)) {
      return res
        .status(400)
        .json({ err: "This prod is already in your favorites" });
    }

    temp_ar.push(req.params.id);

    let favProductsUpdated = await UserModel.updateOne(
      { _id: req.userToken._id },
      { favProducts: temp_ar }
    );
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.patch("/remove/:id", authToken, async (req, res) => {
  try {
    let userData = await UserModel.findOne(
      { _id: req.userToken._id },
      { password: 0 }
    );

    let temp_ar = userData.favProducts;

    if (!temp_ar.includes(req.params.id)) {
      return res
        .status(404)
        .json({ err: "This prod was not found in your favorites" });
    }

    temp_ar.splice(temp_ar.indexOf(req.params.id), 1);

    let favProductsUpdated = await UserModel.updateOne(
      { _id: req.userToken._id },
      { favProducts: temp_ar }
    );

    let favorite_product_deleted = req.params.id;
    res.status(200).json({
      msg: "Favorite product deleted with success",
      favorite_product_deleted,
      userData,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

module.exports = router;
