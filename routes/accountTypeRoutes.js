const express = require("express");
const router = express.Router();
const accountTypeController = require("../controllers/accountTypeController");
const utilities = require("../utilities");
const validate = require("../utilities/accountTypeValidator");

// Routes

// GET all account types
router.get(
  "/",
  utilities.handleErrors(accountTypeController.getAllAccountTypes)
);

// GET single account type by id
router.get(
  "/:id",
  // validate.validateId,
  utilities.handleErrors(accountTypeController.getAccountTypeById)
);

// POST new account type
router.post(
  "/",
  // validate.validateAccountType,
  utilities.handleErrors(accountTypeController.addAccountType)
);

// PUT update account type
router.put(
  "/:id",
  // validate.validateUpdateAccountType,
  utilities.handleErrors(accountTypeController.updateAccountType)
);

// DELETE account type
router.delete(
  "/:id",
  // validate.validateDeleteAccountType,
  utilities.handleErrors(accountTypeController.deleteAccountType)
);

module.exports = router;
