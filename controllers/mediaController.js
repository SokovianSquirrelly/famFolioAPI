const mongoose = require("mongoose");
const Media = require("../models/mediaModel");

const mediaController = {};

// GET all media
mediaController.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET media by id
mediaController.getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (media == null) {
      return res.status(404).json({ message: "Cannot find media" });
    }
    res.json(media);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST new media
mediaController.addMedia = async (req, res) => {
  const media = new Media(req.body);
  try {
    const newMedia = await media.save();
    res.status(201).json(newMedia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update media
mediaController.updateMedia = async (req, res) => {
  try {
    const updatedMedia = await Media.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedMedia) {
      res.json(updatedMedia);
    } else {
      res.status(404).json({ message: "Media not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE media
mediaController.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findOne({ _id: req.params.id });
    if (media) {
      await Media.deleteOne({ _id: req.params.id });
      res.json({ message: "Deleted media" });
    } else {
      res.status(404).json({ message: "Media not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = mediaController;
