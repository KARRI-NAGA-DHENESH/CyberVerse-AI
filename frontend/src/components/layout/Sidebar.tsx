import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaChartLine,
  FaRobot,
  FaNetworkWired,
  FaGlobe,
  FaCog,
} from "react-icons/fa";

const menu = [
  {
    icon: <FaShieldAlt />,
    name: "Dashboard",
    path: "/dashboard",
    active: true,
  },
  {
    icon: <FaGlobe />,
    name: "Threat Intelligence",
  },
  {
    icon: <FaNetworkWired />,
    name: "Attack Simulator",
  },
  {
    icon: <FaRobot />,
    name: "AI Assistant",
  },
  {
    icon: <FaChartLine />,
    name: "Reports",
  },
  {
    icon: <FaCog />,
    name: "Settings",
  },
  {
    icon: <FaRobot />,
    name: "Machine Learning",
    path: "/machinelearning",
  },
];

function Sidebar() {
  return (
    <aside className="w-72 flex flex-col border-r border-cyan-400/20 bg-[#050B16]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.08)] transition-all duration-300">

      {/* Logo */}

      <div className="border-b border-cyan-400/20 p-8">

        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold tracking-wide text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]"
        >
          CyberVerse
        </motion.h1>

        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-cyan-500/70">
          AI Security Platform
        </p>

      </div>

      {/* Menu */}

      <div className="flex-1 p-5">

        {menu.map((item, index) => (

          <Link
            key={index}
            to={item.path || "#"}
          >

            <motion.div
              whileHover={{
                x: 8,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`mb-3 flex cursor-pointer items-center gap-4 rounded-xl border px-5 py-4 transition-all duration-300
              ${
                item.active
                  ? "border-cyan-400/30 bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                  : "border-transparent text-gray-400 hover:border-cyan-500/20 hover:bg-cyan-500/5 hover:text-cyan-300"
              }`}
            >

              <div className="text-xl">
                {item.icon}
              </div>

              <span className="font-medium tracking-wide">
                {item.name}
              </span>

            </motion.div>

          </Link>

        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-cyan-400/20 p-6">

        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4 backdrop-blur-md">

          <p className="font-semibold text-cyan-300">
            System Status
          </p>

          <div className="mt-3 flex items-center gap-2">

            <span className="h-3 w-3 animate-pulse rounded-full bg-green-400" />

            <p className="text-green-400">
              All Services Operational
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;