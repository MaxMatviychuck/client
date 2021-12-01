import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import DeviceList from "./device-list";
import { AppState, createStore } from "../store";
import { FetchDeviceParams } from "../shared/device/types";

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();
const mockGetAllDevices = jest.fn();

type Selector = (state: Partial<AppState>) => unknown;

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
    getAllDevices: (params: FetchDeviceParams) => mockGetAllDevices(params),
  })
);

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

describe("Device List", () => {
  it("Should Call getAllDevices On Mount", async () => {
    mockDispatch.mockImplementation(async () => Promise.resolve({}));
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback(stateMock)
    );

    render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <DeviceList />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockGetAllDevices).toBeCalledWith({});
    });
  });
});
