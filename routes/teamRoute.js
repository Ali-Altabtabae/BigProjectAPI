const express = require("express");
const router = express.Router();

const {
  teamCreate,
  teamList,
  teamUpdate,
  teamDelete,
} = require("../controllers/teamController");

// team List
router.get("/", teamList);

// team Create
router.post("/", teamCreate);

// team Update
router.put("/:teamId", teamUpdate);

//team delete
router.delete("/:teamId", teamDelete);

module.exports = router;