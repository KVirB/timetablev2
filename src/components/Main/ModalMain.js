import { useState, useMemo, useCallback, useEffect } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const ModalMain = (props) => {
  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={props.closeModal}>close</button>
        <div>I am a modal</div>
      </Modal>
    </div>
  );
};

export default ModalMain;
