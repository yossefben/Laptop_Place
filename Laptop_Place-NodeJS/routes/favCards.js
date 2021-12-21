const express = require("express");
const { UserModel } = require("../models/userModel");
const { authToken } = require("../Middleware/authToken");
const { CardModel } = require("../models/cardModel");

let router = express.Router();

router.get("/myFavs", authToken, async (req, res) => {
  let PerPage = 100;
  let page = req.query.page ? req.query.page * PerPage : 0;
  let sortBy = req.query.sort ? req.query.sort : "bizName";
  let sortOrder = req.query.reverse == "true" ? -1 : 1;
  try {
    let userData = await UserModel.findOne({
      _id: req.userToken._id,
    });

    let myFavs = userData.favCards;

    let card = await CardModel.find({
      _id: myFavs,
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

router.patch("/add/:id", authToken, async (req, res) => {
  try {
    let userData = await UserModel.findOne(
      { _id: req.userToken._id },
      { password: 0 }
    );

    let temp_ar = userData.favCards;

    if (temp_ar.includes(req.params.id)) {
      return res
        .status(400)
        .json({ err: "This Card is already in your favorites" });
    }

    temp_ar.push(req.params.id);

    let favCardsUpdated = await UserModel.updateOne(
      { _id: req.userToken._id },
      { favCards: temp_ar }
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

    let temp_ar = userData.favCards;

    if (!temp_ar.includes(req.params.id)) {
      return res
        .status(404)
        .json({ err: "The Card was not found in your favorites" });
    }

    temp_ar.splice(temp_ar.indexOf(req.params.id), 1);

    let favCardsUpdated = await UserModel.updateOne(
      { _id: req.userToken._id },
      { favCards: temp_ar }
    );

    let favorite_card_deleted = req.params.id;
    res.status(200).json({
      msg: "Favorite card deleted with success",
      favorite_card_deleted,
      userData,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message, stack: err.stack });
  }
});

module.exports = router;
