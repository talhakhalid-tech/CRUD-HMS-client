import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import NurseApi from "../../Apis/Nurse";
import history from "../../history";

export default function NurseDoctorRecord({ match }) {
  const [record, setRecord] = useState(() => []);

  const fetchNursePatientRecord = async () => {
    try {
      const res = await NurseApi.get(
        `/relatedPatients?NId=${match.params.NId}`
      );
      setRecord(res.data.patients);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchNursePatientRecord();
  }, []);

  const renderNursePatientData = () => {
    return record.map((patient) => {
      return (
        <tr key={patient.N_id}>
          <td>{patient.N_id}</td>
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
          history.push("/nurse");
        }}
      >
        Back
      </div>
      <div className="record-heading">
        Patients Overseen by Nurse with ID {match.params.PId}
      </div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Nurse's Id</th>
              <th>Patient's Id</th>
              <th>Patient's Name</th>
              <th>Patient's Disease</th>
              <th>Patient's Bed No</th>
            </tr>
            {renderNursePatientData()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
