const express = require("express");

const router = express.Router();

const {
  lookupThreat,
} = require("../controllers/threatController");

router.get("/:ip", lookupThreat);

module.exports = router;