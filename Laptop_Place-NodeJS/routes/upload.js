const express = require("express");
const fs = require("fs");
const { authToken } = require("../middleware/authToken");

let router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "upload route" });
});

router.post("/", authToken, (req, res) => {
  let myFile = req.files.myFile;
  let user_id = req.userToken._id;
  if (!myFile) {
    res.status(400).json({ message: "you must send file!" });
  }
  if (!fs.existsSync(`public/users_images/${user_id}`)) {
    fs.mkdirSync(`public/users_images/${user_id}`);
  } else if (myFile.size >= 5 * 1024 * 1024) {
    return res.status(400).json({ message: "Error, file zise is too big" });
  }

  myFile.mv(
    `public/users_images/${user_id}/` +
      req.userToken._id +
      "_" +
      Date.now() +
      "_" +
      myFile.name,
    (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      res.json({ message: "file uploaded" });
    }
  );
});

module.exports = router;
