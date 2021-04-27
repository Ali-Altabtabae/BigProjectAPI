const { Field } = require("../db/models");

// List Fields
exports.fieldList = async (req, res) => {
  try {
    const fields = await Field.findAll({});
    res.json(fields);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Field

exports.fieldCreate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newField = await Field.create(req.body);
    res.status(201).json(newField);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Field

exports.fieldUpdate = async (req, res) => {
  const { fieldId } = req.params;
  try {
    const foundField = await Field.findByPk(fieldId);
    if (foundField) {
      await foundField.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Field not Found " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete Field

exports.fieldDelete = async (req, res) => {
  const { fieldId } = req.params;
  try {
    const foundField = await Field.findByPk(fieldId);
    if (foundField) {
      await foundField.destroy(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Field not Found " });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//
