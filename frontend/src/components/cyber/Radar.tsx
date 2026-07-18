import { motion } from "framer-motion";

function Radar() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full border border-cyan-400/20"
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear",
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 w-[2px] h-1/2 origin-bottom -translate-x-1/2 -translate-y-full"
          style={{
            background:
              "linear-gradient(to top, rgba(0,229,255,0.8), transparent)",
          }}
        />
      </motion.div>

    </div>
  );
}

export default Radar;