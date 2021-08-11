const express = require("express");
const router = express.Router();

// @route      GET api/contact
// @desc       get all user contacts
// access      Private
router.get("/", (req, res) => {
  res.send({ msg: "get all contact" });
});

// @route      POST api/contact
// @desc       add a new contact
// access      Private
router.post("/", (req, res) => {
  res.send({ msg: "get logged in user" });
});

// @route      PUT api/contact
// @desc       update contact
// access      Private
router.put("/:id", (req, res) => {
  res.send({ msg: "user updated" });
});

// @route      DELETE api/contact
// @desc       contact deleted
// access      Private
router.put("/:id", (req, res) => {
  res.send({ msg: "user deleted" });
});

module.exports = router;
