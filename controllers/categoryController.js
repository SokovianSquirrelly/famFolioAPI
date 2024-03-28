import mongoose from "mongoose";
import Category from "../models/categoryModel.js";

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

// POST bulk categories
categoryController.addBulkCategories = async (req, res) => {
  try {
    const newCategories = await Category.insertMany(req.body);
    res.status(201).json(newCategories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT bulk update categories
categoryController.updateBulkCategories = async (req, res) => {
  try {
    const updatedCategories = req.body.map(async (category) => {
      return await Category.findOneAndUpdate({ _id: category._id }, category, {
        new: true,
      });
    });
    const results = await Promise.all(updatedCategories);
    res.json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE bulk categories
categoryController.deleteBulkCategories = async (req, res) => {
  try {
    const deletedCategories = req.body.map(async (categoryId) => {
      return Category.deleteOne({ _id: categoryId });
    });
    await Promise.all(deletedCategories);
    res.json({ message: "Deleted categories" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default categoryController;
