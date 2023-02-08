import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import Header from "./header";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Header />
    <div class="container">
      <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <App />
        </div>
        <div class="col-lg-4"></div>
      </div>
    </div>
  </StrictMode>
);
