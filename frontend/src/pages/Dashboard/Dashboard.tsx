import { motion } from "framer-motion";
import { lazy } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

/* ===========================
   Core Dashboard Components
=========================== */

import StatusCard from "../../components/cyber/StatusCard";
import ThreatChart from "../../components/cyber/ThreatChart";
import ActivityFeed from "../../components/cyber/ActivityFeed";
import AIInsight from "../../components/cyber/AIInsight";
import SystemHealth from "../../components/cyber/SystemHealth";
import SOCAlert from "../../components/cyber/SOCAlert";
import CyberTerminal from "../../components/cyber/CyberTerminal";
import AttackTimeline from "../../components/cyber/AttackTimeline";

/* ===========================
   Network Components
=========================== */



/* ===========================
   AI Security Tools
=========================== */

import AICopilot from "../../components/copilot/AICopilot";
import LogAnalyzer from "../../components/logs/LogAnalyzer";
import CVESearch from "../../components/cve/CVESearch";
import IOCExtractor from "../../components/ioc/IOCExtractor";
import ThreatLookup from "../../components/threatintel/ThreatLookup";

/* ===========================
   Simulator
=========================== */

import AttackSimulator from "../../components/simulator/AttackSimulator";

/* ===========================
   Dashboard Widgets
=========================== */

import ThreatTrendChart from "../../components/dashboard/ThreatTrendChart";
import AttackDistribution from "../../components/dashboard/AttackDistribution";
import TopTargetCountries from "../../components/dashboard/TopTargetCountries";
import ThreatSeverity from "../../components/dashboard/ThreatSeverity";
import AttackRanking from "../../components/dashboard/AttackRanking";
import LiveSecurityMetrics from "../../components/dashboard/LiveSecurityMetrics";
import AnalyticsCard from "../../components/dashboard/AnalyticsCard";

/* ===========================
   Attack Engine
=========================== */

import LiveAttackFeed from "../../components/attacks/LiveAttackFeed";
import AttackStatistics from "../../components/attacks/AttackStatistics";

/* ===========================
   Alerts
=========================== */

import AlertCenter from "../../components/alerts/AlertCenter";
import IncidentDetails from "../../components/alerts/IncidentDetails";

/* ===========================
   AI Advisor
=========================== */

import AIThreatAdvisor from "../../components/advisor/AIThreatAdvisor";
const WorldMap = lazy(
  () => import("../../components/cyber/WorldMap")
);

const NetworkTopology = lazy(
  () => import("../../components/network/NetworkTopology")
);

const AIIncidentReport = lazy(
  () => import("../../components/investigation/AIIncidentReport")
);

