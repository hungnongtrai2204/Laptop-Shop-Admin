import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * @author
 * @function NewModal
 **/

const NewModal = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose} deleteproduct={props.deleteProduct}>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontWeight: "510" }}>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Are you sure you want to delete this product ?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    {...props}
                    style={{ backgroundColor: 'grey', border: 'none' }}
                    className="button-sm"
                    onClick={props.handleClose}
                >
                    No
                </Button>
                <Button
                    variant="primary"
                    {...props}
                    style={{ backgroundColor: "red", border: 'none' }}
                    className="button-sm"
                    onClick={props.deleteProduct}
                >
                    Yes
                </Button>
            </Modal.Footer>
        </Modal >
    );
};

export default NewModal;