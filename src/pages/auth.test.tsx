import React from "react";
import {
  render,
  waitFor,
  act,
  fireEvent,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { createStore } from "../store";
import { ROUTES } from "../routes";

import Auth from "./auth";

const mockDispatch = jest.fn();
const mockHistoryPush = jest.fn();
const mockLocation = jest.fn();
const mockUserLogin = jest.fn();

jest.mock(
  "react-router-dom",
  (): Record<string, unknown> => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
    useLocation: () => mockLocation(),
  })
);

jest.mock(
  "react-redux",
  (): Record<string, unknown> => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => () => mockDispatch(),
  })
);

jest.mock(
  "../shared/user/slice",
  (): Record<string, unknown> => ({
    ...jest.requireActual("../shared/user/slice"),
    userLogin: (params: { email: string; password: string }) =>
      mockUserLogin(params),
  })
);

describe("User Login", () => {
  it("If user role is Admin, Should Redirect To Admin Page", async () => {
    mockDispatch.mockImplementation(async () =>
      Promise.resolve({
        payload: {
          id: "1366613max66613666",
          username: "Max",
          email: "max@gmail.com",
          role: "admin",
        },
      })
    );
    mockLocation.mockReturnValue({ pathname: ROUTES.LOGIN_ROUTE });

    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createStore()}>
            <Auth />
          </Provider>
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText("Enter email..."), {
        target: { value: "max@gmail.com" },
      });
      fireEvent.input(screen.getByPlaceholderText("Enter password..."), {
        target: { value: "1234567" },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Log In"));
    });

    expect(mockUserLogin).toBeCalledWith({
      email: "max@gmail.com",
      password: "1234567",
    });

    await waitFor(() =>
      expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.ADMIN_ROUTE)
    );
  });
  it("If user role is NOT Admin, Should Redirect To Shop Page", async () => {
    mockDispatch.mockImplementation(async () =>
      Promise.resolve({
        payload: {
          id: "1366613max66613666",
          username: "Max",
          email: "max@gmail.com",
          role: "user",
        },
      })
    );
    mockLocation.mockReturnValue({ pathname: ROUTES.LOGIN_ROUTE });

    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createStore()}>
            <Auth />
          </Provider>
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText("Enter email..."), {
        target: { value: "max@gmail.com" },
      });
      fireEvent.input(screen.getByPlaceholderText("Enter password..."), {
        target: { value: "1234567" },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Log In"));
    });

    expect(mockUserLogin).toBeCalledWith({
      email: "max@gmail.com",
      password: "1234567",
    });

    await waitFor(() =>
      expect(mockHistoryPush).toHaveBeenCalledWith(ROUTES.SHOP_ROUTE)
    );
  });
  it("If Route is Login should render 'Log In' Btn", async () => {
    mockLocation.mockReturnValue({ pathname: ROUTES.LOGIN_ROUTE });

    const { queryByText, getByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <Auth />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Log In")).toBeInTheDocument();
      expect(queryByText("Register")).not.toBeInTheDocument();
    });
  });

  it("If Route is Register should render 'Register' Btn", async () => {
    mockLocation.mockReturnValue({ pathname: ROUTES.REGISTRATION_ROUTE });

    const { queryByText, getByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <Auth />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Register")).toBeInTheDocument();
      expect(queryByText("Log In")).not.toBeInTheDocument();
    });
  });
});
