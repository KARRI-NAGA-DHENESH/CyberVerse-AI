import { motion } from "framer-motion";
import { FaArrowTrendUp } from "react-icons/fa6";

interface Props {
  title: string;
  value: number | string;
  color: string;
}

function AnalyticsCard({
  title,
  value,
  color,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-cyan-500/20
        bg-gradient-to-br
        from-[#081221]
        to-[#0B1628]
        p-6
        shadow-[0_0_25px_rgba(0,229,255,0.06)]
        transition-all
        duration-300
        hover:border-cyan-400/40
        hover:shadow-[0_0_35px_rgba(0,229,255,.25)]
      "
    >
      {/* Glow */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-400/20 transition-all duration-500" />

      {/* Title */}

      <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
        {title}
      </p>

      {/* Value */}

      <div
        className="mt-5 text-5xl font-extrabold tracking-tight"
        style={{ color }}
      >
        {value}
      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <span className="text-xs text-cyan-400">
          LIVE METRIC
        </span>

        <FaArrowTrendUp
          className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1"
          size={18}
        />

      </div>

    </motion.div>
  );
}

export default AnalyticsCard;