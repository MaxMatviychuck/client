import React from "react";
import { render, act, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { createStore } from "../../store";

import CreateType from "./create-type";

const mockDispatch = jest.fn();

const mockTypeCreate = jest.fn();

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
    typeCreate: (value: string) => mockTypeCreate(value),
  })
);

describe("Create Type", () => {
  it("Should Be Able To Create Type", async () => {
    mockDispatch.mockImplementation(async () => Promise.resolve());
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createStore()}>
            <CreateType show={true} onHide={() => {}} />
          </Provider>
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText("Add Type Name"), {
        target: { value: "Phone" },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Add"));
    });

    expect(mockTypeCreate).toBeCalledWith("Phone");
  });
});
