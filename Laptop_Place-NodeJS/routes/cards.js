const express = require("express");
const { authToken } = require("../Middleware/authToken");
const {
  validateCard,
  generateBizNumber,
  CardModel,
} = require("../models/cardModel");

let router = express.Router();

router.delete("/del/:id", authToken, async (req, res) => {
  try {
    let card = await CardModel.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userToken._id,
    });

    if (!card) {
      return res.status(404).json({
        msg: "The Card with the given id was not found or you are not the owner of this card",
      });
    }
    res.json({ msg: "card Deleted : ", card });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.get("/all", async (req, res) => {
  let PerPage = 100;
  let page = req.query.page ? req.query.page * PerPage : 0;
  let sortBy = req.query.sort ? req.query.sort : "bizName";
  let sortOrder = req.query.reverse == "true" ? -1 : 1;

  try {
    let card = await CardModel.find({})
      .limit(PerPage)
      .skip(page)
      .sort({ [sortBy]: sortOrder });
    res.json(card);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.get("/myCards", authToken, async (req, res) => {
  let PerPage = 100;
  let page = req.query.page ? req.query.page * PerPage : 0;
  let sortBy = req.query.sort ? req.query.sort : "bizName";
  let sortOrder = req.query.reverse == "true" ? -1 : 1;
  if (!req.userToken.biz) {
    return res.status(401).json("access Denied");
  }
  try {
    let card = await CardModel.find({
      user_id: req.userToken._id,
    })
      .limit(PerPage)
      .skip(page)
      .sort({ [sortBy]: sortOrder });
    res.json(card);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.get("/search/", authToken, async (req, res) => {
  let PerPage = 100;
  let page = req.query.page ? req.query.page * PerPage : 0;
  let sortBy = req.query.sort ? req.query.sort : "bizName";
  let sortOrder = req.query.reverse == "true" ? -1 : 1;
  let expsortOrder = new RegExp(sortOrder, "i");
  let searchQ = req.query.q;
  let expSearchQ = new RegExp(searchQ, "i");
  try {
    let card = await CardModel.find({
      $or: [{ bizName: expSearchQ }, { bizDescription: expSearchQ }],
    })
      .limit(PerPage)
      .skip(page)
      .sort({ [sortBy]: expsortOrder });
    res.json(card);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.get("/single/:id", authToken, async (req, res) => {
  try {
    let card = await CardModel.findOne({
      _id: req.params.id,
    });
    if (!card) {
      return res.status(404).json("The Card with the given id was not found");
    }
    res.json(card);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.post("/add", authToken, async (req, res) => {
  let { error } = validateCard(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  try {
    let card = new CardModel(req.body);
    card.user_id = req.userToken._id;
    card.bizNumber = await generateBizNumber(CardModel);

    let defaultCardImg =
      "https://laurenceortegat.com/wp-content/uploads/2020/11/placeholder-16-9.jpg";
    card.bizImage = card.bizImage || defaultCardImg;

    let cardData = await card.save();

    res.status(201).json(cardData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

router.put("/edit/:id", authToken, async (req, res) => {
  let { error } = validateCard(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  try {
    let defaultCardImg =
      "https://laurenceortegat.com/wp-content/uploads/2020/11/placeholder-16-9.jpg";
    req.body.bizImage = req.body.bizImage || defaultCardImg;

    let cardUpdated = await CardModel.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.userToken._id,
      },
      req.body
    );

    if (!cardUpdated) {
      return res.status(404).json({
        msg: "The Card with the given id was not found or you are not the owner of this card",
      });
    }
    res.json(cardUpdated);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});
module.exports = router;
