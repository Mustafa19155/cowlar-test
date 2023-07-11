import React from "react";
import { Modal, ModalBody, Spinner } from "reactstrap";

export default function Loader({ isOpen }) {
  return (
    <Modal isOpen={isOpen} centered className="loader-modal">
      <ModalBody className="text-center">
        <div className="custom-loader">
          <div className="spinner-border text-white"></div>
        </div>
      </ModalBody>
    </Modal>
  );
}
