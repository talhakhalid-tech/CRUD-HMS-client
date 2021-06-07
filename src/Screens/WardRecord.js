import React, { useEffect, useState } from "react";
import "../Styles/Record.css";

import WardApi from "../Apis/Ward";
import history from "../history";

export default function WardRecord() {
  const [record, setRecord] = useState(() => []);

  const fetchWardsRecord = async () => {
    try {
      const res = await WardApi.get("all");
      setRecord(res.data.wards);
    } catch (error) {
      alert("Oops, An Error Occured while fetching data");
    }
  };

  useEffect(() => {
    fetchWardsRecord();
  }, []);

  const onEditRecord = (ward) => {
    history.push({
      pathname: "/ward/edit",
      state: { ward },
    });
  };

  const onDeleteRecord = async (id) => {
    try {
      const res = await WardApi.delete(`/delete?wId=${id}`);
      if (res.status === 202) fetchWardsRecord();
    } catch (error) {
      alert("Oops, An Error occured While Deleting");
    }
  };

  const renderWardsData = () => {
    return record.map((ward) => {
      return (
        <tr key={ward.W_id}>
          <td>{ward.W_id}</td>
          <td>{ward.W_Type}</td>
          <td>{ward.W_Floor}</td>
          <td>{ward.W_TotalBeds}</td>
          <td>{ward.W_ReservedBeds}</td>
          <td className="record-actions" onClick={() => onEditRecord(ward)}>
            Edit
          </td>
          <td
            className="record-actions"
            onClick={() => onDeleteRecord(ward.W_id)}
          >
            Delete
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="record-container">
      <div
        className="record-backbtn"
        onClick={() => {
          history.push("/");
        }}
      >
        Back
      </div>
      <div className="record-heading">All Wards Record</div>
      <div className="record-table">
        <table>
          <tbody>
            <tr className="record-table-head">
              <th>Ward's Id</th>
              <th>Ward's Type</th>
              <th>Ward's Floor</th>
              <th>Ward's Total Beds</th>
              <th>Ward's Reserved Beds</th>
              <th colSpan={2}>Actions</th>
            </tr>
            {renderWardsData()}
          </tbody>
        </table>
      </div>
      <div onClick={() => history.push("/ward/add")} className="record-add-btn">
        Add Ward's Data
      </div>
    </div>
  );
}
