import React from "react";
import { Switch, Route } from "react-router-dom";
import { LoginPage } from "../scenes/login";
import { Dashboard } from "../scenes/Dashboard";
import { SignUp } from "../scenes/SignUp";
import PrivateRoute from "./PrivateRoute";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <PrivateRoute
        exact
        path="/dashboard"
        component={(props) => <Dashboard {...props} />}
      />
      <Route
        exact
        path="/sign-up"
        component={(props) => <SignUp {...props} />}
      />
    </Switch>
  );
}

export default Routes;
