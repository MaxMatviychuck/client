import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../routes";
import { useSelector } from "react-redux";
import { selectProfile } from "../shared/user/selectors";
import { useAppDispatch } from "../store/index";
import { userLogout } from "../shared/user/slice";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useSelector(selectProfile);

  const logOut = () => {
    dispatch(userLogout());
    localStorage.removeItem("token");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={ROUTES.SHOP_ROUTE}>
          DeviceShop
        </NavLink>
        {user?.role === "admin" && (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(ROUTES.ADMIN_ROUTE)}
            >
              Admin
            </Button>
          </Nav>
        )}
        {user?.role ? (
          <Button
            variant={"outline-light"}
            onClick={() => logOut()}
            className="ml-2"
          >
            Log Out
          </Button>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(ROUTES.LOGIN_ROUTE)}
            >
              Auth
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
