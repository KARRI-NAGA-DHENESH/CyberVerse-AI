import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] flex items-center justify-center">

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow Orb 1 */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
        className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[150px]"
      />

      {/* Glow Orb 2 */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 60, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
        }}
        className="absolute right-20 bottom-10 w-80 h-80 rounded-full bg-blue-500/10 blur-[150px]"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-[450px] rounded-3xl border border-cyan-400/30 bg-white/5 backdrop-blur-2xl p-10 shadow-[0_0_50px_rgba(0,255,255,0.15)]"
      >
        <h1 className="text-center text-5xl font-bold text-cyan-400 tracking-widest">
          CYBERVERSE
        </h1>

        <p className="text-center text-gray-400 mt-3 mb-10">
          AI Cyber Security Platform
        </p>

        {/* Username */}
        <div className="flex items-center rounded-xl border border-cyan-500/30 bg-black/30 px-4 py-3 mb-5">
          <FaUser className="text-cyan-400 mr-3" />

          <input
            type="text"
            placeholder="Username"
            className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
          />
        </div>

        {/* Password */}
        <div className="flex items-center rounded-xl border border-cyan-500/30 bg-black/30 px-4 py-3 mb-8">
          <FaLock className="text-cyan-400 mr-3" />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
          />
        </div>

        <motion.button
          onClick={() => navigate("/dashboard")}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 30px cyan",
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="w-full rounded-xl bg-cyan-400 py-3 text-lg font-bold text-black"
        >
          ACCESS SYSTEM
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Login;