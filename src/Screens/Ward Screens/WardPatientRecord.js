import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import WardApi from "../../Apis/Ward";
import history from "../../history";

export default function WardPatientRecord({ match }) {
  const [record, setRecord] = useState(() => []);

  const fetchWardPatientRecord = async () => {
    try {
      const res = await WardApi.get(`/relatedPatients?WId=${match.params.WId}`);
      setRecord(res.data.patients);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchWardPatientRecord();
  }, []);

  const renderWardPatientData = () => {
    return record.map((patient) => {
      return (
        <tr key={patient.P_id}>
          <td>{patient.W_id}</td>
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
          history.push("/ward");
        }}
      >
        Back
      </div>
      <div className="record-heading">
        Ward No {match.params.WId} Patient's Record
      </div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Ward's Id</th>
              <th>Patient's Id</th>
              <th>Patient's Name</th>
              <th>Patient's Disease</th>
              <th>Patient's Bed No</th>
            </tr>
            {renderWardPatientData()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
