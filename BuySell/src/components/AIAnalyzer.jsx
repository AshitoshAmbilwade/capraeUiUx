import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Brain } from "lucide-react";

export default function AIAnalyzer({ match }) {
  const { analyzeDocument } = useContext(DataContext);

  const runAll = () => {
    const docs = match?.docs || [];   // ✅ fallback to empty array
    if (docs.length === 0) return;
    docs.forEach((d) => analyzeDocument(match.matchId, d.id));
  };

  return (
    <div className="card p-4 rounded-2xl border">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">AI Analyzer</h3>
        <button className="btn-brand" onClick={runAll}>
          <Brain className="w-4 h-4 mr-2" /> Analyze All
        </button>
      </div>
      <p className="text-sm text-slate-600 mt-2">
        Automatically summarizes financial docs and flags potential risks (demo).
      </p>
    </div>
  );
}
