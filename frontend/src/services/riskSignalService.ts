export interface CyberRiskSignals {
  vulnerabilityRisk?: number;
  vulnerabilitySource?: string;
  cvss?: number;
  threatExposure?: number;
  attackActivity?: number;
  updatedAt?: string;
}

const STORAGE_KEY = "cyberverseRiskSignals";
const UPDATE_EVENT = "cyberverse-risk-update";

export function saveRiskSignals(
  signals: CyberRiskSignals
): void {
  const existing = getRiskSignals();

  const updated = {
    ...existing,
    ...signals,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  window.dispatchEvent(
    new Event(UPDATE_EVENT)
  );
}

export function getRiskSignals(): CyberRiskSignals {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return {};
    }

    return JSON.parse(stored);
  } catch {
    return {};
  }
}

export function subscribeToRiskSignals(
  callback: () => void
): () => void {
  window.addEventListener(
    UPDATE_EVENT,
    callback
  );

  return () => {
    window.removeEventListener(
      UPDATE_EVENT,
      callback
    );
  };
}