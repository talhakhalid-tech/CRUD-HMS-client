import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import PatientApi from "../../Apis/Patient";
import history from "../../history";

export default function PatientNurseRecord({ match }) {
  const [record, setRecord] = useState(() => []);

  const fetchPatientNurseRecord = async () => {
    try {
      const res = await PatientApi.get(
        `/relatedNurses?PId=${match.params.PId}`
      );
      setRecord(res.data.nurses);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchPatientNurseRecord();
  }, []);

  const renderPatientNursesData = () => {
    return record.map((nurse) => {
      return (
        <tr key={nurse.D_id}>
          <td>{nurse.P_id}</td>
          <td>{nurse.N_id}</td>
          <td>{nurse.N_Name}</td>
          <td>{nurse.N_Position}</td>
          <td>{nurse.N_CellNo}</td>
          <td>{nurse.N_Shift}</td>
        </tr>
      );
    });
  };

  return (
    <div className="record-container">
      <div
        className="backbtn"
        onClick={() => {
          history.push("/patient");
        }}
      >
        Back
      </div>
      <div className="record-heading">
        Nurses Overseeing Patient with Id {match.params.PId}
      </div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Patient's Id</th>
              <th>Nurse's Id</th>
              <th>Nurse's Name</th>
              <th>Nurse's Position</th>
              <th>Nurse's Cell No</th>
              <th>Nurse's Shift</th>
            </tr>
            {renderPatientNursesData()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
