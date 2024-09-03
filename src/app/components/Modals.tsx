import React, { CSSProperties } from "react";
import Modal from "react-modal";
type propsType = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
};
type styleType = {
  [key: string]: CSSProperties;
};
const modalStyle: styleType = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    textAlign: "right",
    transform: "translate(-50%,-50%)",
  },
};
const Modals = ({ isOpen, onRequestClose, children }: propsType) => {
  return (
    <Modal style={modalStyle} isOpen={isOpen} onRequestClose={onRequestClose}>
      <div>{children}</div>
      <button
        className="text-white rounded bg-red-600 p-2"
        onClick={onRequestClose}
      >
        Close
      </button>
    </Modal>
  );
};

export default Modals;