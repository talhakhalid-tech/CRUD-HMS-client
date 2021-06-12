import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import PatientApi from "../../Apis/Patient";
import DoctorApi from "../../Apis/Doctor";
import AmbulanceApi from "../../Apis/Ambulance";
import WardApi from "../../Apis/Ward";
import history from "../../history";

import RecordModal from "../../Components/RecordModal";

export default function PatientRecord() {
  const [record, setRecord] = useState(() => []);

  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalRecord, setModalRecord] = useState({});

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

  const fetchDoctorRecord = async (id) => {
    try {
      const res = await DoctorApi.get(`/single?dId=${id}`);
      if (res.status === 200) {
        setModalTitle("Doctor's Record");
        setModalRecord(res.data.doctor[0]);
        setOpenModal(true);
      }
    } catch (error) {
      alert("Oops, An Error occured While Fetching Doctor's Record");
    }
  };

  const fetchAmbulanceRecord = async (id) => {
    try {
      const res = await AmbulanceApi.get(`/single?aId=${id}`);
      if (res.status === 200) {
        setModalTitle("Ambulance's Record");
        setModalRecord(res.data.ambulance[0]);
        setOpenModal(true);
      }
    } catch (error) {
      alert("Oops, An Error occured While Fetching Ambulance's Record");
    }
  };

  const fetchWardRecord = async (id) => {
    try {
      const res = await WardApi.get(`/single?wId=${id}`);
      if (res.status === 200) {
        setModalTitle("Ward's Record");
        setModalRecord(res.data.ward[0]);
        setOpenModal(true);
      }
    } catch (error) {
      alert("Oops, An Error occured While Fetching Ward's Record");
    }
  };

  const renderPatientsData = () => {
    return record.map((patient) => {
      return (
        <tr key={patient.P_id}>
          <td>{patient.P_id}</td>
          <td>{patient.P_Name}</td>
          <td>{patient.P_Disease}</td>
          <td>{patient.P_BedNo}</td>
          <td
            className="record-actions"
            onClick={() => fetchDoctorRecord(patient.D_id)}
          >
            {patient.D_id}
          </td>
          <td
            className="record-actions"
            onClick={() => fetchAmbulanceRecord(patient.A_id)}
          >
            {patient.A_id}
          </td>
          <td
            className="record-actions"
            onClick={() => fetchWardRecord(patient.W_id)}
          >
            {patient.W_id}
          </td>
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
      <RecordModal
        modalIsOpen={openModal}
        setIsOpen={setOpenModal}
        modalTitle={modalTitle}
        recordData={modalRecord}
      />
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
