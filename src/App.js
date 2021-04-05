import React from "react";
import "./App.css";
import Routes from "./app/routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

function App(props) {
  return (
    <ToastProvider autoDismissTimeout={5000}>
      <Router>
        <Routes />
      </Router>
    </ToastProvider>
  );
}

export default App;
