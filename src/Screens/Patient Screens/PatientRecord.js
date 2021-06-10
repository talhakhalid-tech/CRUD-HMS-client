import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import PatientApi from "../../Apis/Patient";
import history from "../../history";

export default function PatientRecord() {
  const [record, setRecord] = useState(() => []);

  const fetchPatientsRecord = async () => {
    try {
      const res = await PatientApi.get("/all");
      setRecord(res.data.patients);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchPatientsRecord();
  }, []);

  const onEditRecord = (patient) => {
    history.push({
      pathname: "/patient/edit",
      state: { patient },
    });
  };

  const onDeleteRecord = async (id) => {
    try {
      const res = await PatientApi.delete(`/delete?pId=${id}`);
      if (res.status === 202) fetchPatientsRecord();
    } catch (error) {
      alert("Oops, An Error occured While Deleting");
    }
  };

  const relatedNursesHandler = async (id) => {
    history.push({
      pathname: "/patient/relatedNurses/" + id,
    });
  };

  const renderPatientsData = () => {
    return record.map((patient) => {
      return (
        <tr key={patient.P_id}>
          <td>{patient.P_id}</td>
          <td>{patient.P_Name}</td>
          <td>{patient.P_Disease}</td>
          <td>{patient.P_BedNo}</td>
          <td>{patient.D_id}</td>
          <td>{patient.A_id}</td>
          <td>{patient.W_id}</td>
          <td className="record-actions" onClick={() => onEditRecord(patient)}>
            Edit
          </td>
          <td
            className="record-actions"
            onClick={() => onDeleteRecord(patient.P_id)}
          >
            Delete
          </td>
          <td
            onClick={() => relatedNursesHandler(patient.P_id)}
            className="record-actions"
          >
            Related Nurses
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="record-container">
      <div
        className="backbtn"
        onClick={() => {
          history.push("/");
        }}
      >
        Back
      </div>
      <div className="record-heading">All Patients Record</div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Patient's Id</th>
              <th>Patient's Name</th>
              <th>Patient's Disease</th>
              <th>Patient's Bed No</th>
              <th>Doctor's Id</th>
              <th>Ambulance's Id</th>
              <th>Ward's Id</th>
              <th colSpan={3}>Actions</th>
            </tr>
            {renderPatientsData()}
          </tbody>
        </table>
      </div>
      <div
        onClick={() => history.push("/patient/add")}
        className="record-add-btn"
      >
        Add Patient's Data
      </div>
    </div>
  );
}
