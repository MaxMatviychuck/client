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

import { createStore, AppState } from "../store";

import { Admin } from "./admin";

type Selector = (state: Partial<AppState>) => unknown;

const mockDeviceState = {
  device: {
    brands: [],
    oneDevice: {
      id: "",
      name: "",
      price: 0,
      brandId: 0,
      typeId: 0,
      info: "",
      img: "",
    },
    types: [],
    devices: [],
    error: null,
    loading: false,
  },
};

const mockTypesBrandsDeviceState = {
  device: {
    brands: [
      {
        id: "123",
        name: "IPhone",
      },
    ],
    oneDevice: {
      id: "",
      name: "",
      price: 0,
      brandId: 0,
      typeId: 0,
      info: "",
      img: "",
    },
    types: [
      {
        id: "321",
        name: "Phone",
      },
    ],
    devices: [],
    error: null,
    loading: false,
  },
};

const mockUseSelector = jest.fn();

jest.mock(
  "react-redux",
  (): Record<string, unknown> => ({
    ...jest.requireActual("react-redux"),
    useSelector: (selector: Selector) => mockUseSelector(selector),
  })
);

describe("Admin Page", () => {
  it("If no brands or types, Should not be able to create device", async () => {
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback(mockDeviceState)
    );
    const { getByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <Admin />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(getByText("add device")).toBeDisabled();
    });
  });
  it("If both brands or types, Should be able to create device, modal should appear", async () => {
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback(mockTypesBrandsDeviceState)
    );
    const { getByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <Admin />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(getByText("add device")).not.toBeDisabled();
    });
    await act(async () => {
      fireEvent.click(screen.getByText("add device"));
    });
    await waitFor(() => {
      expect(getByText("Add Device")).toBeInTheDocument();
    });
  });
  it("If click on 'Add Brand' Btn,  modal should appear", async () => {
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback(mockDeviceState)
    );
    const { getByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <Admin />
        </Provider>
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("add brand"));
    });

    await waitFor(() => {
      expect(getByText("Add Brand")).toBeInTheDocument();
    });
  });
  it("If click on 'Add Type' Btn,  modal should appear", async () => {
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback(mockDeviceState)
    );
    const { getByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <Admin />
        </Provider>
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("add type"));
    });

    await waitFor(() => {
      expect(getByText("Add Type")).toBeInTheDocument();
    });
  });
});
