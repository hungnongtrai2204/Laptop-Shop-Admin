import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * @author
 * @function NewModal
 **/

const NewModal = (props) => {
  return (
    <Modal size={props.size} show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontWeight: "510" }}>
          {props.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          {...props}
          style={{ backgroundColor: "#0d6efd" }}
          classname="button-sm"
          onClick={props.handleClose}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewModal;
