import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { selectTypes } from "../shared/device/selectors";
import { useAppDispatch } from "../store/index";
import { getAllTypes } from "../shared/device/slice";
import { Type } from "../shared/device/types";

const TypeBar = () => {
  const dispatch = useAppDispatch();

  const [selectedType, setSelectedType] = useState<Type | null>(null);

  useEffect(() => {
    dispatch(getAllTypes()).catch(console.error);
  }, [dispatch]);

  const types = useSelector(selectTypes);

  return (
    <ListGroup>
      {types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={selectedType?.id ? type.id === selectedType.id : false}
          onClick={() => setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TypeBar;
