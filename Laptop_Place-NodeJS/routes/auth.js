const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/secret");

let router = express.Router();

router.post("/login", async (req, res) => {
  let { error } = validLoginUser(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    res.json({ newToken: createToken(user._id, user.biz, user.email) });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

const validLoginUser = (_userBody) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(_userBody);
};

const createToken = (_id, _biz, _email) => {
  let getNewToken = jwt.sign(
    { _id: _id, biz: _biz, email: _email },
    secret.JWTSecretKey,
    { expiresIn: "100mins" }
  );
  return getNewToken;
};

module.exports = router;
