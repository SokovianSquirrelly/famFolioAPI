const mongoose = require("mongoose");
const AccountType = require("../models/accountTypeModel");

const accountTypeController = {};

// GET all account types
accountTypeController.getAllAccountTypes = async (req, res) => {
  try {
    const accountTypes = await AccountType.find();
    res.json(accountTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET account type by id
accountTypeController.getAccountTypeById = async (req, res) => {
  try {
    const accountType = await AccountType.findById(req.params.id);
    if (accountType == null) {
      return res.status(404).json({ message: "Cannot find account type" });
    }
    res.json(accountType);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST new account type
accountTypeController.addAccountType = async (req, res) => {
  const accountType = new AccountType(req.body);
  try {
    const newAccountType = await accountType.save();
    res.status(201).json(newAccountType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update account type
accountTypeController.updateAccountType = async (req, res) => {
  try {
    const updatedAccountType = await AccountType.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedAccountType) {
      res.json(updatedAccountType);
    } else {
      res.status(404).json({ message: "Account type not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE account type
accountTypeController.deleteAccountType = async (req, res) => {
  try {
    const accountType = await AccountType.findOne({ _id: req.params.id });
    if (accountType) {
      await AccountType.deleteOne({ _id: req.params.id });
      res.json({ message: "Deleted account type" });
    } else {
      res.status(404).json({ message: "Account type not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = accountTypeController;
