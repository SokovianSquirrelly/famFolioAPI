import chai from "chai";
const { expect } = chai;
import mongoose from "mongoose";
import Genre from "../models/genreModel.js";

describe("Genre Model", () => {
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

  describe("Genre Schema", () => {
    it("should require name field", () => {
      // SETUP
      const genre = new Genre();

      // EXERCISE & VERIFY
      genre.validate((err) => {
        expect(err.errors.name).to.exist;
      });

      // TEARDOWN is not necessary here as no persistent changes were made during the test
    });

    it("should require description field", () => {
      // SETUP
      const genre = new Genre();

      // EXERCISE & VERIFY
      genre.validate((err) => {
        expect(err.errors.description).to.exist;
      });

      // TEARDOWN is not necessary here as no persistent changes were made during the test
    });

    it("should save a valid genre", async () => {
      // SETUP
      const validGenre = new Genre({
        name: "Test Genre",
        description: "This is a test genre",
      });

      // EXERCISE
      const savedGenre = await validGenre.save();

      // VERIFY
      expect(savedGenre.name).to.equal("Test Genre");
      expect(savedGenre.description).to.equal("This is a test genre");

      // TEARDOWN
      await Genre.deleteOne({ _id: savedGenre._id });
    });
  });
});
