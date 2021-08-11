const express = require("express");
const router = express.Router();

// @route      GET api/auth
// @desc       get logged in user
// access      Private
router.get("/", (req, res) => {
  res.send({ msg: "get logged in user" });
});

// @route      POST api/auth
// @desc       get logged in user
// access      Private
router.post("/", (req, res) => {
  res.send({ msg: "get logged in user" });
});

module.exports = router;
