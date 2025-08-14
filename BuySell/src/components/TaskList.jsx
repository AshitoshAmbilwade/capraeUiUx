import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import { Plus } from "lucide-react";

export default function TaskList({ match }) {
  const { addTask, toggleTask } = useContext(DataContext);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("buyer");
  const [due, setDue] = useState("");

  const add = () => {
    if (!title.trim()) return;
    addTask(match.matchId, { title: title.trim(), assignee, due });
    setTitle(""); setAssignee("buyer"); setDue("");
  };

  return (
    <div className="card p-4 rounded-2xl border">
      <h3 className="font-semibold mb-3">Tasks</h3>
      <div className="flex flex-col md:flex-row gap-2">
        <input className="input" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select className="input" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <input className="input" type="date" value={due} onChange={(e) => setDue(e.target.value)} />
        <button className="btn-brand" onClick={add}><Plus className="w-4 h-4 mr-2" /> Add</button>
      </div>

      <ul className="mt-3 space-y-2">
        {match.tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between border rounded-xl p-3 bg-white">
            <div>
              <p className={`font-medium ${t.done ? "line-through text-slate-400" : ""}`}>{t.title}</p>
              <p className="text-xs text-slate-500">Assignee: {t.assignee}{t.due ? ` • Due: ${t.due}` : ""}</p>
            </div>
            <button className="btn-subtle" onClick={() => toggleTask(match.matchId, t.id)}>
              {t.done ? "Mark Incomplete" : "Mark Done"}
            </button>
          </li>
        ))}
        {match.tasks.length === 0 && <p className="text-sm text-slate-500">No tasks yet.</p>}
      </ul>
    </div>
  );
}
