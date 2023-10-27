import { useState, useMemo, useCallback, useEffect } from "react";
import Select from "react-select-virtualized";
import Modal from "react-modal";
const customStyles = {
  content: {
    // top: "50%",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
  },
};

const ModalMain = (props) => {
  return (
    <div>
      {console.log(props.dataRow && props.dataRow.disciplineName)}
      <Modal
        ariaHideApp={false}
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Main Modal"
        overlayClassName={"modal_open"}
      >
        <div>
          <label style={{ display: "block" }}>Корпус</label>
          <span>{props.dataRow && props.dataRow.frameTable}</span>
        </div>
        <div>
          <label style={{ display: "block" }}>Аудитория</label>
          <span>{props.dataRow && props.dataRow.roomNumberTable}</span>
        </div>
        <div>
          <label style={{ display: "block" }}>День недели</label>
          <span>{props.dataRow && props.dataRow.dayTable}</span>
        </div>
        <div>
          <label style={{ display: "block" }}>Пара</label>
          <span>{props.dataRow && props.dataRow.lessonNumberTable}</span>
        </div>
        <Select
          className=""
          isClearable
          onChange={(e) => {
            props.dataRow.disciplineName = e.label;
          }}
          defaultValue={{ value: "discipline", label: "Дисциплина" }}
          options={props.discipline.map((m) => ({
            value: m.id,
            label:
              m.name +
              " (" +
              (m.department !== null ? m.department.shortName : "null") +
              ") ",
          }))}
        />
        <button onClick={props.closeModal}>close</button>
        <div>Vlad LOX</div>
      </Modal>
    </div>
  );
};

export default ModalMain;
