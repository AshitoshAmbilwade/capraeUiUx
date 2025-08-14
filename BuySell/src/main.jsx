import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";
import { Toaster } from "react-hot-toast";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: { background: "#333", color: "#fff", fontSize: "14px", borderRadius: "8px" },
        success: { iconTheme: { primary: "#10B981", secondary: "white" } },
        error: { iconTheme: { primary: "#EF4444", secondary: "white" } },
      }}
    />
  </React.StrictMode>
);
