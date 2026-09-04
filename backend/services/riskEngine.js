function calculateRisk({
  vulnerabilityRisk,
  threatExposure,
  attackActivity,
  assetCriticality,
}) {
  const vulnerability = Number(vulnerabilityRisk) || 0;
  const threat = Number(threatExposure) || 0;
  const attack = Number(attackActivity) || 0;
  const criticality = Number(assetCriticality) || 0;

  const overallRisk = Math.round(
    vulnerability * 0.30 +
    threat * 0.25 +
    attack * 0.20 +
    criticality * 0.25
  );

  let riskLevel;

  if (overallRisk >= 75) {
    riskLevel = "Critical";
  } else if (overallRisk >= 50) {
    riskLevel = "High";
  } else if (overallRisk >= 25) {
    riskLevel = "Medium";
  } else {
    riskLevel = "Low";
  }

  return {
    overallRisk,
    riskLevel,
    components: {
      vulnerabilityRisk: vulnerability,
      threatExposure: threat,
      attackActivity: attack,
      assetCriticality: criticality,
    },
  };
}

module.exports = {
  calculateRisk,
};