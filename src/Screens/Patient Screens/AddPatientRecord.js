import React, { useState, useEffect } from "react";
import "../../Styles/AddRecord.css";

import PatientApi from "../../Apis/Patient";
import DoctorApi from "../../Apis/Doctor";
import AmbulanceApi from "../../Apis/Ambulance";
import WardApi from "../../Apis/Ward";
import history from "../../history";

export default function AddPatientRecord() {
  const [pName, setPName] = useState("");
  const [pDisease, setPDisease] = useState("");
  const [pBedNo, setPBedNo] = useState("");
  const [dId, setDId] = useState(null);
  const [aId, setAId] = useState(null);
  const [wId, setWId] = useState(null);

  const [doctors, setDoctors] = useState(() => []);
  const [ambulances, setAmbulances] = useState(() => []);
  const [wards, setWards] = useState(() => []);

  const fetchDoctors = async () => {
    try {
      const res = await DoctorApi.get("/all");
      setDoctors(res.data.doctors);
    } catch (error) {
      alert("Oops, An error occured");
    }
  };
  const fetchAmbulances = async () => {
    try {
      const res = await AmbulanceApi.get("/all");
      setAmbulances(res.data.ambulances);
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
    fetchDoctors();
    fetchAmbulances();
    fetchWards();
  }, []);

  const saveRecordHandler = async () => {
    if (!pName || !pDisease || !pBedNo)
      return alert("Please fill Name, Disease and Bed No");
    try {
      const res = await PatientApi.post("/create", {
        pName,
        pDisease,
        pBedNo,
        dId,
        aId,
        wId,
      });
      if (res.status === 201) {
        history.push("/patient");
      }
    } catch (error) {
      alert("Oops! An Error occured");
    }
  };

  const renderDoctorOptions = () => {
    return doctors.map((doctor) => {
      return (
        <option value={doctor.D_id}>{`${doctor.D_id} ${doctor.D_Name}`}</option>
      );
    });
  };

  const renderAmbulanceOptions = () => {
    return ambulances.map((ambulance) => {
      return (
        <option
          value={ambulance.A_id}
        >{`${ambulance.A_id} ${ambulance.A_Route}`}</option>
      );
    });
  };

  const renderWardOptions = () => {
    return wards.map((ward) => {
      return <option value={ward.W_id}>{`${ward.W_id} ${ward.W_Type}`}</option>;
    });
  };

  return (
    <div className="add-container">
      <div
        className="backbtn"
        onClick={() => {
          history.push("/patient");
        }}
      >
        Back
      </div>
      <div className="add-heading">Add Patient's Record</div>
      <div className="add-form">
        <div className="add-input-container">
          <label className="add-input-label">Enter patient's Name:</label>
          <input
            className="add-input"
            placeholder="patient's Name"
            value={pName}
            onChange={(elem) => setPName(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Patient's Disease:</label>
          <input
            className="add-input"
            placeholder="Patient's Disease"
            value={pDisease}
            onChange={(elem) => setPDisease(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Enter Patient's Bed No:</label>
          <input
            className="add-input"
            placeholder="Patient's Bed No"
            value={pBedNo}
            onChange={(elem) => setPBedNo(elem.target.value)}
          />
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Select Doctor:</label>
          <select
            className="add-input"
            style={{ height: "35px" }}
            onChange={(elem) =>
              elem.target.value === "default-text"
                ? setDId(null)
                : setDId(elem.target.value)
            }
          >
            <option value="default-text" selected>
              Select Doctor
            </option>
            {renderDoctorOptions()}
          </select>
        </div>
        <div className="add-input-container">
          <label className="add-input-label">Select Ambulance:</label>
          <select
            className="add-input"
            style={{ height: "35px" }}
            onChange={(elem) =>
              elem.target.value === "default-text"
                ? setAId(null)
                : setAId(elem.target.value)
            }
          >
            <option value="default-text" selected>
              Add Nurses Working Under Doctor
            </option>
            {renderAmbulanceOptions()}
          </select>
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
              Add Nurses Working Under Doctor
            </option>
            {renderWardOptions()}
          </select>
        </div>
      </div>
      <div onClick={saveRecordHandler} className="add-save-btn">
        Save Patient's Data
      </div>
    </div>
  );
}
