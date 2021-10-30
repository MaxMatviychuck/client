import { authHost, host } from "./index";
import { RegistrationResponse } from "../shared/user/types";

export const registration = async (params: {
  email: string;
  password: string;
  role: string;
  username: string;
}) => {
  const { username, email, password, role } = params;
  const response: RegistrationResponse = await host.post("/user", {
    username,
    email,
    password,
    role,
  });
  const { data } = response;
  localStorage.setItem("token", data.token);
  return data;
};

export const login = async (params: { email: string; password: string }) => {
  const { email, password } = params;
  const response: RegistrationResponse = await host.post("/user/login", {
    email,
    password,
  });
  const { data } = response;
  localStorage.setItem("token", data.token);
  return data;
};

export const getCurrUser = async (id: string) => {
  const response: RegistrationResponse = await authHost.get(
    `user/current-user/${id}`
  );
  const { data } = response;
  return data;
};
