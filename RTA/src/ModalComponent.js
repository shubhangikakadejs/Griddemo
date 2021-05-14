import React, { Component } from "react";

import {
  Modal,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function ModalComponent(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Company Details{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{JSON.stringify(props.data)}</h5>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Text>Name:Shubaangi </Form.Text>
          </Form.Group>
        </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalComponent;
