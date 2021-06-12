import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./history";

import Home from "./Screens/Home";

// all Doctor's related components
import DoctorRecord from "./Screens/Doctor Screens/DoctorRecord";
import AddDoctorRecord from "./Screens/Doctor Screens/AddDoctorRecord";
import EditDoctorRecord from "./Screens/Doctor Screens/EditDoctorRecord";
import DoctorNurseRecord from "./Screens/Doctor Screens/DoctorNurseRecord";

// all Ward's related components
import WardRecord from "./Screens/Ward Screens/WardRecord";
import AddWardRecord from "./Screens/Ward Screens/AddWardRecord";
import EditWardRecord from "./Screens/Ward Screens/EditWardRecord";
import WardNurseRecord from "./Screens/Ward Screens/WardNurseRecord";
import WardPatientRecord from "./Screens/Ward Screens/WardPatientRecord";

// all Ambulance's related components
import AmbulanceRecord from "./Screens/Ambulance Screens/AmbulanceRecord";
import AddAmbulanceRecord from "./Screens/Ambulance Screens/AddAmbulanceRecord";
import EditAmbulanceRecord from "./Screens/Ambulance Screens/EditAmbulanceRecord";
import AmbulancePatientRecord from "./Screens/Ambulance Screens/AmbulancePatientRecord";

// all Patient's related components
import PatientRecord from "./Screens/Patient Screens/PatientRecord";
import AddPatientRecord from "./Screens/Patient Screens/AddPatientRecord";
import EditPatientRecord from "./Screens/Patient Screens/EditPatientRecord";
import PatientNurseRecord from "./Screens/Patient Screens/PatientNurseRecord";

//all Nurse's related components
import NurseRecord from "./Screens/Nurse Screens/NurseRecord";
import AddNurseRecord from "./Screens/Nurse Screens/AddNurseRecord";
import EditNurseRecord from "./Screens/Nurse Screens/EditNurseRecord";
import NursePatientRecord from "./Screens/Nurse Screens/NursePatientRecord";
import NurseDoctorRecord from "./Screens/Nurse Screens/NurseDoctorRecord";

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />

          {/*All Doctor's Related Routes*/}
          <Route path="/doctor" exact component={DoctorRecord} />
          <Route path="/doctor/add" exact component={AddDoctorRecord} />
          <Route path="/doctor/edit" exact component={EditDoctorRecord} />
          <Route
            path="/doctor/relatedNurses/:dId"
            exact
            component={DoctorNurseRecord}
          />

          {/*All Ward's Related Routes*/}
          <Route path="/ward" exact component={WardRecord} />
          <Route path="/ward/add" exact component={AddWardRecord} />
          <Route path="/ward/edit" exact component={EditWardRecord} />
          <Route
            path="/ward/relatedNurses/:WId"
            exact
            component={WardNurseRecord}
          />
          <Route
            path="/ward/relatedPatients/:WId"
            exact
            component={WardPatientRecord}
          />

          {/*All Ambulance's Related Routes*/}
          <Route path="/ambulance" exact component={AmbulanceRecord} />
          <Route path="/ambulance/add" exact component={AddAmbulanceRecord} />
          <Route path="/ambulance/edit" exact component={EditAmbulanceRecord} />
          <Route
            path="/ambulance/relatedPatients/:AId"
            exact
            component={AmbulancePatientRecord}
          />

          {/*All Patient's Related Routes*/}
          <Route path="/patient" exact component={PatientRecord} />
          <Route path="/patient/add" exact component={AddPatientRecord} />
          <Route path="/patient/edit" exact component={EditPatientRecord} />
          <Route
            path="/patient/relatedNurses/:PId"
            exact
            component={PatientNurseRecord}
          />

          {/*All Nurse's Related Routes*/}
          <Route path="/nurse" exact component={NurseRecord} />
          <Route path="/nurse/add" exact component={AddNurseRecord} />
          <Route path="/nurse/edit" exact component={EditNurseRecord} />
          <Route
            path="/nurse/relatedPatients/:NId"
            exact
            component={NursePatientRecord}
          />
          <Route
            path="/nurse/relatedDoctors/:NId"
            exact
            component={NurseDoctorRecord}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
