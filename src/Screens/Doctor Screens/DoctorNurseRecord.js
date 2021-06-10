import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import DoctorApi from "../../Apis/Doctor";
import history from "../../history";

export default function DoctorRecord({ match }) {
  const [record, setRecord] = useState(() => []);

  const fetchDoctorNurseRecord = async () => {
    try {
      const res = await DoctorApi.get(`/relatedNurses?dId=${match.params.dId}`);
      console.log(res.data);
      setRecord(res.data.nurses);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchDoctorNurseRecord();
  }, []);

  const renderDoctorNursesData = () => {
    return record.map((nurse) => {
      return (
        <tr key={nurse.D_id}>
          <td>{nurse.D_id}</td>
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
          history.push("/doctor");
        }}
      >
        Back
      </div>
      <div className="record-heading">
        Nurses Working Under Doctor with Id {match.params.dId}
      </div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Doctor's Id</th>
              <th>Nurse's Id</th>
              <th>Nurse's Name</th>
              <th>Nurse's Position</th>
              <th>Nurse's Cell No</th>
              <th>Nurse's Shift</th>
            </tr>
            {renderDoctorNursesData()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
