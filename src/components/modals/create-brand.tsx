import React, { useState, FC } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { brandCreate } from "../../shared/device/slice";
import { useAppDispatch } from "../../store/index";
import { ModalsProps } from "./types";

const CreateBrand: FC<ModalsProps> = ({ show, onHide }) => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");

  const addBrand = () => {
    dispatch(brandCreate(value))
      .then(() => {
        setValue("");
        onHide(false);
      })
      .catch(console.error);
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Add Brand Name"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => onHide(false)}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addBrand}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
