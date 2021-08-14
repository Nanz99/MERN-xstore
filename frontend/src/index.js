/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();