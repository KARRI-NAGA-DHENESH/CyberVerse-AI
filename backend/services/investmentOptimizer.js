const SECURITY_CONTROLS = [
  {
    name: "MFA",
    description: "Multi-Factor Authentication",
    cost: 100000,
    riskReduction: 15,
    priority: "High",
  },
  {
    name: "WAF",
    description: "Web Application Firewall",
    cost: 200000,
    riskReduction: 20,
    priority: "High",
  },
  {
    name: "EDR",
    description: "Endpoint Detection and Response",
    cost: 300000,
    riskReduction: 25,
    priority: "Critical",
  },
  {
    name: "SIEM",
    description: "Security Information and Event Management",
    cost: 250000,
    riskReduction: 18,
    priority: "High",
  },
  {
    name: "Backup",
    description: "Secure Backup and Recovery",
    cost: 150000,
    riskReduction: 12,
    priority: "Medium",
  },
];

function optimizeInvestment(budget, currentRisk) {
  const availableBudget = Number(budget) || 0;

  if (availableBudget <= 0) {
    return {
      recommendedControls: [],
      totalInvestment: 0,
      expectedRiskReduction: 0,
      projectedRisk: currentRisk,
      remainingBudget: 0,
    };
  }

  // Generate all possible combinations of the 5 security controls.
  // This is a small optimization problem, so checking every combination
  // gives us a reliable best result without external libraries.
  let bestCombination = [];
  let bestReduction = 0;
  let bestCost = 0;

  const totalCombinations = Math.pow(2, SECURITY_CONTROLS.length);

  for (let mask = 0; mask < totalCombinations; mask++) {
    const selected = [];

    let totalCost = 0;
    let totalReduction = 0;

    for (let i = 0; i < SECURITY_CONTROLS.length; i++) {
      if (mask & (1 << i)) {
        const control = SECURITY_CONTROLS[i];

        totalCost += control.cost;
        totalReduction += control.riskReduction;

        selected.push(control);
      }
    }

    if (totalCost > availableBudget) {
      continue;
    }

    if (
      totalReduction > bestReduction ||
      (totalReduction === bestReduction && totalCost < bestCost)
    ) {
      bestCombination = selected;
      bestReduction = totalReduction;
      bestCost = totalCost;
    }
  }

  // Risk cannot go below zero.
  const projectedRisk = Math.max(
    0,
    Math.round(currentRisk * (1 - bestReduction / 100))
  );

  return {
    recommendedControls: bestCombination,
    totalInvestment: bestCost,
    expectedRiskReduction: bestReduction,
    projectedRisk,
    remainingBudget: availableBudget - bestCost,
  };
}

module.exports = {
  optimizeInvestment,
  SECURITY_CONTROLS,
};