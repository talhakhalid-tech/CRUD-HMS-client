import React, { useState } from "react";
import "../Styles/AddRecord.css";

import WardApi from "../Apis/Ward";
import history from "../history";

export default function EditWardRecord({ location }) {
  const [wType, setWType] = useState(location.state.ward.W_Type);
  const [wFloor, setWFloor] = useState(location.state.ward.W_Floor);
  const [wTotalBeds, setWTotalBeds] = useState(location.state.ward.W_TotalBeds);
  const [wReservedBeds, setWReservedBeds] = useState(
    location.state.ward.W_ReservedBeds
  );

  const saveRecordHandler = async () => {
    if (!wType || !wFloor || !wTotalBeds || !wReservedBeds)
      return alert("Please fill all input fields");

    try {
      const res = await WardApi.patch("/update", {
        wId: location.state.ward.W_id,
        wType,
        wFloor,
        wTotalBeds,
        wReservedBeds,
      });
      if (res.status === 201) history.push("/ward");
    } catch (error) {
      alert("Oops! An Error occured");
    }
  };

  return (
    <div className="add-container">
      <div className="add-heading">Update Ward's Record</div>
      <div className="add-form">
        <div className="add-input-container">
          <label className="add-input-label">Enter Ward's Type:</label>
          <input
            className="add-input"
            placeholder="Ward's Type"
            value={wType}
            onChange={(elem) => setWType(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Ward's Floor:</label>
          <input
            className="add-input"
            placeholder="Ward's Floor"
            value={wFloor}
            onChange={(elem) => setWFloor(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Ward's Total Beds:</label>
          <input
            className="add-input"
            placeholder="Ward's Total Beds"
            value={wTotalBeds}
            onChange={(elem) => setWTotalBeds(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Ward's Reserved Beds:</label>
          <input
            className="add-input"
            placeholder="Ward's Reserved Beds"
            value={wReservedBeds}
            onChange={(elem) => setWReservedBeds(elem.target.value)}
          />
        </div>
      </div>
      <div onClick={saveRecordHandler} className="add-save-btn">
        Update Ward's Data
      </div>
    </div>
  );
}
