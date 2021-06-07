import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

import Home from "./Screens/Home";
import DoctorRecord from "./Screens/DoctorRecord";
import AddDoctorRecord from "./Screens/AddDoctorRecord";
import EditDoctorRecord from "./Screens/EditDoctorRecord";
import WardRecord from "./Screens/WardRecord";
import AddWardRecord from "./Screens/AddWardRecord";
import EditWardRecord from "./Screens/EditWardRecord";

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/doctor" exact component={DoctorRecord} />
          <Route path="/doctor/add" exact component={AddDoctorRecord} />
          <Route path="/doctor/edit" exact component={EditDoctorRecord} />
          <Route path="/ward" exact component={WardRecord} />
          <Route path="/ward/add" exact component={AddWardRecord} />
          <Route path="/ward/edit" exact component={EditWardRecord} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
