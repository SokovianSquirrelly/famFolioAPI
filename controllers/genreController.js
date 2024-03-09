const mongoose = require("mongoose");
const Genre = require("../models/genreModel");

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

module.exports = genreController;
