import { useEffect, useState } from "react";
import { quantifyCyberRisk } from "../../services/riskService";
import type { RiskResponse } from "../../services/riskService";

import {
  getRiskSignals,
  subscribeToRiskSignals,
} from "../../services/riskSignalService";

export default function CyberRiskCenter() {
  const [vulnerabilityRisk, setVulnerabilityRisk] = useState(70);
  const [threatExposure, setThreatExposure] = useState(60);
  const [attackActivity, setAttackActivity] = useState(50);
  const [assetCriticality, setAssetCriticality] = useState(80);
  const [budget, setBudget] = useState(1000000);

  const [result, setResult] = useState<RiskResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  const updateFromSignals = () => {
    const signals = getRiskSignals();

    if (
      typeof signals.vulnerabilityRisk === "number"
    ) {
      setVulnerabilityRisk(
        signals.vulnerabilityRisk
      );
    }

    if (
  typeof signals.threatExposure === "number"
) {
  setThreatExposure(
    signals.threatExposure
  );
}

if (
  typeof signals.attackActivity === "number"
) {
  setAttackActivity(
    signals.attackActivity
  );
}
  };

  updateFromSignals();

  return subscribeToRiskSignals(
    updateFromSignals
  );
}, []);

  const handleQuantifyRisk = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await quantifyCyberRisk({
        vulnerabilityRisk,
        threatExposure,
        attackActivity,
        assetCriticality,
        budget,
      });

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to calculate cyber risk. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Cyber Risk & Investment Center
          </h1>

          <p className="text-slate-400 mt-2">
            Quantify cyber risk, estimate financial exposure, and optimize
            security investments.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">

          <h2 className="text-xl font-semibold mb-6">
            Risk Assessment Inputs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Vulnerability Risk */}
            <RiskSlider
              label="Vulnerability Risk"
              value={vulnerabilityRisk}
              setValue={setVulnerabilityRisk}
            />

            {/* Threat Exposure */}
            <RiskSlider
              label="Threat Exposure"
              value={threatExposure}
              setValue={setThreatExposure}
            />

            {/* Attack Activity */}
            <RiskSlider
              label="Attack Activity"
              value={attackActivity}
              setValue={setAttackActivity}
            />

            {/* Asset Criticality */}
            <RiskSlider
              label="Asset Criticality"
              value={assetCriticality}
              setValue={setAssetCriticality}
            />

          </div>

          {/* Budget */}
          <div className="mt-6">
            <label className="block text-sm text-slate-300 mb-2">
              Security Budget (₹)
            </label>

            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full md:w-1/2 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-cyan-500"
              min="0"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleQuantifyRisk}
            disabled={loading}
            className="mt-6 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Calculating..." : "Quantify Cyber Risk"}
          </button>

          {error && (
            <p className="mt-4 text-red-400">
              {error}
            </p>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">

            {/* Risk Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <ResultCard
                title="Overall Risk"
                value={`${result.risk.overallRisk}/100`}
                subtitle={result.risk.riskLevel}
              />

              <ResultCard
                title="Financial Exposure"
                value={formatCurrency(
                  result.financial.estimatedExposure
                )}
                subtitle="Estimated exposure"
              />

              <ResultCard
                title="Projected Risk"
                value={`${result.investment.projectedRisk}/100`}
                subtitle="After recommended investment"
              />

            </div>

            {/* Risk Components */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

              <h2 className="text-xl font-semibold mb-5">
                Risk Components
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <Metric
                  label="Vulnerability"
                  value={result.risk.components.vulnerabilityRisk}
                />

                <Metric
                  label="Threat Exposure"
                  value={result.risk.components.threatExposure}
                />

                <Metric
                  label="Attack Activity"
                  value={result.risk.components.attackActivity}
                />

                <Metric
                  label="Asset Criticality"
                  value={result.risk.components.assetCriticality}
                />

              </div>
            </div>

            {/* Investment */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

              <h2 className="text-xl font-semibold mb-5">
                Recommended Security Investment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                <Metric
                  label="Security Budget"
                  value={formatCurrency(result.investment.budget)}
                />

                <Metric
                  label="Total Investment"
                  value={formatCurrency(
                    result.investment.totalInvestment
                  )}
                />

                <Metric
                  label="Remaining Budget"
                  value={formatCurrency(
                    result.investment.remainingBudget
                  )}
                />

              </div>

              {/* Controls */}
              <div className="space-y-3">

                {result.investment.recommendedControls.length === 0 ? (
                  <p className="text-slate-400">
                    No security controls can be recommended within the
                    available budget.
                  </p>
                ) : (
                  result.investment.recommendedControls.map((control) => (
                    <div
                      key={control.name}
                      className="flex flex-col md:flex-row md:items-center md:justify-between bg-slate-800 rounded-lg p-4"
                    >
                      <div>
                        <h3 className="font-semibold">
                          {control.name}
                        </h3>

                        <p className="text-sm text-slate-400">
                          {control.description}
                        </p>
                      </div>

                      <div className="mt-3 md:mt-0 text-left md:text-right">
                        <p className="font-semibold">
                          {formatCurrency(control.cost)}
                        </p>

                        <p className="text-sm text-cyan-400">
                          {control.riskReduction}% risk reduction
                        </p>
                      </div>
                    </div>
                  ))
                )}

              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

                <Metric
                  label="Expected Risk Reduction"
                  value={`${result.investment.expectedRiskReduction}%`}
                />

                <Metric
                  label="Projected Risk"
                  value={`${result.investment.projectedRisk}/100`}
                />

              </div>

            </div>

            {/* Disclaimer */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <p className="text-sm text-slate-400">
                ⚠️ {result.financial.note}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

interface RiskSliderProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
}

function RiskSlider({
  label,
  value,
  setValue,
}: RiskSliderProps) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm text-slate-300">
          {label}
        </label>

        <span className="text-cyan-400 font-semibold">
          {value}
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

interface ResultCardProps {
  title: string;
  value: string;
  subtitle: string;
}

function ResultCard({
  title,
  value,
  subtitle,
}: ResultCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

      <p className="text-cyan-400 mt-2">
        {subtitle}
      </p>
    </div>
  );
}

interface MetricProps {
  label: string;
  value: string | number;
}

function Metric({
  label,
  value,
}: MetricProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <p className="text-sm text-slate-400">
        {label}
      </p>

      <p className="text-xl font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}