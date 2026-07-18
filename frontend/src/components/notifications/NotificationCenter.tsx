import { useEffect, useState } from "react";
import { useCyber } from "../../context/CyberContext";

type Notification = {
  id: number;
  title: string;
  message: string;
  severity: string;
};

function NotificationCenter() {
  const { selectedAttack } = useCyber();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!selectedAttack) return;

    const notification: Notification = {
      id: Date.now(),
      title: `${selectedAttack.severity} Threat`,
      message: `${selectedAttack.name} (${selectedAttack.source} → ${selectedAttack.target})`,
      severity: selectedAttack.severity,
    };

    setNotifications((prev) => [notification, ...prev].slice(0, 5));
  }, [selectedAttack]);

  return (
    <div className="fixed right-6 top-6 z-50 w-80 space-y-3">
      {notifications.map((item) => (
        <div
          key={item.id}
          className={`rounded-xl border p-4 shadow-lg backdrop-blur-md ${
            item.severity === "Critical"
              ? "border-red-500 bg-red-500/10"
              : item.severity === "High"
              ? "border-orange-500 bg-orange-500/10"
              : item.severity === "Medium"
              ? "border-yellow-500 bg-yellow-500/10"
              : "border-green-500 bg-green-500/10"
          }`}
        >
          <h3 className="font-bold text-white">
            {item.title}
          </h3>

          <p className="mt-2 text-sm text-gray-300">
            {item.message}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NotificationCenter;