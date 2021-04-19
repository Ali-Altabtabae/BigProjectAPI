const express = require("express");
const router = express.Router();
const {
  fieldList,
  fieldCreate,
  fieldUpdate,
  fieldDelete,
} = require("../controllers/fieldController");

// Get Fields
router.get("/", fieldList);
// Create field
router.post("/addField", fieldCreate);

// Update Field
router.put("/:fieldId/updateField", fieldUpdate);

// Delete Field
router.delete("/:fieldId/deleteField", fieldDelete);

module.exports = router;
