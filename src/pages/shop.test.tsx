import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

import { createStore } from "../store";

import Shop from "./shop";

describe("Shop", () => {
  it("Should Be Rendered", async () => {
    render(
      <MemoryRouter>
        <Provider store={createStore()}>
          <Shop />
        </Provider>
      </MemoryRouter>
    );
  });
});
