import React, { useState } from "react";
import { Send } from "lucide-react";
import { useData } from "../context/DataContext";

export default function ChatBox({ match }) {
  const { addChatMessage } = useData();   // 👈 cleaner
  const [text, setText] = useState("");
  const chat = match?.chat || [];

  const send = () => {
    if (!text.trim()) return;
    addChatMessage(match.matchId || match.id, "seller", text.trim());
    setText("");
  };

  return (
    <div className="card p-4 rounded-2xl border">
      <h3 className="font-semibold mb-3">Chat</h3>
      <div className="h-56 overflow-y-auto border rounded-xl p-3 bg-white">
        {chat.length === 0 && (
          <p className="text-sm text-slate-500">No messages yet.</p>
        )}
        {chat.map((m) => (
          <div key={m.id} className="mb-2">
            <span className="text-xs text-slate-500">
              {new Date(m.ts).toLocaleString()}
            </span>
            <div
              className={`px-3 py-2 rounded-xl inline-block ${
                m.sender === "seller" ? "bg-indigo-50" : "bg-emerald-50"
              } ml-2`}
            >
              <strong className="mr-2">{m.sender}:</strong> {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          className="input"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn-brand" onClick={send}>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
