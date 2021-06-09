import React, { useState } from "react";
import "../../Styles/AddRecord.css";

import WardApi from "../../Apis/Ward";
import history from "../../history";

export default function AddWardRecord() {
  const [wType, setWType] = useState("");
  const [wFloor, setWFloor] = useState("");
  const [wTotalBeds, setWTotalBeds] = useState("");
  const [wReservedBeds, setWReservedBeds] = useState("");

  const saveRecordHandler = async () => {
    if (!wType || !wFloor || !wTotalBeds || !wReservedBeds)
      return alert("Please fill all input fields");

    try {
      const res = await WardApi.post("/create", {
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
      <div
        className="backbtn"
        onClick={() => {
          history.push("/ward");
        }}
      >
        Back
      </div>
      <div className="add-heading">Add Ward's Record</div>
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
        Save Ward's Data
      </div>
    </div>
  );
}
