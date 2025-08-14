import { useContext, useRef } from "react";
import { DataContext } from "../context/DataContext";
import { Upload } from "lucide-react";

export default function DocumentUpload({ match }) {
  const { addDocument } = useContext(DataContext);
  const ref = useRef(null);

  // 🔑 Always fallback to empty array if docs is missing
  const docs = match?.docs || [];

  const onChange = (e) => {
    const file = e.target.files?.[0];
    if (file) addDocument(match.matchId || match.id, file);
    e.target.value = "";
  };

  return (
    <div className="card p-4 rounded-2xl border">
      <h3 className="font-semibold mb-3">Documents</h3>
      <div className="flex items-center gap-2">
        <input ref={ref} type="file" className="hidden" onChange={onChange} />
        <button className="btn-subtle" onClick={() => ref.current?.click()}>
          <Upload className="w-4 h-4 mr-2" /> Upload
        </button>
      </div>

      <ul className="mt-3 space-y-2">
        {docs.map((d) => (
          <li key={d.id} className="border rounded-xl p-3 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{d.name}</p>
                <p className="text-xs text-slate-500">
                  {Math.round(d.size / 1024)} KB • {d.type || "file"}
                </p>
              </div>
            </div>
            {d.summary ? (
              <div className="mt-2 text-sm">
                <p className="font-semibold">AI Summary</p>
                <p className="text-slate-700">{d.summary}</p>
                {d.risks?.length > 0 && (
                  <ul className="list-disc ml-5 mt-1 text-rose-600">
                    {d.risks.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 mt-2">No AI summary yet.</p>
            )}
          </li>
        ))}
        {docs.length === 0 && (
          <p className="text-sm text-slate-500">No documents uploaded.</p>
        )}
      </ul>
    </div>
  );
}
