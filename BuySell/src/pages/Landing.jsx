import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section className="grid md:grid-cols-2 gap-6 items-center">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Buy & Sell Businesses with Confidence
        </h1>
        <p className="text-slate-600">
          A friendly, modern platform where <strong>sellers initiate</strong> and deals flow through guided,
          low-friction workflows — from NDA to close.
        </p>
        <div className="flex gap-2">
          <Link to="/seller-onboarding" className="btn-brand">I'm a Seller</Link>
          <Link to="/buyer-onboarding" className="btn-subtle">I'm a Buyer</Link>
        </div>
      </div>
      <div className="card h-64 rounded-3xl border shadow-sm flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-indigo-200/70" />
      </div>
    </section>
  );
}
