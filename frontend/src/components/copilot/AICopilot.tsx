import { useState } from "react";
import { useCyber } from "../../context/CyberContext";
import { askGemini } from "../../services/gemini";

type Message = {
  sender: "user" | "ai";
  text: string;
  time: string;
};

type ThreatInfo = {
  cvss: string;
  mitre: string;
  iocs: string[];
  mitigation: string[];
};

const threatKnowledge: Record<string, ThreatInfo> = {
  "SQL Injection": {
    cvss: "9.8 Critical",
    mitre: "T1190",
    iocs: [
      "Unexpected SQL queries",
      "Database syntax errors",
      "Large data exports",
      "Privilege escalation",
    ],
    mitigation: [
      "Parameterized Queries",
      "Input Validation",
      "Least Privilege",
      "Deploy Web Application Firewall",
    ],
  },

  "DDoS Attack": {
    cvss: "8.7 High",
    mitre: "T1498",
    iocs: [
      "Traffic spikes",
      "Packet loss",
      "Connection floods",
      "High CPU usage",
    ],
    mitigation: [
      "Enable CDN",
      "Rate Limiting",
      "Traffic Filtering",
      "Auto Scaling",
    ],
  },

  Phishing: {
    cvss: "8.0 High",
    mitre: "T1566",
    iocs: [
      "Suspicious emails",
      "Credential theft",
      "Fake login pages",
    ],
    mitigation: [
      "Enable MFA",
      "Email Filtering",
      "Security Awareness Training",
    ],
  },

  "Brute Force": {
    cvss: "7.5 High",
    mitre: "T1110",
    iocs: [
      "Repeated login failures",
      "Password spraying",
      "Account lockouts",
    ],
    mitigation: [
      "Strong Password Policy",
      "Enable MFA",
      "Account Lockout",
    ],
  },
};

function AICopilot() {
  const { selectedAttack } = useCyber();

  const info = selectedAttack
    ? threatKnowledge[selectedAttack.name]
    : undefined;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "👋 Welcome to CyberVerse AI Copilot.\nAsk me any cybersecurity question.",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const question = input;

    const currentTime = new Date().toLocaleTimeString();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
        time: currentTime,
      },
    ]);

    setInput("");
    setIsThinking(true);

    try {
      const prompt = `
You are CyberVerse AI.

You are a professional Cyber Security Expert.

Answer the user's question in a professional but beginner-friendly way.

Question:

${question}
`;

      const answer = await askGemini(prompt);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: answer,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Unable to contact Gemini API.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }

    setIsThinking(false);
  }
    return (
    <div className="rounded-2xl border border-cyan-500/20 bg-[#07111F] p-6">
      <h2 className="mb-6 text-2xl font-bold text-cyan-400">
        🤖 AI Security Copilot
      </h2>

      {/* Chat Window */}
      <div className="mb-5 h-80 overflow-y-auto rounded-xl bg-[#0B1628] p-4">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.sender === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <div
              className={`inline-block max-w-[80%] rounded-xl px-4 py-3 ${
                msg.sender === "user"
                  ? "bg-cyan-500 text-white"
                  : "bg-[#13233b] text-gray-200"
              }`}
            >
              <p className="whitespace-pre-wrap">
                {msg.text}
              </p>

              <p className="mt-2 text-xs opacity-60">
                {msg.time}
              </p>

              {msg.sender === "ai" && (
                <button
                  onClick={() => navigator.clipboard.writeText(msg.text)}
                  className="mt-3 rounded bg-cyan-500 px-3 py-1 text-xs font-semibold text-black transition hover:bg-cyan-400"
                >
                  📋 Copy
                </button>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="animate-pulse text-cyan-400">
            🤖 CyberVerse AI is thinking...
          </div>
        )}

      </div>

      {/* Input */}
      <div className="mb-6 flex gap-3">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask anything about Cyber Security..."
          className="flex-1 rounded-lg border border-cyan-500/20 bg-[#081221] px-4 py-3 text-white outline-none"
        />

        <button
          onClick={sendMessage}
          className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          Send
        </button>

        <button
          onClick={() =>
            setMessages([
              {
                sender: "ai",
                text: "👋 Chat cleared. Ask me another cybersecurity question.",
                time: new Date().toLocaleTimeString(),
              },
            ])
          }
          className="rounded-lg bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-400"
        >
          Clear
        </button>

      </div>

      {/* Threat Details */}
      {info && (
        <div className="grid gap-4 md:grid-cols-2">

          <div className="rounded-xl bg-[#0B1628] p-4">
            <h3 className="font-bold text-cyan-400">
              📊 CVSS Score
            </h3>

            <p className="mt-3 text-lg text-white">
              {info.cvss}
            </p>
          </div>

          <div className="rounded-xl bg-[#0B1628] p-4">
            <h3 className="font-bold text-cyan-400">
              🎯 MITRE ATT&CK
            </h3>

            <p className="mt-3 text-lg text-white">
              {info.mitre}
            </p>
          </div>

          <div className="rounded-xl bg-[#0B1628] p-4">
            <h3 className="font-bold text-cyan-400">
              🔍 Indicators of Compromise
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-300">
              {info.iocs.map((ioc) => (
                <li key={ioc}>{ioc}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-[#0B1628] p-4">
            <h3 className="font-bold text-cyan-400">
              🛡️ Mitigation Checklist
            </h3>

            <ul className="mt-3 space-y-2 text-gray-300">
              {info.mitigation.map((item) => (
                <li key={item}>✅ {item}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}

export default AICopilot;