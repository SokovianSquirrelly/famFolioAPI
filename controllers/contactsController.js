const mongoose = require("mongoose");
const contactModel = require("../models/contactSchema");
const contactController = {};

// GET REQUESTS
// GET all contacts
contactController.getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET contact by id
contactController.getContactById = async (req, res) => {
  try {
    const contact = await contactModel.findById(req.params.id);
    if (contact == null) {
      return res.status(404).json({ message: "Cannot find contact" });
    }
    res.json(contact);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST REQUESTS

// POST new contact
contactController.addContact = async (req, res) => {
  const contact = new contactModel(req.body);
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT REQUESTS

// PUT update contact
contactController.updateContact = async (req, res) => {
  try {
    const updatedContact = await contactModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE REQUESTS

// DELETE contact
contactController.deleteContact = async (req, res) => {
  try {
    const contact = await contactModel.findOne({ _id: req.params.id });
    if (contact) {
      await contactModel.deleteOne({ _id: req.params.id });
      res.json({ message: "Deleted contact" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = contactController;
