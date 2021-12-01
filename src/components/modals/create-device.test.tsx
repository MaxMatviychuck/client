import React from "react";
import { render, act, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { createStore } from "../../store";

import CreateDevice from "./create-device";

const mockDispatch = jest.fn();

const mockDeviceCreate = jest.fn();
const mockDeviceUpdate = jest.fn();

jest.mock(
  "react-redux",
  (): Record<string, unknown> => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => () => mockDispatch(),
  })
);

jest.mock(
  "../../shared/device/slice",
  (): Record<string, unknown> => ({
    ...jest.requireActual("../../shared/device/slice"),
    deviceCreate: (data: FormData) => mockDeviceCreate(data),
    deviceUpdate: (data: FormData) => mockDeviceUpdate(data),
  })
);

describe("Create Device", () => {
  let file: File;
  beforeEach(() => {
    file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
  });
  it("Should Be Able To Create Device", async () => {
    mockDispatch.mockImplementation(async () =>
      Promise.resolve({
        payload: {
          id: "123",
          name: "11 Pro",
          price: "800",
          img: file,
          brandId: "1",
          typeId: "1",
          info: "Nu Takoe",
        },
      })
    );
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createStore()}>
            <CreateDevice deviceToUpdate={null} show={true} onHide={() => {}} />
          </Provider>
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Choose Type"), {
        target: { value: "Phone" },
      });
      fireEvent.click(screen.getByText("Choose Brand"), {
        target: { value: "Samsung" },
      });
      fireEvent.input(screen.getByPlaceholderText("Enter Device Name"), {
        target: { value: "11 Pro" },
      });
      fireEvent.input(screen.getByPlaceholderText("Enter Device Price"), {
        target: { value: "800" },
      });
      fireEvent.change(screen.getByPlaceholderText("Select Image"), {
        target: { files: [file] },
      });
      fireEvent.input(screen.getByPlaceholderText("Enter Device Info"), {
        target: { value: "Nu Takoe" },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Add"));
    });

    const formData = new FormData();
    formData.append("name", "11 Pro");
    formData.append("price", `800`);
    formData.append("img", file);
    formData.append("brandId", "1");
    formData.append("typeId", "1");
    formData.append("info", "Nu Takoe");

    expect(mockDeviceCreate).toBeCalledWith(formData);
  });
  it("Should Be Able To Update Device", async () => {
    mockDispatch.mockImplementation(async () =>
      Promise.resolve({
        payload: {
          id: "123",
          name: "11 Pro",
          price: "800",
          img: file,
          brandId: "1",
          typeId: "1",
          info: "Nu Takoe",
        },
      })
    );
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createStore()}>
            <CreateDevice
              deviceToUpdate={{
                id: "123",
                name: "11 Pro",
                price: 800,
                img: "file",
                brandId: 1,
                typeId: 1,
                info: "Nu Takoe",
              }}
              show={true}
              onHide={() => {}}
            />
          </Provider>
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Choose Type"), {
        target: { value: "Phone" },
      });
      fireEvent.click(screen.getByText("Choose Brand"), {
        target: { value: "Samsung" },
      });
      fireEvent.input(screen.getByPlaceholderText("Enter Device Name"), {
        target: { value: "11 Pro" },
      });
      fireEvent.input(screen.getByPlaceholderText("Enter Device Price"), {
        target: { value: "800" },
      });
      fireEvent.change(screen.getByPlaceholderText("Select Image"), {
        target: { files: [file] },
      });
      fireEvent.input(screen.getByPlaceholderText("Enter Device Info"), {
        target: { value: "Nu Takoe" },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Update"));
    });

    const formData = new FormData();
    formData.append("name", "11 Pro");
    formData.append("price", `800`);
    formData.append("img", file);
    formData.append("brandId", "1");
    formData.append("typeId", "1");
    formData.append("info", "Nu Takoe");

    expect(mockDeviceUpdate).toBeCalledWith({ id: "123", device: formData });
  });
});
