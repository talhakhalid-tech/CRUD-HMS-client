import React, { useState, useEffect } from "react";
import "../../Styles/AddRecord.css";

import DoctorApi from "../../Apis/Doctor";
import NurseApi from "../../Apis/Nurse";
import history from "../../history";

export default function AddDoctorRecord() {
  const [dName, setDName] = useState("");
  const [dSpecialization, setDSpecialization] = useState("");
  const [dCellNo, setDCellNo] = useState("");
  const [dShift, setDShift] = useState("");

  const [refresh, setRefresh] = useState(false);

  const [nurses, setNurses] = useState(() => []);
  const [selectedNurses, setSelectedNurses] = useState(() => []);

  const fetchNurses = async () => {
    try {
      const res = await NurseApi.get("/all");
      setNurses(res.data.nurses);
    } catch (error) {
      alert("Oops, An error occured");
    }
  };

  useEffect(() => {
    fetchNurses();
  }, []);

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
      if (res.status === 201) {
        await DoctorApi.post("/setRelatedNurses", {
          D_id: res.data.D_id,
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
    <div className="add-container">
      <div
        className="backbtn"
        onClick={() => {
          history.push("/doctor");
        }}
      >
        Back
      </div>
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
      <div onClick={saveRecordHandler} className="add-save-btn">
        Save Doctor's Data
      </div>
    </div>
  );
}
