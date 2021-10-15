import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default React.forwardRef(function CustomModal(
  {
    size,
    openModalBtn,
    primaryBtn,
    secundaryBtn,
    children,
    title,
    onClose,
    showModalFormOutSide,
    closeOnSubmit = true,
    onShow = () => {}
  },
  ref
) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };
  const handleShow = () => {
    onShow()
    setShow(true);
  };

  useEffect(() => {
    if (showModalFormOutSide) {
      handleShow();
      return;
    }
    
  }, [showModalFormOutSide]);

  return (
    <>
      {openModalBtn && <div onClick={handleShow}>{openModalBtn}</div>}
      <Modal show={show} onHide={handleClose} size={size}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button ref={ref} variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {secundaryBtn && (
            <Button
              variant="primary"
              onClick={() => {
                secundaryBtn.onClick();
                handleClose();
              }}
            >
              {secundaryBtn.title}
            </Button>
          )}

          {primaryBtn && (
            <Button
              variant="success"
              onClick={() => {
                primaryBtn.onClick();
                if (!closeOnSubmit) return;
                handleClose();
              }}
            >
              {primaryBtn.title}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
});
