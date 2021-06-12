import React, { useState, useEffect } from "react";
import "../../Styles/AddRecord.css";

import NurseApi from "../../Apis/Nurse";
import PatientApi from "../../Apis/Patient";
import WardApi from "../../Apis/Ward";
import history from "../../history";

export default function AddNurseRecord() {
  const [nName, setNName] = useState("");
  const [nPosition, setNPosition] = useState("");
  const [nCellNo, setNCellNo] = useState("");
  const [nShift, setNShift] = useState("");
  const [wId, setWId] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const [wards, setWards] = useState(() => []);
  const [patients, setPatients] = useState(() => []);
  const [selectedPatients, setSelectedPatients] = useState(() => []);

  const fetchPatients = async () => {
    try {
      const res = await PatientApi.get("/all");
      setPatients(res.data.patients);
    } catch (error) {
      alert("Oops, An error occured");
    }
  };

  const fetchWards = async () => {
    try {
      const res = await WardApi.get("/all");
      setWards(res.data.wards);
    } catch (error) {
      alert("Oops, An error occured");
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchWards();
  }, []);

  const saveRecordHandler = async () => {
    if (!nName || !nPosition || !nCellNo || !nShift)
      return alert("Please fill all input fields");

    try {
      const res = await NurseApi.post("/create", {
        nName,
        nPosition,
        nCellNo,
        nShift,
        wId,
      });
      if (res.status === 201) {
        if (selectedPatients.length > 0)
          await NurseApi.post("/setRelatedPatients", {
            N_id: res.data.N_id,
            P_id: selectedPatients.map((patient) => patient.P_id),
          });
        history.push("/nurse");
      }
    } catch (error) {
      alert("Oops! An Error occured");
    }
  };

  const renderPatientOptions = () => {
    return patients.map((patient) => {
      return (
        <option
          value={patient.P_id}
        >{`${patient.P_id} ${patient.P_Name}`}</option>
      );
    });
  };

  const renderWardOptions = () => {
    return wards.map((ward) => {
      return <option value={ward.W_id}>{`${ward.W_id} ${ward.W_Type}`}</option>;
    });
  };

  const renderSelectedPatients = () => {
    return selectedPatients.map((patient) => {
      return (
        <li style={{ position: "relative", margin: "5px 0px" }}>
          {`${patient.P_id} ${patient.P_Name}`}
          <span
            style={{
              fontSize: "20px",
              color: "grey",
              position: "absolute",
              right: "0px",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedPatients((prevState) =>
                prevState.filter((pnts) => pnts.P_id !== patient.P_id)
              );
            }}
          >
            <i class="fas fa-trash"></i>
          </span>
        </li>
      );
    });
  };

  const patientSelectHandler = (elem) => {
    if (elem.target.value !== "default-text") {
      setSelectedPatients((prevState) => {
        if (
          !prevState.some(
            (patient) => patient.P_id.toString() === elem.target.value
          )
        )
          prevState.push(
            patients.find(
              (patient) => patient.P_id.toString() === elem.target.value
            )
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
          history.push("/nurse");
        }}
      >
        Back
      </div>
      <div className="add-heading">Add Nurse's Record</div>
      <div className="add-form">
        <div className="add-input-container">
          <label className="add-input-label">Enter Nurse's Name:</label>
          <input
            className="add-input"
            placeholder="Nurse's Name"
            value={nName}
            onChange={(elem) => setNName(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Nurse's Position:</label>
          <input
            className="add-input"
            placeholder="Nurse's Position"
            value={nPosition}
            onChange={(elem) => setNPosition(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Nurse's Cell No:</label>
          <input
            className="add-input"
            placeholder="Nurse's Cell No"
            value={nCellNo}
            onChange={(elem) => setNCellNo(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Nurse's Shift:</label>
          <input
            className="add-input"
            placeholder="Nurse's Shift"
            value={nShift}
            onChange={(elem) => setNShift(elem.target.value)}
          />
        </div>
      </div>
      <div className="add-input-container">
        <label className="add-input-label">Select Ward:</label>
        <select
          className="add-input"
          style={{ height: "35px" }}
          onChange={(elem) =>
            elem.target.value === "default-text"
              ? setWId(null)
              : setWId(elem.target.value)
          }
        >
          <option value="default-text" selected>
            Select Ward
          </option>
          {renderWardOptions()}
        </select>
      </div>
      <div className="add-input-container">
        <label className="add-input-label">Patients Overseen by Nurse:</label>
        <ul>{renderSelectedPatients()}</ul>
        <select
          name="plan"
          id="plan"
          className="add-input"
          style={{ height: "35px" }}
          onChange={patientSelectHandler}
        >
          <option value="default-text" selected>
            Add Patients Overseen by Nurse
          </option>
          {renderPatientOptions()}
        </select>
      </div>
      <div onClick={saveRecordHandler} className="add-save-btn">
        Save Nurse's Data
      </div>
    </div>
  );
}
