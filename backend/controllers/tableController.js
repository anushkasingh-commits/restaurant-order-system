const Table = require("../models/Table")

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.status(200).json(tables);
  } catch (error) {
    next(error);
  }
}
const getTableById = async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      const error = new Error("Table not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(table);
  } catch (error) {
    next(error);
  }
}
const createTable = async (req, res, next) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (error) {
    next(error);
  }
}
const updateTable = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!table) {
      const error = new Error("Table not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(table);
  } catch (error) {
    next(error);
  }
}
const deleteTable = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    if (!table) {
      const error = new Error("Table not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Table deleted" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getTables, getTableById, createTable, updateTable, deleteTable,
};