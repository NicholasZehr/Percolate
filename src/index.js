import React from "react";
import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./App";
import history from "./history";
import store from "./redux";
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
