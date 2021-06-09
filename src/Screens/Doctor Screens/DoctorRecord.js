import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import DoctorApi from "../../Apis/Doctor";
import history from "../../history";

export default function DoctorRecord() {
  const [record, setRecord] = useState(() => []);

  const fetchDoctorsRecord = async () => {
    try {
      const res = await DoctorApi.get("/all");
      setRecord(res.data.doctors);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchDoctorsRecord();
  }, []);

  const onEditRecord = (doctor) => {
    history.push({
      pathname: "/doctor/edit",
      state: { doctor },
    });
  };

  const onDeleteRecord = async (id) => {
    try {
      const res = await DoctorApi.delete(`/delete?dId=${id}`);
      if (res.status === 202) fetchDoctorsRecord();
    } catch (error) {
      alert("Oops, An Error occured While Deleting");
    }
  };

  const relatedNursesHandler = async (id) => {
    history.push({
      pathname: "/doctor/relatedNurses/" + id,
    });
  };

  const renderDoctorsData = () => {
    return record.map((doctor) => {
      return (
        <tr key={doctor.D_id}>
          <td>{doctor.D_id}</td>
          <td>{doctor.D_Name}</td>
          <td>{doctor.D_Specialization}</td>
          <td>{doctor.D_CellNo}</td>
          <td>{doctor.D_Shift}</td>
          <td className="record-actions" onClick={() => onEditRecord(doctor)}>
            Edit
          </td>
          <td
            className="record-actions"
            onClick={() => onDeleteRecord(doctor.D_id)}
          >
            Delete
          </td>
          <td
            onClick={() => relatedNursesHandler(doctor.D_id)}
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
      <div className="record-heading">All Doctors Record</div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Doctor's Id</th>
              <th>Doctor's Name</th>
              <th>Doctor's Specialization</th>
              <th>Doctor's Cell No</th>
              <th>Doctor's Shift</th>
              <th colSpan={3}>Actions</th>
            </tr>
            {renderDoctorsData()}
          </tbody>
        </table>
      </div>
      <div
        onClick={() => history.push("/doctor/add")}
        className="record-add-btn"
      >
        Add Doctor's Data
      </div>
    </div>
  );
}
