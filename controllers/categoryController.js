const mongoose = require("mongoose");
const Category = require("../models/categoryModel");

const categoryController = {};

// GET all categories
categoryController.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET category by id
categoryController.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: "Cannot find category" });
    }
    res.json(category);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST new category
categoryController.addCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update category
categoryController.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE category
categoryController.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (category) {
      await Category.deleteOne({ _id: req.params.id });
      res.json({ message: "Deleted category" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = categoryController;
