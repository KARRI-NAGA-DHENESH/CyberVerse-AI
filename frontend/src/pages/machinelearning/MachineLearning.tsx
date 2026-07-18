import DashboardLayout from "../../components/layout/DashboardLayout";

import PhishingDetector from "../../components/ml/PhishingDetector";
import IntrusionDetector from "../../components/ml/IntrusionDetector";
import MalwareClassifier from "../../components/ml/MalwareClassifier";
import ModelStatistics from "../../components/ml/ModelStatistics";
import ModelHealth from "../../components/ml/ModelHealth";
import SystemPerformance from "../../components/ml/SystemPerformance";

function MachineLearning() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* ===========================
            Header
        =========================== */}

        <div>

          <h1 className="text-4xl font-bold text-cyan-400">
            🧠 Machine Learning Security Center
          </h1>

          <p className="mt-2 text-gray-400">
            AI Powered Cyber Defense Platform
          </p>

        </div>

        {/* ===========================
            Top Row
        =========================== */}

        <div className="grid gap-8 lg:grid-cols-2">

          <PhishingDetector />

          <IntrusionDetector />

        </div>

        {/* ===========================
            Bottom Row
        =========================== */}

        <MalwareClassifier />

        <ModelStatistics />

        <ModelHealth />

        <SystemPerformance />

      </div>
    </DashboardLayout>
  );
}

export default MachineLearning;