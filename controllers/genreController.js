import mongoose from "mongoose";
import Genre from "../models/genreModel.js";
const genreController = {};

// GET all genres
genreController.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET genre by id
genreController.getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (genre == null) {
      return res.status(404).json({ message: "Cannot find genre" });
    }
    res.json(genre);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST new genre
genreController.addGenre = async (req, res) => {
  const genre = new Genre(req.body);
  try {
    const newGenre = await genre.save();
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update genre
genreController.updateGenre = async (req, res) => {
  try {
    const updatedGenre = await Genre.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedGenre) {
      res.json(updatedGenre);
    } else {
      res.status(404).json({ message: "Genre not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE genre
genreController.deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    if (genre) {
      await Genre.deleteOne({ _id: req.params.id });
      res.json({ message: "Deleted genre" });
    } else {
      res.status(404).json({ message: "Genre not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST bulk genres
genreController.addBulkGenres = async (req, res) => {
  try {
    const newGenres = await Genre.insertMany(req.body);
    res.status(201).json(newGenres);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT bulk update genres
genreController.updateBulkGenres = async (req, res) => {
  try {
    const updatedGenres = req.body.map(async (genre) => {
      return await Genre.findOneAndUpdate({ _id: genre._id }, genre, {
        new: true,
      });
    });
    const results = await Promise.all(updatedGenres);
    res.json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE bulk genres
genreController.deleteBulkGenres = async (req, res) => {
  try {
    const deletedGenres = req.body.map(async (genreId) => {
      return await Genre.deleteOne({ _id: genreId });
    });
    await Promise.all(deletedGenres);
    res.json({ message: "Deleted genres" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default genreController;
