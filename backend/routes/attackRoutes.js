const express = require("express");

const router = express.Router();

const {
  getAllAttacks,
} = require("../controllers/attackController");

router.get("/", getAllAttacks);

module.exports = router;