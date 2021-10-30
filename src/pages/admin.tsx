import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { selectBrands, selectTypes } from "../shared/device/selectors";
import CreateBrand from "../components/modals/create-brand";
import CreateDevice from "../components/modals/create-device";
import CreateType from "../components/modals/create-type";

export const Admin = () => {
  const brands = useSelector(selectBrands);
  const types = useSelector(selectTypes);

  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Add type
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Add brand
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
        disabled={!types.length || !brands.length}
      >
        Add device
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
        deviceToUpdate={null}
      />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
    </Container>
  );
};
