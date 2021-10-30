import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../store/root-reducer";

import { deviceSlice } from "./slice";
import { DeviceInitialState } from "./types";

const selectState = (state: AppState) => state[deviceSlice.name];

export const selectTypes = createSelector(
  selectState,
  (state: DeviceInitialState) => state.types
);

export const selectBrands = createSelector(
  selectState,
  (state: DeviceInitialState) => state.brands
);

export const selectDevices = createSelector(
  selectState,
  (state: DeviceInitialState) => state.devices
);

export const selectOneDevice = createSelector(
  selectState,
  (state: DeviceInitialState) => state.oneDevice
);
