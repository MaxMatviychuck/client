import React, { useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../store/index";
import { getAllBrands } from "../shared/device/slice";
import { selectBrands } from "../shared/device/selectors";

const BrandBar = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBrands()).catch(console.error);
  }, [dispatch]);

  const brands = useSelector(selectBrands);
  return (
    <Row className="d-flex">
      {brands.map((brand) => (
        <Card
          style={{ cursor: "pointer" }}
          key={brand.id}
          className="p-3"
          // onClick={() => device.setSelectedBrand(brand)}
          // border={brand.id === device.selectedBrand.id ? "danger" : "light"}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
};

export default BrandBar;
