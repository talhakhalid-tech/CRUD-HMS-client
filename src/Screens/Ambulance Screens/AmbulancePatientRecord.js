import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import AmbulanceApi from "../../Apis/Ambulance";
import history from "../../history";

export default function DoctorRecord({ match }) {
  const [record, setRecord] = useState(() => []);

  const fetchAmbulancePatientRecord = async () => {
    try {
      const res = await AmbulanceApi.get(
        `/relatedPatients?AId=${match.params.AId}`
      );
      setRecord(res.data.patients);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchAmbulancePatientRecord();
  }, []);

  const renderAmbulancePatientData = () => {
    return record.map((patient) => {
      return (
        <tr key={patient.P_id}>
          <td>{patient.AId}</td>
          <td>{patient.P_id}</td>
          <td>{patient.P_Name}</td>
          <td>{patient.P_Disease}</td>
          <td>{patient.P_BedNo}</td>
        </tr>
      );
    });
  };

  return (
    <div className="record-container">
      <div
        className="backbtn"
        onClick={() => {
          history.push("/ambulance");
        }}
      >
        Back
      </div>
      <div className="record-heading">All Related Patients Record</div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Ambulance's Id</th>
              <th>Patient's Id</th>
              <th>Patient's Name</th>
              <th>Patient's Disease</th>
              <th>Patient's Bed No</th>
            </tr>
            {renderAmbulancePatientData()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
