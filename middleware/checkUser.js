const User = require("../models/userModel");
const AccountType = require("../models/accountType");

module.exports = async function checkUser(req, res, next) {
  // Get the user ID from the token
  const userId = req.user.sub;

  try {
    // Check if the user exists in the database
    let user = await User.findOne({ userId });

    // If the user doesn't exist, add them to the database
    if (!user) {
      // Create a new account type for the user
      const accountType = new AccountType({ type: "user" });
      await accountType.save();

      // Create a new user with the user ID and account type ID
      user = new User({ userId, accountTypeId: accountType._id });
      await user.save();
    }

    // Add the user to the request object
    req.user = user;

    // Continue to the next middleware function
    next();
  } catch (error) {
    // If an error occurred, send a 500 response
    res.status(500).send("Server error");
  }
};
