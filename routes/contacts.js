const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const auth = require("../middelware/auth");
const Contact = require("../models/Contact");

// @route      GET api/contact
// @desc       get all user contacts
// access      Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route      POST api/contact
// @desc       add a new contact
// access      Private
router.post(
  "/",
  [auth, [check("name", "name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("server error");
    }
  }
);

// @route      PUT api/contact
// @desc       update contact
// access      Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  // build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    // make sure user own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );
    return res.json(contact);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("server erreur");
  }
});

// @route      DELETE api/contact
// @desc       contact deleted
// access      Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });
    // make sure user own contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    return res.json({ msg: "contact removed" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("server erreur");
  }
});

module.exports = router;
