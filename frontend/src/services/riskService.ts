export interface RiskInput {
  vulnerabilityRisk: number;
  threatExposure: number;
  attackActivity: number;
  assetCriticality: number;
  budget: number;
}

export interface SecurityControl {
  name: string;
  description: string;
  cost: number;
  riskReduction: number;
  priority: string;
}

export interface RiskResponse {
  success: boolean;

  risk: {
    overallRisk: number;
    riskLevel: string;
    components: {
      vulnerabilityRisk: number;
      threatExposure: number;
      attackActivity: number;
      assetCriticality: number;
    };
  };

  financial: {
    estimatedExposure: number;
    currency: string;
    note: string;
  };

  investment: {
    budget: number;
    recommendedControls: SecurityControl[];
    totalInvestment: number;
    expectedRiskReduction: number;
    projectedRisk: number;
    remainingBudget: number;
  };
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

export async function quantifyCyberRisk(
  input: RiskInput
): Promise<RiskResponse> {
  const response = await fetch(`${API_BASE_URL}/api/risk/quantify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.error || "Failed to quantify cyber risk."
    );
  }

  return response.json();
}