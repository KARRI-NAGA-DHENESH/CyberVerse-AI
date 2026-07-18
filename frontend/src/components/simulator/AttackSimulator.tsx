import { useState, useEffect } from "react";
import { attackScenarios } from "../../data/attackScenarios";
import { useCyber } from "../../context/CyberContext";

function AttackSimulator() {
  const { setSelectedAttack } = useCyber();

  const [selected, setSelected] = useState(attackScenarios[0]);

  useEffect(() => {
    setSelectedAttack({
      id: selected.id,
      name: selected.name,
      source: selected.source,
      target: selected.target,
      severity: selected.severity,
    });
  }, [selected, setSelectedAttack]);

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        ⚔️ Attack Simulator
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {/* Attack List */}

        <div className="space-y-3">

          {attackScenarios.map((attack) => (

            <button
              key={attack.id}
              onClick={() => setSelected(attack)}
              className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${
                selected.id === attack.id
                  ? "border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20"
                  : "border-transparent bg-[#0B1628] hover:border-cyan-500/40 hover:bg-[#12213A]"
              }`}
            >

              <div className="flex justify-between items-center">

                <h3 className="text-white font-semibold">
                  {attack.name}
                </h3>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    attack.severity === "Critical"
                      ? "bg-red-600"
                      : attack.severity === "High"
                      ? "bg-orange-500"
                      : attack.severity === "Medium"
                      ? "bg-yellow-500 text-black"
                      : "bg-green-600"
                  }`}
                >
                  {attack.severity}
                </span>

              </div>

              <p className="text-gray-400 mt-2">
                🌍 {attack.source} → {attack.target}
              </p>

            </button>

          ))}

        </div>

        {/* Details */}

        <div className="rounded-xl border border-cyan-500/20 bg-[#0B1628] p-6">

          <h2 className="text-2xl font-bold text-cyan-300">
            {selected.name}
          </h2>

          <div className="mt-4">

            <p className="text-gray-300">
              {selected.description}
            </p>

          </div>

          <div className="mt-8">

            <h3 className="text-green-400 font-semibold">
              🛡 Recommended Mitigation
            </h3>

            <p className="text-gray-300 mt-2">
              {selected.mitigation}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AttackSimulator;