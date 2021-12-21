const express = require("express");
const {
  UserModel,
  validateUser,
  validateUserUpdated,
} = require("../models/userModel");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { authToken } = require("../Middleware/authToken");

let router = express.Router();

router.get("/all", async (req, res) => {
  let PerPage = 10;
  let page = req.query.page ? req.query.page * PerPage : 0;
  let sortBy = req.query.sort ? req.query.sort : "lastname";
  let sortOrder = req.query.reverse == "true" ? -1 : 1;
  try {
    let userData = await UserModel.find({})
      .limit(PerPage)
      .skip(page)
      .sort({ [sortBy]: sortOrder });
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.get("/myInfo", authToken, async (req, res) => {
  try {
    let userData = await UserModel.findOne(
      { _id: req.userToken._id },
      { password: 0 }
    );
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.post("/add", async (req, res) => {
  let { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  try {
    let userData = await UserModel.findOne({ email: req.body.email });
    if (userData) {
      return res
        .status(400)
        .json({ err: "user already in the system, try to log in" });
    }

    let user = new UserModel(req.body);
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res
      .status(201)
      .json(
        _.pick(user, [
          "_id",
          "lastname",
          "firstname",
          "email",
          "phone",
          "date_created",
        ])
      );
  } catch (err) {
    console.log(err);
    res.json({ err: err.message, stack: err.stack });
  }
});

router.put("/edit/:id", authToken, async (req, res) => {
  let { error } = validateUserUpdated(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  try {
    let user = await UserModel.updateOne({ _id: req.params.id }, req.body);

    let userUpdated = await UserModel.findOne({
      _id: req.params.id,
    });
    if (!userUpdated) {
      return res.status(404).json({
        msg: "The User with the given id was not found",
      });
    }
    res.json(userUpdated);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

module.exports = router;
