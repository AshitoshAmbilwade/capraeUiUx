import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import ProgressBar from "../components/ProgressBar";

const STEPS = [
  { key: "name", label: "Your Name", placeholder: "e.g., Amit Verma", required: true },
  { key: "businessName", label: "Business Name", placeholder: "MediCare Tech Solutions", required: true },
  { key: "industry", label: "Industry", placeholder: "Healthcare Tech", required: true },
  { key: "annualRevenue", label: "Annual Revenue", placeholder: "₹3Cr", required: true },
  { key: "valuationExpectation", label: "Valuation Expectation", placeholder: "₹12Cr", required: false },
  { key: "location", label: "Location", placeholder: "Bengaluru, India", required: false },
  { key: "reasonForSelling", label: "Reason for Selling", placeholder: "Starting a new venture", required: false },
];

export default function SellerOnboarding() {
  const { addSeller } = useContext(DataContext);
  const [form, setForm] = useState({});
  const [step, setStep] = useState(0);
  const nav = useNavigate();

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    const payload = {
      ...form,
      annualRevenue: form.annualRevenue?.trim() || null,
      valuationExpectation: form.valuationExpectation?.trim() || null,
      location: form.location?.trim() || null,
      reasonForSelling: form.reasonForSelling?.trim() || null,
    };
    addSeller(payload);
    nav("/seller-dashboard");
  };

  const { key, label, placeholder, required } = STEPS[step];

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (!required || (form[key] && form[key].trim() !== "")) {
        step < STEPS.length - 1 ? next() : submit();
      }
    }
  };

  const isNextDisabled = required && (!form[key] || form[key].trim() === "");

  return (
    <div className="max-w-xl mx-auto card p-6 rounded-2xl border shadow-md">
      <h2 className="section-title mb-4 text-xl font-semibold">Seller Onboarding</h2>
      <ProgressBar 
  step={step} 
  total={STEPS.length} 
  onStepClick={(i) => setStep(i)} 
/>

      <div className="mt-4 space-y-2">
        <label className="label font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          className="input w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
          placeholder={placeholder}
          value={form[key] || ""}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={back}
          disabled={step === 0}
          className="btn-subtle disabled:opacity-50 px-4 py-2 rounded border"
        >
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={next}
            disabled={isNextDisabled}
            className={`btn-brand px-4 py-2 rounded text-white ${isNextDisabled ? "opacity-50 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={submit}
            className="btn-brand px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Finish
          </button>
        )}
      </div>

      <p className="mt-2 text-sm text-gray-400">
        Step {step + 1} of {STEPS.length}
      </p>
    </div>
  );
}
