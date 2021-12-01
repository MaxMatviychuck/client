import React from "react";
import { render, act, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { createStore } from "../../store";

import CreateBrand from "./create-brand";

const mockDispatch = jest.fn();

const mockBrandCreate = jest.fn();

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
    brandCreate: (value: string) => mockBrandCreate(value),
  })
);

describe("Create Brand", () => {
  it("Should Be Able To Create Brand", async () => {
    mockDispatch.mockImplementation(async () => Promise.resolve());
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={createStore()}>
            <CreateBrand show={true} onHide={() => {}} />
          </Provider>
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.input(screen.getByPlaceholderText("Add Brand Name"), {
        target: { value: "Samsung" },
      });
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Add"));
    });

    expect(mockBrandCreate).toBeCalledWith("Samsung");
  });
  it.skip("Should Hide Create Brand Modal When Close Clicked", async () => {
    const { queryByText } = render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <CreateBrand
            show={false}
            onHide={() => {
              return false;
            }}
          />
        </Provider>
      </MemoryRouter>
    );
    await act(async () => {
      fireEvent.click(screen.getByText("Close"));
    });
    expect(queryByText("Add Brand")).not.toBeInTheDocument();
  });
});
