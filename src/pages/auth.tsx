import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import { userRegistration, userLogin } from "../shared/user/slice";
import { useAppDispatch } from "../store/index";
import { ROUTES } from "../routes";

const Auth = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const isLogin = location.pathname === ROUTES.LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");

  const click = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    isLogin
      ? await dispatch(userLogin({ email, password }))
          .then(unwrapResult)
          .then((response) => {
            if (response.role === "admin") {
              history.push(ROUTES.ADMIN_ROUTE);
            } else {
              history.push(ROUTES.SHOP_ROUTE);
            }
          })
          .catch(console.error)
      : await dispatch(
          userRegistration({
            username,
            email,
            password,
            role,
          })
        )
          .then(unwrapResult)
          .then((response) => {
            if (response.role === "admin") {
              history.push(ROUTES.ADMIN_ROUTE);
            } else {
              history.push(ROUTES.SHOP_ROUTE);
            }
          })
          .catch(console.error);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
        <Form className="d-flex flex-column" onSubmit={click}>
          {!isLogin && (
            <Form.Control
              className="mt-3"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <Form.Control
            className="mt-3"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {!isLogin && (
            <Form.Control
              className="mt-3"
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          )}
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                No account?{" "}
                <NavLink to={ROUTES.REGISTRATION_ROUTE}>Register!</NavLink>
              </div>
            ) : (
              <div>
                Have an account?{" "}
                <NavLink to={ROUTES.LOGIN_ROUTE}>Log In!</NavLink>
              </div>
            )}
            <Button variant={"outline-success"} type="submit">
              {isLogin ? "Log In" : "Registration"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
