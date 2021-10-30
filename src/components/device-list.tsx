import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectDevices } from "../shared/device/selectors";
import { useAppDispatch } from "../store/index";
import { getAllDevices } from "../shared/device/slice";

import { Row } from "react-bootstrap";
import DeviceItem from "./device-item";

const DeviceList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllDevices({})).catch(console.error);
  }, [dispatch]);

  const devices = useSelector(selectDevices);

  return (
    <Row className="d-flex">
      {devices.map((device) => (
        <DeviceItem key={device.id} device={device} />
      ))}
    </Row>
  );
};

export default DeviceList;
