import { motion } from "framer-motion";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaShieldAlt,
} from "react-icons/fa";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-cyan-400/20 bg-[#050B16]/90 px-8 backdrop-blur-xl">

      {/* Search */}

      <div className="flex w-[430px] items-center gap-3 rounded-2xl border border-cyan-500/20 bg-[#07111F]/80 px-5 py-3 transition-all duration-300 focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(34,211,238,0.2)]">

        <FaSearch className="text-cyan-400" />

        <input
          type="text"
          placeholder="Search threats, IPs, CVEs..."
          className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
        />

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-6">

        {/* SOC Status */}

        <div className="hidden lg:flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2">

          <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

          <span className="text-sm font-medium text-green-400">
            SOC ONLINE
          </span>

        </div>

        {/* Notification */}

        <motion.div
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          animate={{
            rotate: [0, 12, -12, 0],
          }}
          transition={{
            rotate: {
              repeat: Infinity,
              duration: 3,
            },
          }}
          className="relative cursor-pointer rounded-xl border border-cyan-500/20 bg-[#07111F] p-3 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
        >

          <FaBell
            className="text-cyan-400"
            size={20}
          />

          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 animate-pulse" />

        </motion.div>

        {/* Profile */}

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="flex items-center gap-4 rounded-2xl border border-cyan-500/20 bg-[#07111F]/80 px-4 py-2 backdrop-blur-md"
        >

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10">

            <FaUserCircle
              size={34}
              className="text-cyan-300"
            />

          </div>

          <div>

            <p className="font-semibold text-white">
              Administrator
            </p>

            <div className="mt-1 flex items-center gap-2">

              <FaShieldAlt className="text-green-400 text-xs" />

              <p className="text-sm text-cyan-400">
                SOC Analyst
              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </header>
  );
}

export default Header;