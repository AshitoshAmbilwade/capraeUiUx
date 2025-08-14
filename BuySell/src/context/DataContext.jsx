import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

export const DataContext = createContext();

// LocalStorage-backed state hook
function useLocalState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}

const STAGES = ["NDA", "Due Diligence", "Valuation", "Negotiation", "Deal Closed"];

export const DataProvider = ({ children }) => {
  const [buyers, setBuyers] = useLocalState("buyers", []);
  const [sellers, setSellers] = useLocalState("sellers", []);
  const [matches, setMatches] = useLocalState("matches", []);
  const [rejections, setRejections] = useLocalState("rejections", {}); // {userId: [rejectedIds]}
  const [activeBuyerId, setActiveBuyerId] = useLocalState("activeBuyerId", null);
  const [activeSellerId, setActiveSellerId] = useLocalState("activeSellerId", null);

  // Helpers
  const getBuyerById = (id) => buyers.find((b) => b.id === id);
  const getSellerById = (id) => sellers.find((s) => s.id === id);
  const getMatchById = (id) => matches.find((m) => m.matchId === id);

  // Onboarding
  const addBuyer = (buyer) => {
    const withId = { ...buyer, id: crypto.randomUUID(), createdAt: Date.now() };
    setBuyers((prev) => [...prev, withId]);
    setActiveBuyerId(withId.id);
    toast.success("Buyer profile created");
    return withId.id;
  };

  const addSeller = (seller) => {
    const withId = { ...seller, id: crypto.randomUUID(), createdAt: Date.now() };
    setSellers((prev) => [...prev, withId]);
    setActiveSellerId(withId.id);
    toast.success("Seller profile created");
    return withId.id;
  };

  // Unified match function (buyer or seller)
  const addMatch = (id, type) => {
    if (type === "buyer") {
      if (!activeSellerId) return toast.error("No active seller. Complete onboarding.");
      const exists = matches.find((m) => m.buyerId === id && m.sellerId === activeSellerId);
      
      const match = {
        matchId: crypto.randomUUID(),
        buyerId: id,
        sellerId: activeSellerId,
        stage: STAGES[0],
        tasks: [],
        docs: [],
        chat: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setMatches((prev) => [match, ...prev]);
      toast.success("Match created. Deal Room opened.");
      return match.matchId;
    } else if (type === "seller") {
      if (!activeBuyerId) return toast.error("No active buyer. Complete onboarding.");
      const exists = matches.find((m) => m.sellerId === id && m.buyerId === activeBuyerId);
      
      const match = {
        matchId: crypto.randomUUID(),
        buyerId: activeBuyerId,
        sellerId: id,
        stage: STAGES[0],
        tasks: [],
        docs: [],
        chat: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setMatches((prev) => [match, ...prev]);
      toast.success("Match created. Deal Room opened.");
      return match.matchId;
    }
  };

  // Unified reject function
  const rejectMatch = (id, type) => {
    if (type === "buyer") {
      setRejections((prev) => {
        const list = new Set(prev[activeBuyerId] || []);
        list.add(id);
        return { ...prev, [activeBuyerId]: Array.from(list) };
      });
      toast("Seller rejected", { icon: "👋" });
    } else if (type === "seller") {
      setRejections((prev) => {
        const list = new Set(prev[activeSellerId] || []);
        list.add(id);
        return { ...prev, [activeSellerId]: Array.from(list) };
      });
      toast("Buyer rejected", { icon: "👋" });
    }
  };

  // Deal Room operations
  const addChatMessage = (matchId, sender, text) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.matchId === matchId
          ? { ...m, chat: [...m.chat, { id: crypto.randomUUID(), sender, text, ts: Date.now() }], updatedAt: Date.now() }
          : m
      )
    );
  };

  const addDocument = (matchId, file) => {
    const meta = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      summary: null,
      risks: [],
      uploadedAt: Date.now(),
    };
    setMatches((prev) =>
      prev.map((m) => (m.matchId === matchId ? { ...m, docs: [...m.docs, meta] } : m))
    );
    toast.success(`Uploaded ${file.name}`);
  };

  const analyzeDocument = (matchId, docId) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.matchId !== matchId) return m;
        const docs = m.docs.map((d) => {
          if (d.id !== docId) return d;
          const sizeKB = Math.round(d.size / 1024);
          const risks = [];
          if (sizeKB > 1024) risks.push("Large file size—potentially heavy statements.");
          if (d.name.toLowerCase().includes("loss")) risks.push("Mentions loss—verify profitability.");
          if (d.name.toLowerCase().includes("debt")) risks.push("Debt indicators—check leverage.");
          const summary = `Auto-summary: ${d.name} (~${sizeKB}KB). Key sections parsed. Financial trends stable; flags: ${risks.length}.`;
          return { ...d, summary, risks };
        });
        toast.success("AI summary ready");
        return { ...m, docs };
      })
    );
  };

  const setStage = (matchId, stage) => {
    if (!STAGES.includes(stage)) return;
    setMatches((prev) =>
      prev.map((m) => (m.matchId === matchId ? { ...m, stage, updatedAt: Date.now() } : m))
    );
  };

  const addTask = (matchId, task) => {
    const t = {
      id: crypto.randomUUID(),
      title: task.title,
      assignee: task.assignee,
      due: task.due || null,
      done: false,
      createdAt: Date.now(),
    };
    setMatches((prev) =>
      prev.map((m) => (m.matchId === matchId ? { ...m, tasks: [...m.tasks, t] } : m))
    );
  };

  const toggleTask = (matchId, taskId) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.matchId === matchId
          ? { ...m, tasks: m.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) }
          : m
      )
    );
  };

  const value = useMemo(
    () => ({
      buyers,
      sellers,
      matches,
      rejections,
      activeBuyerId,
      activeSellerId,
      setActiveBuyerId,
      setActiveSellerId,
      addBuyer,
      addSeller,
      addMatch,
      rejectMatch,
      getBuyerById,
      getSellerById,
      getMatchById,
      addChatMessage,
      addDocument,
      analyzeDocument,
      setStage,
      addTask,
      toggleTask,
      STAGES,
    }),
    [buyers, sellers, matches, rejections, activeBuyerId, activeSellerId]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook
export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside a DataProvider");
  return ctx;
};
