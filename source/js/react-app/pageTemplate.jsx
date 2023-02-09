import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import Header from "./header";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Header />
    <div className="container">
      <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <App />
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  </StrictMode>
);
