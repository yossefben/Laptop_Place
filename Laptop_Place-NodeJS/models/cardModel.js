const mongoose = require("mongoose");
const Joi = require("joi");

const cardSchema = new mongoose.Schema({
  bizName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    uppercase: true,
  },
  bizDescription: {
    type: String,
    required: true,
    minlegnth: 2,
    maxlength: 1024,
  },
  bizAddress: { type: String, required: true, minlength: 2, maxlength: 400 },
  bizPhone: { type: String, required: true, minlength: 9, maxlength: 10 },
  bizImage: { type: String, required: true, minlength: 11, maxlength: 1024 },
  bizNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectID, ref: "users" },
});

exports.CardModel = mongoose.model("cards", cardSchema);

exports.generateBizNumber = async (CardModel) => {
  while (true) {
    let randomNumber = Math.floor(Math.random() * 899000) + 100000;
    let card = await CardModel.findOne({ bizNumber: randomNumber });
    if (!card) {
      return String(randomNumber);
    }
  }
};

exports.validateCard = (_card) => {
  const schema = Joi.object({
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024),
  });

  return schema.validate(_card, {
    abortEarly: false,
  });
};
