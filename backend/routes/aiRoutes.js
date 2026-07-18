const express = require("express");

const router = express.Router();

const {
  getInvestigation,
} = require("../controllers/aiController");

router.get("/", getInvestigation);

module.exports = router;