const ThreatIntelligenceCenter = lazy(
  () => import("../../components/threatcenter/ThreatIntelligenceCenter")
);
function Dashboard() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-10"
      >

        {/* ===========================
            Header
        ============================ */}

       <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-[#07111F] via-[#0B1628] to-[#07111F] p-8 shadow-[0_0_35px_rgba(0,229,255,.12)]"
>

  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

  <div className="relative z-10">

    <p className="mb-2 text-sm font-semibold uppercase tracking-[6px] text-cyan-400">
      ENTERPRISE SECURITY OPERATIONS CENTER
    </p>

    <h1 className="text-5xl font-extrabold text-white">
      CyberVerse AI
    </h1>

    <p className="mt-4 max-w-3xl text-gray-400">
      Real-time cyber threat detection, AI-powered incident investigation,
      global threat intelligence, and enterprise SOC monitoring.
    </p>

  </div>

</motion.div>

        {/* ===========================
            SOC Alert Banner
        ============================ */}

        <SOCAlert />

        {/* ===========================
            Status Cards
        ============================ */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatusCard
            title="Threat Level"
            value="LOW"
            color="#22c55e"
          />

          <StatusCard
            title="Devices Online"
            value="184"
            color="#00E5FF"
          />

          <StatusCard
            title="Blocked Attacks"
            value="27"
            color="#ef4444"
          />

          <StatusCard
            title="AI Status"
            value="ACTIVE"
            color="#00E5FF"
          />

        </div>
                {/* ===========================
            World Map + Live Activity
        ============================ */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* World Map */}

          <div className="xl:col-span-2">

            <WorldMap />

          </div>

          {/* Live Activity Feed */}

          <div>

            <ActivityFeed />

          </div>

        </div>

        {/* ===========================
            Threat Analytics + System Health
        ============================ */}

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">

          {/* ===========================
              Left Analytics Section
          ============================ */}

          <div className="xl:col-span-2 rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

            <h2 className="mb-6 text-3xl font-bold tracking-wide text-cyan-300">
              📈 Threat Analytics
            </h2>

            {/* Analytics Cards */}

            <div className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">

              <AnalyticsCard
                title="Today's Threats"
                value={48}
                color="#ff3b30"
              />

              <AnalyticsCard
                title="Weekly Investigations"
                value={187}
                color="#00E5FF"
              />

              <AnalyticsCard
                title="Monthly Threats"
                value={942}
                color="#FFD60A"
              />

              <AnalyticsCard
                title="Avg Response"
                value="1.8 min"
                color="#22c55e"
              />

            </div>

            {/* Main Threat Chart */}

            <ThreatChart />

            {/* Threat Intelligence Dashboard */}

            <div className="mt-8 space-y-6">

              {/* Weekly Trend */}

              <ThreatTrendChart />

              {/* Distribution + Severity */}

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <AttackDistribution />

                <ThreatSeverity />

              </div>

              {/* Countries + Rankings */}

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                <TopTargetCountries />

                <AttackRanking />

              </div>

              {/* Live Metrics */}

              <LiveSecurityMetrics />

            </div>

          </div>

          {/* ===========================
              Right Sidebar
          ============================ */}

          <div className="space-y-6">

            <SystemHealth />

          </div>

        </div>
                {/* ===========================
            Enterprise Security Tools
        ============================ */}

       <div className="rounded-3xl border border-cyan-500/15 bg-[#07111F]/60 p-6 backdrop-blur-xl">

  <h2 className="mb-6 text-3xl font-bold tracking-wide text-cyan-300">
    🤖 Enterprise Security Tools
  </h2>

  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

    <AICopilot />

    <LogAnalyzer />

    <CVESearch />

    <IOCExtractor />

    <ThreatLookup />

    <AIInsight />

  </div>

</div>

        {/* ===========================
            Real-Time Security Operations
        ============================ */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ===========================
              Left Section
          ============================ */}

          <div className="xl:col-span-2 space-y-6">

            {/* Attack Simulator */}

            <AttackSimulator />

            {/* Terminal + Timeline */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

              <CyberTerminal />

              <AttackTimeline />

            </div>

          </div>

          {/* ===========================
              Right Sidebar
          ============================ */}

          <div className="space-y-6">

            <AlertCenter />

            <IncidentDetails />

            <AIThreatAdvisor />

          </div>

        </div>
                {/* ===========================
            Enterprise Network
        ============================ */}

        <div>

          <h2 className="mb-6 text-2xl font-bold text-cyan-400">
            🌐 Enterprise Network Monitoring
          </h2>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

            {/* ===========================
                Left Side
            ============================ */}

            <div className="xl:col-span-2">

              <NetworkTopology />

            </div>

            {/* ===========================
                Right Side
            ============================ */}

            <div className="space-y-6">

              <LiveAttackFeed />

              <AttackStatistics />

            </div>

          </div>

        </div>
        {/* ===========================
    AI Incident Investigation Center
=========================== */}

<div>

  <h2 className="mb-6 text-2xl font-bold text-cyan-400">
    🤖 AI Incident Investigation Center
  </h2>

  <AIIncidentReport />

</div>

{/* ===========================
    Global Threat Intelligence
=========================== */}

<div>

  <h2 className="mb-6 text-2xl font-bold text-cyan-400">
    🌍 Global Threat Intelligence Center
  </h2>

  <ThreatIntelligenceCenter />

</div>

</motion.div>
</DashboardLayout>
);
}

export default Dashboard;