import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export default function ProgressTracker({ match }) {
  const { STAGES, setStage } = useContext(DataContext);

  // Guard against missing match
  if (!match) {
    return (
      <div className="card p-4 rounded-2xl border">
        <h3 className="font-semibold">Deal Progress</h3>
        <p className="text-sm text-slate-500">No deal selected yet.</p>
      </div>
    );
  }

  return (
    <div className="card p-4 rounded-2xl border">
      <h3 className="font-semibold mb-3">Deal Progress</h3>
      <div className="flex flex-wrap gap-2">
        {STAGES.map((s) => (
          <button
            key={s}
            onClick={() => setStage(match.matchId, s)}
            className={`px-3 py-2 rounded-xl border ${
              match.stage === s ? "bg-indigo-50 border-indigo-300" : "bg-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-3 text-sm text-slate-600">
        Current stage:{" "}
        <span className="font-semibold">{match.stage}</span>
      </div>
    </div>
  );
}
