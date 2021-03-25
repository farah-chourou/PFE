
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "assets/css/style.css"

import AdminLayout from "layouts/Admin.js";
import Login from "Auth/Login.js";

const hist = createBrowserHistory();

function App(){

    return(


        <Router history={hist}>
    <Switch>
      <Route path="/user" render={(props) => <AdminLayout {...props} />} />
      <Route path="/"component={Login} />

      <Route path="/login"component={Login} />

    </Switch>
  </Router>
    );
}
export default App;