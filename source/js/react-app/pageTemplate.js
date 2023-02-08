import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./react-app/componentText";

const root = createRoot(document.getElementById("root"));
root.render(
  <div>
    <App />
  </div>
);