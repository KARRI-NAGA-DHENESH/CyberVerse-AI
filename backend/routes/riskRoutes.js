const express = require("express");

const router = express.Router();

const { quantifyRisk } = require("../controllers/riskController");

// Cyber Risk Quantification
router.post("/quantify", quantifyRisk);

module.exports = router;