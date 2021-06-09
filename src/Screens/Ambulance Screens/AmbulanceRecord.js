import React, { useEffect, useState } from "react";
import "../../Styles/Record.css";

import AmbulanceApi from "../../Apis/Ambulance";
import history from "../../history";

export default function AmbulanceRecord() {
  const [record, setRecord] = useState(() => []);

  const fetchAmbulancesRecord = async () => {
    try {
      const res = await AmbulanceApi.get("all");
      setRecord(res.data.ambulances);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchAmbulancesRecord();
  }, []);

  const onEditRecord = (ambulance) => {
    history.push({
      pathname: "/ambulance/edit",
      state: { ambulance },
    });
  };

  const onDeleteRecord = async (id) => {
    try {
      const res = await AmbulanceApi.delete(`/delete?aId=${id}`);
      if (res.status === 202) fetchAmbulancesRecord();
    } catch (error) {
      alert("Oops, An Error occured While Deleting");
    }
  };

  const relatedPatientsHandler = async (id) => {
    history.push({
      pathname: "/ambulance/relatedPatients/" + id,
    });
  };

  const renderAmbulancesData = () => {
    return record.map((ambulance) => {
      return (
        <tr key={ambulance.A_id}>
          <td>{ambulance.A_id}</td>
          <td>{ambulance.A_ChasisNo}</td>
          <td>{ambulance.A_EngineNo}</td>
          <td>{ambulance.A_Route}</td>
          <td>{ambulance.A_Model}</td>
          <td
            className="record-actions"
            onClick={() => onEditRecord(ambulance)}
          >
            Edit
          </td>
          <td
            className="record-actions"
            onClick={() => onDeleteRecord(ambulance.A_id)}
          >
            Delete
          </td>
          <td
            onClick={() => relatedPatientsHandler(ambulance.A_id)}
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
      <div
        className="backbtn"
        onClick={() => {
          history.push("/");
        }}
      >
        Back
      </div>
      <div className="record-heading">All Ambulances Record</div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Ambulance's Id</th>
              <th>Ambulance's Chasis No</th>
              <th>Ambulance's Engine No</th>
              <th>Ambulance's Route</th>
              <th>Ambulance's Model</th>
              <th colSpan={3}>Actions</th>
            </tr>
            {renderAmbulancesData()}
          </tbody>
        </table>
      </div>
      <div
        onClick={() => history.push("/ambulance/add")}
        className="record-add-btn"
      >
        Add Ambulance's Data
      </div>
    </div>
  );
}
