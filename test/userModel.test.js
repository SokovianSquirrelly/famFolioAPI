import chai from "chai";
const { expect } = chai;
import mongoose from "mongoose";
import User from "../models/userModel.js";

describe("User Model", () => {
  // SETUP
  before(async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connection successful");
    } catch (error) {
      console.error("MongoDB connection failed: ", error);
      process.exit(1);
    }
  });

  // TEARDOWN
  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe("User Schema", () => {
    it("should require userId field", () => {
      // SETUP
      const user = new User();

      // EXERCISE & VERIFY
      user.validate((err) => {
        expect(err.errors.userId).to.exist;
      });

      // TEARDOWN
    });

    it("should require accountType field", () => {
      // SETUP
      const user = new User();

      // EXERCISE & VERIFY
      user.validate((err) => {
        expect(err.errors.accountType).to.exist;
      });

      // TEARDOWN
    });

    it("should save a valid user", async () => {
      // SETUP
      const validUser = new User({
        userId: "TestUser",
        accountType: "TestAccountType",
      });

      // EXERCISE
      const savedUser = await validUser.save();

      // VERIFY
      expect(savedUser.userId).to.equal("TestUser");
      expect(savedUser.accountType).to.equal("TestAccountType");

      // TEARDOWN
      await User.deleteOne({ _id: savedUser._id });
    });
  });
});
