const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  biz: {
    type: Boolean,
    required: true,
  },
  date_created: { type: Date, default: Date.now },
  favProducts: Array,
  favCards: Array,
});

exports.UserModel = mongoose.model("users", userSchema);

exports.validateUser = (_user) => {
  let schema = Joi.object({
    lastname: Joi.string().min(2).max(255).required(),
    firstname: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    biz: Joi.boolean().required(),
  });

  return schema.validate(_user, {
    abortEarly: false,
  });
};

exports.validateUserUpdated = (_user) => {
  let schema = Joi.object({
    lastname: Joi.string().min(2).max(255).required(),
    firstname: Joi.string().min(2).max(255).required(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
  });

  return schema.validate(_user, {
    abortEarly: false,
  });
};
