import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PrivyProvider } from "@privy-io/react-auth";

const appId = import.meta.env.VITE_PRIVY_APP_ID || "replace-with-real-app-id";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {appId === "replace-with-real-app-id" || !appId ? (
      <App />
    ) : (
      <PrivyProvider
        appId={appId}
        config={{
          loginMethods: ["email", "wallet", "google"],
          appearance: {
            theme: "dark",
            accentColor: "#9333ea",
          },
        }}
      >
        <App />
      </PrivyProvider>
    )}
  </StrictMode>,
);
