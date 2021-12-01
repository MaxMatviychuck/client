import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import NavBar from "./nav-bar";
import { AppState, createStore } from "../store";

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();
const mockHistoryPush = jest.fn();
const mockLocation = jest.fn();

type Selector = (state: Partial<AppState>) => unknown;

jest.mock(
  "react-router",
  (): Record<string, unknown> => ({
    ...jest.requireActual("react-router"),
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
    useSelector: (selector: Selector) => mockUseSelector(selector),
  })
);

describe("Admin Link depending on role", () => {
  afterEach(() => {
    mockUseSelector.mockClear();
  });
  it("If user role is Admin, Link to admin page should appear", async () => {
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback({
        user: {
          profile: {
            id: "1366613max66613666",
            username: "Max",
            email: "max@gmail.com",
            role: "admin",
          },
          error: null,
        },
      })
    );

    const { getByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <NavBar />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(getByText("Admin")).toBeInTheDocument();
    });
  });
  it("If user role is not Admin, Link to admin page should not appear", async () => {
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback({
        user: {
          profile: {
            id: "1366613max66613666",
            username: "Max",
            email: "max@gmail.com",
            role: "user",
          },
          error: null,
        },
      })
    );

    const { queryByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <NavBar />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(queryByText("Admin")).not.toBeInTheDocument();
    });
  });
});
