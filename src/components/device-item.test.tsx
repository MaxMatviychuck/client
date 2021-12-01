import React from "react";
import { render, waitFor, act, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import DeviceItem from "./device-item";
import { AppState, createStore } from "../store";

const mockUseSelector = jest.fn();
const mockDispatch = jest.fn();
const mockRemoveDevice = jest.fn();

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
    removeDevice: (id: string) => mockRemoveDevice(id),
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

const deviceMock = {
  id: "123",
  img: "https://some-super-link.com",
  name: "Iphone",
  price: "8000000000",
  info: "nu takoe",
};

describe("Device Item", () => {
  it("If user is Admin, should be able to update and delete item", async () => {
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback(stateMock)
    );

    mockDispatch.mockImplementation(async () => Promise.resolve());

    const { getByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <DeviceItem device={deviceMock} />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Update")).toBeInTheDocument();
      expect(getByText("Delete")).toBeInTheDocument();
    });
  });
  it("If user is not Admin, he should not be able to update and delete item", async () => {
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback({
        ...stateMock,
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

    mockDispatch.mockImplementation(async () => Promise.resolve());

    const { queryByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <DeviceItem device={deviceMock} />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(queryByText("Update")).not.toBeInTheDocument();
      expect(queryByText("Delete")).not.toBeInTheDocument();
    });
  });
  it("If user is Admin, and 'Update' btn fired, update modal should mount", async () => {
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback(stateMock)
    );

    mockDispatch.mockImplementation(async () => Promise.resolve());

    const { getByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <DeviceItem device={deviceMock} />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getByText("Update")).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(getByText("Update"));
    });

    await waitFor(() => {
      expect(getByText("Add Device")).toBeInTheDocument();
    });
  });
  it("If user is Admin, and 'Delete' btn fired, device item should unmount", async () => {
    mockDispatch.mockImplementation(async () => Promise.resolve());
    mockUseSelector.mockImplementation((callback: Selector) =>
      callback(stateMock)
    );

    const { getByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <DeviceItem device={deviceMock} />
        </Provider>
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(getByText("Delete"));
    });

    expect(mockRemoveDevice).toBeCalledWith("123");
  });
});
