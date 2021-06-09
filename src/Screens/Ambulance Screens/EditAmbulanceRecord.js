import React, { useState } from "react";
import "../../Styles/AddRecord.css";

import AmbulanceApi from "../../Apis/Ambulance";
import history from "../../history";

export default function EditAmbulanceRecord({ location }) {
  const [aChasisNo, setAChasisNo] = useState(
    location.state.ambulance.A_ChasisNo
  );
  const [aEngineNo, setAEngineNo] = useState(
    location.state.ambulance.A_EngineNo
  );
  const [aRoute, setARoute] = useState(location.state.ambulance.A_Route);
  const [aModel, setAModel] = useState(location.state.ambulance.A_Model);

  const saveRecordHandler = async () => {
    if (!aChasisNo || !aEngineNo || !aRoute || !aModel)
      return alert("Please fill all input fields");

    try {
      const res = await AmbulanceApi.patch("/update", {
        aId: location.state.ambulance.A_id,
        aChasisNo,
        aEngineNo,
        aRoute,
        aModel,
      });
      if (res.status === 201) history.push("/ambulance");
    } catch (error) {
      alert("Oops! An Error occured");
    }
  };

  return (
    <div className="add-container">
      <div
        className="backbtn"
        onClick={() => {
          history.push("/ambulance");
        }}
      >
        Back
      </div>
      <div className="add-heading">Update Ambulance's Record</div>
      <div className="add-form">
        <div className="add-input-container">
          <label className="add-input-label">
            Enter Ambulance's Chasis No:
          </label>
          <input
            className="add-input"
            placeholder="Ambulance's Chasis No"
            value={aChasisNo}
            onChange={(elem) => setAChasisNo(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">
            Enter Ambulance's Engine No:
          </label>
          <input
            className="add-input"
            placeholder="Ambulance's Engine No"
            value={aEngineNo}
            onChange={(elem) => setAEngineNo(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Ambulance's Route:</label>
          <input
            className="add-input"
            placeholder="Ambulance's Route"
            value={aRoute}
            onChange={(elem) => setARoute(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Ambulance's Model:</label>
          <input
            className="add-input"
            placeholder="Ambulance's Model"
            value={aModel}
            onChange={(elem) => setAModel(elem.target.value)}
          />
        </div>
      </div>
      <div onClick={saveRecordHandler} className="add-save-btn">
        Update Ambulance's Data
      </div>
    </div>
  );
}
