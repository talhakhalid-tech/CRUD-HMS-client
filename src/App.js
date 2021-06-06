import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

import Home from "./Screens/Home";

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
