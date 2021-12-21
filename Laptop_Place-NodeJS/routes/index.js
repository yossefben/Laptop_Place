const express = require("express");

let router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "index laptop OK" });
});

module.exports = router;
