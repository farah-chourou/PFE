
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { frFR } from '@material-ui/core/locale';
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "assets/css/style.css"

import AdminLayout from "layouts/Admin.js";
import Login from "Auth/Login.js";

const hist = createBrowserHistory();
const theme = createMuiTheme({
  palette: {
    primary: { main: '#1565c0' }, //  //1976d2
  },
}, frFR);
function App(){

    return(
      <ThemeProvider theme={theme} >

<div style={{   fontFamily: "'Open Sans', sans-serif"}}> 
        <Router history={hist} >
    <Switch>
      <Route path="/user" render={(props) => <AdminLayout {...props} />} />
      <Route path="/"component={Login} />

      <Route path="/login"component={Login} />

    </Switch>
  </Router></div></ThemeProvider>

    );
}
export default App;