const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    uppercase: true,
  },
  productDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  productPrice: {
    type: Number,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  productImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  productNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  productCategory: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  userPhone: { type: String, required: true, minlength: 9, maxlength: 10 },
  user_email: {
    type: String,
    minlength: 6,
    maxlength: 255,
  },
  user_id: { type: mongoose.Schema.Types.ObjectID, ref: "users" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

exports.ProductModel = mongoose.model("products", productSchema);

exports.generateProductNumber = async (ProductModel) => {
  while (true) {
    let randomNumber = Math.floor(Math.random() * 899000) + 100000;
    let product = await ProductModel.findOne({ productNumber: randomNumber });
    if (!product) {
      return String(randomNumber);
    }
  }
};

exports.validateProd = (_newProd) => {
  let schema = Joi.object({
    // _id: Joi.any(),
    productName: Joi.string().min(2).max(255).required(),
    productDescription: Joi.string().min(2).max(1024).required(),
    productImage: Joi.string().min(2).max(1024),
    productPrice: Joi.number().min(1).required(),
    productCategory: Joi.string().min(2).max(100).required(),
    userPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
  });

  return schema.validate(_newProd, {
    abortEarly: false,
  });
};
