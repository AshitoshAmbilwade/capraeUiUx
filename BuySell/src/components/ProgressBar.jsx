export default function ProgressBar({ step, total, onStepClick }) {
  const pct = Math.round(((step + 1) / total) * 100);

  return (
    <div className="w-full">
      {/* Step info */}
      <div className="flex justify-between text-xs font-medium mb-2 text-slate-600">
        <span>Step {step + 1} of {total}</span>
        <span>{pct}%</span>
      </div>

      {/* Step dots */}
      <div className="flex justify-between mb-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            onClick={() => onStepClick && onStepClick(i)}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300
              ${i <= step ? "bg-indigo-500 scale-110" : "bg-slate-300 scale-100"}`}
          />
        ))}
      </div>

      {/* Progress bar container */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-300 ease-in-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
