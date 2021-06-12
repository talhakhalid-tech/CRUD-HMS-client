import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import NurseApi from "../../Apis/Nurse";
import WardApi from "../../Apis/Ward";
import history from "../../history";

import RecordModal from "../../Components/RecordModal";

export default function NurseRecord() {
  const [record, setRecord] = useState(() => []);

  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalRecord, setModalRecord] = useState({});

  const fetchNursesRecord = async () => {
    try {
      const res = await NurseApi.get("/all");
      setRecord(res.data.nurses);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchNursesRecord();
  }, []);

  const onEditRecord = (nurse) => {
    history.push({
      pathname: "/nurse/edit",
      state: { nurse },
    });
  };

  const onDeleteRecord = async (id) => {
    try {
      const res = await NurseApi.delete(`/delete?nId=${id}`);
      if (res.status === 202) fetchNursesRecord();
    } catch (error) {
      alert("Oops, An Error occured While Deleting");
    }
  };

  const relatedDoctorsHandler = async (id) => {
    history.push({
      pathname: "/nurse/relatedDoctors/" + id,
    });
  };

  const relatedPatientsHandler = async (id) => {
    history.push({
      pathname: "/nurse/relatedPatients/" + id,
    });
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

  const renderNursesData = () => {
    return record.map((nurse) => {
      return (
        <tr key={nurse.N_id}>
          <td>{nurse.N_id}</td>
          <td>{nurse.N_Name}</td>
          <td>{nurse.N_Position}</td>
          <td>{nurse.N_CellNo}</td>
          <td>{nurse.N_Shift}</td>
          <td
            className="record-actions"
            onClick={() => fetchWardRecord(nurse.W_id)}
          >
            {nurse.W_id}
          </td>
          <td className="record-actions" onClick={() => onEditRecord(nurse)}>
            Edit
          </td>
          <td
            className="record-actions"
            onClick={() => onDeleteRecord(nurse.N_id)}
          >
            Delete
          </td>
          <td
            onClick={() => relatedDoctorsHandler(nurse.N_id)}
            className="record-actions"
          >
            Related Doctors
          </td>
          <td
            onClick={() => relatedPatientsHandler(nurse.N_id)}
            className="record-actions"
          >
            Related Patients
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
      <div className="record-heading">All Nurses Record</div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Nurse's Id</th>
              <th>Nurse's Name</th>
              <th>Nurse's Position</th>
              <th>Nurse's Cell No</th>
              <th>Nurse's Shift</th>
              <th>Ward's Id</th>
              <th colSpan={4}>Actions</th>
            </tr>
            {renderNursesData()}
          </tbody>
        </table>
      </div>
      <div
        onClick={() => history.push("/nurse/add")}
        className="record-add-btn"
      >
        Add Nurse's Data
      </div>
    </div>
  );
}
