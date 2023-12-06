import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { AirstackProvider } from "@airstack/airstack-react";
import { ContractProvider } from "./context/fetch";

const app_id = "826333556876797063130367436121014584984601624576";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContractProvider>
      <AnonAadhaarProvider _appId={app_id}>
        <AirstackProvider apiKey={import.meta.env.VITE_AIRSTACK_API_KEY}>
          <App />
        </AirstackProvider>
      </AnonAadhaarProvider>
    </ContractProvider>
  </React.StrictMode>
);
