import { motion } from "framer-motion";
import { threatEvents } from "../../data/threats";

const severityColor: Record<string, string> = {
  Critical: "bg-red-600",
  High: "bg-orange-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

function ActivityFeed() {
  return (
    <div className="rounded-2xl bg-[#07111F] border border-cyan-500/20 p-6 h-full overflow-y-auto">

      <h2 className="text-2xl text-cyan-400 font-bold mb-6">
        📋 Live Threat Feed
      </h2>

      <div className="space-y-4">

        {threatEvents.map((event, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl bg-[#0B1628] p-4 border border-cyan-500/10"
          >

            <div className="flex justify-between items-center">

              <h3 className="font-semibold text-white">
                {event.type}
              </h3>

              <span
                className={`px-2 py-1 rounded text-xs text-white ${severityColor[event.severity]}`}
              >
                {event.severity}
              </span>

            </div>

            <p className="text-gray-400 mt-2">
              {event.source} → {event.target}
            </p>

            <p className="text-cyan-400 text-sm mt-2">
              {event.time}
            </p>

          </motion.div>

        ))}

      </div>

    </div>
  );
}

export default ActivityFeed;