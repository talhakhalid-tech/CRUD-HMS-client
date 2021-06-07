import React, { useState } from "react";
import "../Styles/AddRecord.css";

import DoctorApi from "../Apis/Doctor";
import history from "../history";

export default function AddDoctorRecord() {
  const [dName, setDName] = useState("");
  const [dSpecialization, setDSpecialization] = useState("");
  const [dCellNo, setDCellNo] = useState("");
  const [dShift, setDShift] = useState("");

  const saveRecordHandler = async () => {
    if (!dName || !dSpecialization || !dCellNo || !dShift)
      return alert("Please fill all input fields");

    try {
      const res = await DoctorApi.post("/create", {
        dName,
        dSpecialization,
        dCellNo,
        dShift,
      });
      if (res.status === 201) history.push("/doctor");
    } catch (error) {
      alert("Oops! An Error occured");
    }
  };

  return (
    <div className="add-container">
      <div className="add-heading">Add Doctor's Record</div>
      <div className="add-form">
        <div className="add-input-container">
          <label className="add-input-label">Enter Doctor's Name:</label>
          <input
            className="add-input"
            placeholder="Doctor's Name"
            value={dName}
            onChange={(elem) => setDName(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">
            Enter Doctor's Specialization:
          </label>
          <input
            className="add-input"
            placeholder="Doctor's Specialization"
            value={dSpecialization}
            onChange={(elem) => setDSpecialization(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Doctor's Cell No:</label>
          <input
            className="add-input"
            placeholder="Doctor's Cell No"
            value={dCellNo}
            onChange={(elem) => setDCellNo(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Doctor's Shift:</label>
          <input
            className="add-input"
            placeholder="Doctor's Shift"
            value={dShift}
            onChange={(elem) => setDShift(elem.target.value)}
          />
        </div>
      </div>
      <div onClick={saveRecordHandler} className="add-save-btn">
        Save Doctor's Data
      </div>
    </div>
  );
}
