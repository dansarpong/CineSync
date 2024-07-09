import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// Render the App component to the root element in the HTML
ReactDOM.render(<App />, document.getElementById("root"));

// Register the service worker for offline caching and PWA functionality
serviceWorkerRegistration.register();
