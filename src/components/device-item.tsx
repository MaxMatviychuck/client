import React, { useState } from "react";
import { Card, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Image from "react-bootstrap/Image";

import { useAppDispatch } from "../store/index";
import { selectProfile } from "../shared/user/selectors";
import { removeDevice } from "../shared/device/slice";
import CreateDevice from "../components/modals/create-device";

const DeviceItem = ({ device }: any) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectProfile);

  const [deviceVisible, setDeviceVisible] = useState(false);

  const deleteDevice = () => {
    dispatch(removeDevice(device.id));
  };

  return (
    <Col md={4} className={"mt-3"}>
      <Card style={{ width: 250 }} border={"light"}>
        <Image
          width={"100%"}
          height={200}
          src={`http://localhost:3001/${device.img}`}
          style={{ objectFit: "contain" }}
        />
        <Card.Body>
          <Card.Title>{device.name}</Card.Title>
          <Card.Title>{`${device.price}$`}</Card.Title>
          <Card.Text>{device.info}</Card.Text>
          {user?.role === "admin" && (
            <div className="mt-1 d-flex justify-content-between align-items-center">
              <Button onClick={() => setDeviceVisible(true)} variant="warning">
                Update
              </Button>
              <Button onClick={deleteDevice} variant="danger">
                Delete
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
        deviceToUpdate={device}
      />
    </Col>
  );
};

export default DeviceItem;
