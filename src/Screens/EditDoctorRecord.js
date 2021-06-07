import React, { useState } from "react";
import "../Styles/EditRecord.css";

import DoctorApi from "../Apis/Doctor";
import history from "../history";

export default function EditDoctorRecord({ location }) {
  const [dName, setDName] = useState(location.state.doctor.D_Name);
  const [dSpecialization, setDSpecialization] = useState(
    location.state.doctor.D_Specialization
  );
  const [dCellNo, setDCellNo] = useState(location.state.doctor.D_CellNo);
  const [dShift, setDShift] = useState(location.state.doctor.D_Shift);

  const editRecordHandler = async () => {
    if (!dName || !dSpecialization || !dCellNo || !dShift)
      return alert("Please fill all input fields");

    try {
      const res = await DoctorApi.patch("/update", {
        dId: location.state.doctor.D_id,
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
    <div className="edit-container">
      <div className="edit-heading">Update Doctor's Record</div>
      <div className="edit-form">
        <div className="edit-input-container">
          <label className="edit-input-label">Enter Doctor's Name:</label>
          <input
            className="edit-input"
            placeholder="Doctor's Name"
            value={dName}
            onChange={(elem) => setDName(elem.target.value)}
          />
        </div>
        <div className="edit-input-container">
          <label className="edit-input-label">
            Enter Doctor's Specialization:
          </label>
          <input
            className="edit-input"
            placeholder="Doctor's Specialization"
            value={dSpecialization}
            onChange={(elem) => setDSpecialization(elem.target.value)}
          />
        </div>
        <div className="edit-input-container">
          <label className="edit-input-label">Enter Doctor's Cell No:</label>
          <input
            className="edit-input"
            placeholder="Doctor's Cell No"
            value={dCellNo}
            onChange={(elem) => setDCellNo(elem.target.value)}
          />
        </div>
        <div className="edit-input-container">
          <label className="edit-input-label">Enter Doctor's Shift:</label>
          <input
            className="edit-input"
            placeholder="Doctor's Shift"
            value={dShift}
            onChange={(elem) => setDShift(elem.target.value)}
          />
        </div>
      </div>
      <div onClick={editRecordHandler} className="edit-save-btn">
        Update Doctor's Data
      </div>
    </div>
  );
}
