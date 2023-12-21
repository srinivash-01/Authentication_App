import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from "./pages/signup";
import SignIn from "./pages/signin";
import Home from "./pages/Home";
function Rout() {
  return (
    <Router>
    <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route path="/Signup">
          <Signup />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
      </Switch>
      </Router>
  );
}

export default Rout;
