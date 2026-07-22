import { useEffect, useMemo, useState } from "react";
import { useAlert } from "../../context/AlertContext";

export type Alert = {
  id: number;
  severity: "Critical" | "High" | "Medium" | "Low";
  title: string;
  source: string;
  status: string;
  time: string;
};

const colors = {
  Critical: "bg-red-500",
  High: "bg-orange-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

function AlertCenter() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const [search, setSearch] = useState("");

  const [severityFilter, setSeverityFilter] =
    useState("All");

  const [paused, setPaused] = useState(false);
  const { setSelectedAlert } = useAlert();

useEffect(() => {
  const fetchAlerts = () => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/api/alerts`)
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data.alerts.slice(0, 3));
      })
      .catch((err) => {
        console.error("Failed to load alerts:", err);
      });
  };

  fetchAlerts();

  const timer = setInterval(() => {
    if (!paused) {
      fetchAlerts();
    }
  }, 5000);

  return () => clearInterval(timer);
}, [paused]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch =
        alert.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        alert.source
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSeverity =
        severityFilter === "All" ||
        alert.severity === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [alerts, search, severityFilter]);

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#081221] p-6">

      <h2 className="mb-6 text-2xl font-bold text-cyan-300">
        🚨 Real-Time Alert Center
      </h2>

      <div className="mb-5 flex flex-col gap-3">

        <input
          placeholder="Search alerts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-cyan-500/20 bg-[#0B1628] px-4 py-2 text-white outline-none"
        />

        <div className="flex flex-wrap gap-2">

          {[
            "All",
            "Critical",
            "High",
            "Medium",
            "Low",
          ].map((level) => (
            <button
              key={level}
              onClick={() =>
                setSeverityFilter(level)
              }
              className={`rounded-lg px-3 py-2 text-sm ${
                severityFilter === level
                  ? "bg-cyan-500 text-black"
                  : "bg-[#13243a] text-white"
              }`}
            >
              {level}
            </button>
          ))}

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setPaused(!paused)}
            className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black"
          >
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>

          <button
            onClick={() => setAlerts([])}
            className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white"
          >
            Clear
          </button>

          <div className="ml-auto rounded-lg bg-cyan-500 px-4 py-2 font-bold text-black">
            Alerts: {filteredAlerts.length}
          </div>

        </div>

      </div>

      <div className="max-h-[300px] space-y-4 overflow-y-auto">
                {filteredAlerts.length === 0 ? (

          <div className="rounded-xl border border-cyan-500/10 bg-[#0B1628] p-8 text-center">

            <p className="text-lg text-gray-400">
              No alerts found.
            </p>

          </div>

        ) : (

          filteredAlerts.map((alert) => (

           <div
  key={alert.id}
  onClick={() => setSelectedAlert(alert)}
  className="cursor-pointer rounded-xl border border-cyan-500/10 bg-[#0B1628] p-4 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,.2)]"
>

              <div className="flex items-center justify-between">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold text-white ${colors[alert.severity]}`}
                >
                  {alert.severity}
                </span>

                <span className="text-sm text-gray-400">
                  {alert.time}
                </span>

              </div>

              <h3 className="mt-3 text-lg font-bold text-white">
                {alert.title}
              </h3>

              <div className="mt-2 flex items-center justify-between">

  <p className="text-sm text-gray-400">
    Source: {alert.source}
  </p>

  <span
    className={`rounded-full px-2 py-1 text-xs font-semibold ${
      alert.status === "Active"
        ? "bg-red-500/20 text-red-400"
        : alert.status === "Blocked"
        ? "bg-green-500/20 text-green-400"
        : alert.status === "Investigating"
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-cyan-500/20 text-cyan-300"
    }`}
  >
    {alert.status}
  </span>

</div>
            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default AlertCenter;