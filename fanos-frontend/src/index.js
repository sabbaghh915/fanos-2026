import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "src/scss/main.css";
import { SettingsProvider } from "src/context/SettingsContext";
import SessionLogout from "./SessionLogout";
import { Provider } from "react-redux";
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <SessionLogout>
        <Provider store={store}>
          <App />
        </Provider>
      </SessionLogout>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
