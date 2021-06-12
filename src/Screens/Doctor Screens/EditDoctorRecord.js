import React, { useState, useEffect } from "react";
import "../../Styles/EditRecord.css";

import NurseApi from "../../Apis/Nurse";
import DoctorApi from "../../Apis/Doctor";
import history from "../../history";

export default function EditDoctorRecord({ location }) {
  const [dName, setDName] = useState(location.state.doctor.D_Name);
  const [dSpecialization, setDSpecialization] = useState(
    location.state.doctor.D_Specialization
  );
  const [dCellNo, setDCellNo] = useState(location.state.doctor.D_CellNo);
  const [dShift, setDShift] = useState(location.state.doctor.D_Shift);

  const [nurses, setNurses] = useState(() => []);
  const [selectedNurses, setSelectedNurses] = useState(() => []);

  const [refresh, setRefresh] = useState(false);

  const fetchNurses = async () => {
    try {
      const res = await NurseApi.get("/all");
      console.log(res.data.nurses);
      setNurses(res.data.nurses);
    } catch (error) {
      alert("Oops, An error occured");
    }
  };

  const fetchSelectedNurses = async () => {
    try {
      const res = await DoctorApi.get(
        `/relatedNurses?dId=${location.state.doctor.D_id}`
      );
      console.log(res.data.nurses);
      setSelectedNurses(res.data.nurses);
    } catch (error) {
      alert("Oops, An error occured");
    }
  };

  useEffect(() => {
    fetchNurses();
    fetchSelectedNurses();
  }, []);

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
      if (res.status === 201) {
        await DoctorApi.patch("/updateRelatedNurses", {
          D_id: location.state.doctor.D_id,
          N_id: selectedNurses.map((nurse) => nurse.N_id),
        });
        history.push("/doctor");
      }
    } catch (error) {
      alert("Oops! An Error occured");
    }
  };

  const renderNurseOptions = () => {
    return nurses.map((nurse) => {
      return (
        <option value={nurse.N_id}>{`${nurse.N_id} ${nurse.N_Name}`}</option>
      );
    });
  };

  const renderSelectedNurses = () => {
    return selectedNurses.map((nurse) => {
      return (
        <li style={{ position: "relative", margin: "5px 0px" }}>
          {`${nurse.N_id} ${nurse.N_Name}`}
          <span
            style={{
              fontSize: "20px",
              color: "grey",
              position: "absolute",
              right: "0px",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedNurses((prevState) =>
                prevState.filter((nrs) => nrs.N_id !== nurse.N_id)
              );
            }}
          >
            <i class="fas fa-trash"></i>
          </span>
        </li>
      );
    });
  };

  const nurseSelectHandler = (elem) => {
    if (elem.target.value !== "default-text") {
      setSelectedNurses((prevState) => {
        if (
          !prevState.some(
            (nurse) => nurse.N_id.toString() === elem.target.value
          )
        )
          prevState.push(
            nurses.find((nurse) => nurse.N_id.toString() === elem.target.value)
          );
        return prevState;
      });
      setRefresh(!refresh);
    }
  };

  return (
    <div className="edit-container">
      <div
        className="backbtn"
        onClick={() => {
          history.push("/doctor");
        }}
      >
        Back
      </div>
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
      <div className="add-input-container">
        <label className="add-input-label">Nurses Working Under:</label>
        <ul>{renderSelectedNurses()}</ul>
        <select
          name="plan"
          id="plan"
          className="add-input"
          style={{ height: "35px" }}
          onChange={nurseSelectHandler}
        >
          <option value="default-text" selected>
            Add Nurses Working Under Doctor
          </option>
          {renderNurseOptions()}
        </select>
      </div>
      <div onClick={editRecordHandler} className="edit-save-btn">
        Update Doctor's Data
      </div>
    </div>
  );
}
