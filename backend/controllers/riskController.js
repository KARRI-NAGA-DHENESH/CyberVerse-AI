const { calculateRisk } = require("../services/riskEngine");
const { optimizeInvestment } = require("../services/investmentOptimizer");

async function quantifyRisk(req, res) {
  try {
    const {
      vulnerabilityRisk,
      threatExposure,
      attackActivity,
      assetCriticality,
      budget,
    } = req.body;

    // Validate required inputs
    const values = [
      vulnerabilityRisk,
      threatExposure,
      attackActivity,
      assetCriticality,
      budget,
    ];

    if (values.some((value) => value === undefined || value === null)) {
      return res.status(400).json({
        success: false,
        error: "All risk inputs and budget are required.",
      });
    }

    // Validate risk values
    const riskInputs = [
      vulnerabilityRisk,
      threatExposure,
      attackActivity,
      assetCriticality,
    ];

    const invalidRisk = riskInputs.some(
      (value) => Number(value) < 0 || Number(value) > 100
    );

    if (invalidRisk) {
      return res.status(400).json({
        success: false,
        error: "Risk values must be between 0 and 100.",
      });
    }

    if (Number(budget) < 0) {
      return res.status(400).json({
        success: false,
        error: "Budget cannot be negative.",
      });
    }

    // Step 1: Calculate overall cyber risk
    const riskResult = calculateRisk({
      vulnerabilityRisk,
      threatExposure,
      attackActivity,
      assetCriticality,
    });

    // Step 2: Optimize security investment
    const investmentResult = optimizeInvestment(
      budget,
      riskResult.overallRisk
    );

    // Step 3: Estimate financial exposure
    // This is a demonstration estimate, not a guaranteed financial loss.
    const riskFactor = riskResult.overallRisk / 100;
const criticalityFactor = riskResult.components.assetCriticality / 100;

// Base potential exposure for a fully critical asset
const baseExposure = 2000000;

// Financial exposure increases with both cyber risk and asset criticality
const estimatedFinancialExposure = Math.round(
  baseExposure *
    riskFactor *
    (0.5 + 0.5 * criticalityFactor)
);

    res.status(200).json({
      success: true,

      risk: {
        overallRisk: riskResult.overallRisk,
        riskLevel: riskResult.riskLevel,
        components: riskResult.components,
      },

      financial: {
        estimatedExposure: estimatedFinancialExposure,
        currency: "INR",
        note: "Estimated exposure based on the platform's risk model; not a guaranteed loss.",
      },

      investment: {
        budget: Number(budget),
        recommendedControls: investmentResult.recommendedControls,
        totalInvestment: investmentResult.totalInvestment,
        expectedRiskReduction: investmentResult.expectedRiskReduction,
        projectedRisk: investmentResult.projectedRisk,
        remainingBudget: investmentResult.remainingBudget,
      },
    });
  } catch (error) {
    console.error("Risk quantification error:", error);

    res.status(500).json({
      success: false,
      error: "Risk quantification failed.",
    });
  }
}

module.exports = {
  quantifyRisk,
};