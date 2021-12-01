import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import TypeBar from "./type-bar";
import { AppState, createStore } from "../store";

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();

const mockGetAllTypes = jest.fn();

type Selector = (state: Partial<AppState>) => unknown;

const stateMock = {
  user: {
    profile: {
      id: "1366613max66613666",
      username: "Max",
      email: "max@gmail.com",
      role: "admin",
    },
    error: null,
  },
  device: {
    brands: [],
    types: [],
    error: null,
    loading: false,
    oneDevice: {
      id: "",
      name: "",
      price: 0,
      brandId: 0,
      typeId: 0,
      info: "",
      img: "",
    },
    devices: [],
  },
};

jest.mock(
  "react-redux",
  (): Record<string, unknown> => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => () => mockDispatch(),
    useSelector: (selector: Selector) => mockUseSelector(selector),
  })
);

jest.mock(
  "../shared/device/slice",
  (): Record<string, unknown> => ({
    ...jest.requireActual("../shared/device/slice"),
    getAllTypes: () => mockGetAllTypes(),
  })
);

describe("Type Bar", () => {
  it("Should Call getAllTypes On Mount", async () => {
    mockDispatch.mockImplementation(async () => Promise.resolve());
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback(stateMock)
    );

    render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <TypeBar />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(mockGetAllTypes).toBeCalled();
    });
  });
});
