import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import WardApi from "../../Apis/Ward";
import history from "../../history";

export default function DoctorRecord({ match }) {
  const [record, setRecord] = useState(() => []);

  const fetchWardNurseRecord = async () => {
    try {
      const res = await WardApi.get(`/relatedNurses?WId=${match.params.WId}`);
      console.log(res.data);
      setRecord(res.data.nurses);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchWardNurseRecord();
  }, []);

  const renderWardNursesData = () => {
    return record.map((nurse) => {
      return (
        <tr key={nurse.N_id}>
          <td>{nurse.W_id}</td>
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
          history.push("/ward");
        }}
      >
        Back
      </div>
      <div className="record-heading">All Related Nurses Record</div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Ward's Id</th>
              <th>Nurse's Id</th>
              <th>Nurse's Name</th>
              <th>Nurse's Position</th>
              <th>Nurse's Cell No</th>
              <th>Nurse's Shift</th>
            </tr>
            {renderWardNursesData()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
