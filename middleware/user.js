const User = require("../models/userModel");

async function checkUser(req, res, next) {
  // Get the user ID from the token
  const userId = req.auth.payload.sub;

  try {
    // Check if the user exists in the database
    let user = await User.findOne({ userId });

    // If the user doesn't exist, add them to the database
    if (!user) {
      // Create a new user with the user ID and account type ID
      user = new User({ userId, accountType: "user" });
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
}

function checkManager(req, res, next) {
  if (req.user.accountType === "manager" || req.user.accountType === "admin") {
    next();
  } else {
    res.status(403).send("Forbidden Access.");
  }
}

function checkAdmin(req, res, next) {
  if (req.user.accountType === "admin") {
    next();
  } else {
    res.status(403).send("Forbidden Access.");
  }
}

module.exports = { checkUser, checkManager, checkAdmin };
