import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import "../Styles/RecordModal.css";

Modal.setAppElement("#root");

export default function RecordModal({
  modalIsOpen = false,
  modalTitle = "Record",
  setIsOpen = null,
  recordData = {},
}) {
  function onCloseModal() {
    setIsOpen(false);
  }

  const renderRecord = () => {
    const objArray = Object.entries(recordData).map((e) => ({ [e[0]]: e[1] }));
    return objArray.map((obj) => {
      return (
        <div className="modal-record">
          <p className="modal-key">{Object.keys(obj)[0]}:</p>{" "}
          <p className="modal-value">{Object.values(obj)[0]}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        contentLabel="Example Modal"
        className="modal-container"
      >
        <span className="modal-close-icon" onClick={onCloseModal}>
          <i class="fas fa-times"></i>
        </span>
        <div className="modal-heading">{modalTitle}</div>
        <div className="modal-records">{renderRecord()}</div>
      </Modal>
    </div>
  );
}

ReactDOM.render(<RecordModal />, document.getElementById("root"));
