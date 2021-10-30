import React, { useEffect, useState, FC } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

import {
  deviceCreate,
  getAllBrands,
  getAllTypes,
  deviceUpdate,
} from "../../shared/device/slice";
import { selectBrands, selectTypes } from "../../shared/device/selectors";
import { useAppDispatch } from "../../store/index";
import { Brand, Type } from "../../shared/device/types";
import { DeviceModalProps } from "./types";

const CreateDevice: FC<DeviceModalProps> = ({
  show,
  onHide,
  deviceToUpdate,
}) => {
  const dispatch = useAppDispatch();

  const brands = useSelector(selectBrands);
  const types = useSelector(selectTypes);

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<string | Blob>("");
  const [info, setInfo] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<Brand | null | undefined>(
    null
  );
  const [selectedType, setSelectedType] = useState<Type | null | undefined>(
    null
  );

  useEffect(() => {
    if (!brands.length || !types.length)
      dispatch(getAllTypes()).catch(console.error);
    dispatch(getAllBrands()).catch(console.error);
  }, [brands.length, types.length, dispatch]);

  useEffect(() => {
    if (deviceToUpdate && brands.length && types.length) {
      setName(deviceToUpdate.name);
      setPrice(deviceToUpdate.price);
      setInfo(deviceToUpdate.info);
      setSelectedBrand(
        brands.find(
          (brand) => parseInt(brand.id, 10) === deviceToUpdate.brandId
        )
      );
      setSelectedType(
        types.find((type) => parseInt(type.id, 10) === deviceToUpdate.typeId)
      );
    }
  }, [deviceToUpdate, brands, types]);

  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", selectedBrand?.id || "1");
    formData.append("typeId", selectedType?.id || "1");
    formData.append("info", info);
    if (deviceToUpdate) {
      dispatch(deviceUpdate({ id: deviceToUpdate.id, device: formData }))
        .then(() => onHide(false))
        .catch(console.error);
    } else {
      dispatch(deviceCreate(formData))
        .then(() => onHide(false))
        .catch(console.error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {selectedType?.name || "Choose Type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map((type) => (
                <Dropdown.Item
                  onClick={() => setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {selectedBrand?.name || "Choose Brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Enter Device Name"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Enter Device Price"
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          {deviceToUpdate && <span>Select Image Again</span>}
          <hr />
          <Form.Control
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="mt-3"
            placeholder="Enter Device Info"
            type="string"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => onHide(false)}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addDevice} disabled={!file}>
          {deviceToUpdate ? " Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
