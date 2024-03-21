import chai from "chai";
const { expect } = chai;
import mongoose from "mongoose";
import Category from "../models/categoryModel.js";

describe("Category Model", () => {
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

  describe("Category Schema", () => {
    it("should require name field", () => {
      // SETUP
      const category = new Category();

      // EXERCISE & VERIFY
      category.validate((err) => {
        expect(err.errors.name).to.exist;
      });

      // TEARDOWN is not necessary here as no persistent changes were made during the test
    });

    it("should require description field", () => {
      // SETUP
      const category = new Category();

      // EXERCISE & VERIFY
      category.validate((err) => {
        expect(err.errors.description).to.exist;
      });

      // TEARDOWN is not necessary here as no persistent changes were made during the test
    });

    it("should save a valid category", async () => {
      // SETUP
      const validCategory = new Category({
        name: "Test Category",
        description: "This is a test category",
      });

      // EXERCISE
      const savedCategory = await validCategory.save();

      // VERIFY
      expect(savedCategory.name).to.equal("Test Category");
      expect(savedCategory.description).to.equal("This is a test category");

      // TEARDOWN
      await Category.deleteOne({ _id: savedCategory._id });
    });
  });
});
