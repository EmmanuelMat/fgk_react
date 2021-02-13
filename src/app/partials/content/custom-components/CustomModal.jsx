import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactIf from "../../../helpers/ReactIf";
export default function CustomModal({ size, openModalBtn, saveBtn, save, children, title }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div onClick={handleShow}>
    {openModalBtn}

    </div>

      <Modal show={show} onHide={handleClose} size={size}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <ReactIf condition={saveBtn} >
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              save();
            }}
          >
            {saveBtn}
          </Button>
          </ReactIf>
         
        </Modal.Footer>
      </Modal>
    </>
  );
}
