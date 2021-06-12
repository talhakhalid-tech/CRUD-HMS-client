import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import NurseApi from "../../Apis/Nurse";
import history from "../../history";

export default function NurseDoctorRecord({ match }) {
  const [record, setRecord] = useState(() => []);

  const fetchNurseDoctorRecord = async () => {
    try {
      const res = await NurseApi.get(`/relatedDoctors?NId=${match.params.NId}`);
      setRecord(res.data.doctors);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchNurseDoctorRecord();
  }, []);

  const renderNurseDoctorData = () => {
    return record.map((doctor) => {
      return (
        <tr key={doctor.N_id}>
          <td>{doctor.N_id}</td>
          <td>{doctor.D_id}</td>
          <td>{doctor.D_Name}</td>
          <td>{doctor.D_Specialization}</td>
          <td>{doctor.D_CellNo}</td>
          <td>{doctor.D_Shift}</td>
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
        Doctors Heading over Nurse with ID {match.params.PId}
      </div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Nurse's Id</th>
              <th>Doctor's Id</th>
              <th>Doctor's Name</th>
              <th>Doctor's Specialization</th>
              <th>Doctor's Cell No</th>
              <th>Doctor's Shift</th>
            </tr>
            {renderNurseDoctorData()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
