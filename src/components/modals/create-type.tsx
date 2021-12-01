import React, { useState, FC } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { typeCreate } from "../../shared/device/slice";
import { useAppDispatch } from "../../store/index";
import { ModalsProps } from "./types";

const CreateType: FC<ModalsProps> = ({ show, onHide }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const addType = () => {
    dispatch(typeCreate(value))
      .then(() => {
        setValue("");
        onHide(false);
      })
      .catch(console.error);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Add Type Name"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addType}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
