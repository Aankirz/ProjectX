import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
const app_id = "826333556876797063130367436121014584984601624576";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnonAadhaarProvider _appId={app_id}>
      <App />
    </AnonAadhaarProvider>
  </React.StrictMode>
);
