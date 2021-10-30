import { DeviceInitialState, FetchDeviceParams } from "./types";
import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import {
  createType,
  fetchTypes,
  createBrand,
  fetchBrands,
  createDevice,
  fetchDevices,
  fetchOneDevice,
  deleteDevice,
  updateDevice,
} from "../../http/device-api";

export const initialState: DeviceInitialState = {
  types: [],
  brands: [],
  devices: [],
  oneDevice: {
    id: "",
    name: "",
    price: 0,
    brandId: 0,
    typeId: 0,
    info: "",
    img: "",
  },
  error: null,
  loading: false,
};

export const typeCreate = createAsyncThunk(
  "type/typeCreate",
  async (typeName: string) => createType(typeName)
);

export const getAllTypes = createAsyncThunk("type/getAllTypes", async () =>
  fetchTypes()
);

export const brandCreate = createAsyncThunk(
  "type/brandCreate",
  async (brandName: string) => createBrand(brandName)
);

export const getAllBrands = createAsyncThunk("type/getAllBrands", async () =>
  fetchBrands()
);

export const deviceCreate = createAsyncThunk(
  "type/deviceCreate",
  async (params: FormData) => createDevice(params)
);

export const getAllDevices = createAsyncThunk(
  "type/getAllDevices",
  async (param: FetchDeviceParams) => fetchDevices(param)
);

export const getDeviceById = createAsyncThunk(
  "type/getDeviceById",
  async (id: string) => fetchOneDevice(id)
);

export const removeDevice = createAsyncThunk(
  "type/removeDevice",
  async (id: string) => deleteDevice(id)
);

export const deviceUpdate = createAsyncThunk(
  "type/deviceUpdate",
  async (params: { device: FormData; id: string }) => updateDevice(params)
);

const actions = [
  typeCreate,
  getAllTypes,
  brandCreate,
  getAllBrands,
  deviceCreate,
  getDeviceById,
  removeDevice,
];

const isPendingAction = isPending(getAllTypes, ...actions);
const isRejectedAction = isRejected(getAllTypes, ...actions);
const isFulfilledAction = isFulfilled(getAllTypes, ...actions);

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(typeCreate.fulfilled, (state, { payload }) => {
      state.types = [...state.types, payload];
    });

    builder.addCase(getAllTypes.fulfilled, (state, { payload }) => {
      state.types = payload;
    });

    builder.addCase(brandCreate.fulfilled, (state, { payload }) => {
      state.brands = [...state.brands, payload];
    });

    builder.addCase(getAllBrands.fulfilled, (state, { payload }) => {
      state.brands = payload;
    });

    builder.addCase(deviceCreate.fulfilled, (state, { payload }) => {
      state.devices = [...state.devices, payload];
    });

    builder.addCase(getAllDevices.fulfilled, (state, { payload }) => {
      state.devices = payload;
    });

    builder.addCase(getDeviceById.fulfilled, (state, { payload }) => {
      state.oneDevice = payload;
    });

    builder.addCase(removeDevice.fulfilled, (state, { meta: { arg } }) => {
      const newDevicesList = state.devices.filter(
        (device) => device.id !== arg
      );
      state.devices = newDevicesList;
    });

    builder.addCase(deviceUpdate.fulfilled, (state, { payload }) => {
      Object.assign(
        state.devices.find((device) => device.id === payload.id),
        payload
      );
    });

    builder.addMatcher(isRejectedAction, (state, { error }) => {
      state.error = error.message;
    });

    builder.addMatcher(isPendingAction, (state) => {
      state.loading = true;
    });

    builder.addMatcher(isFulfilledAction, (state) => {
      state.loading = false;
      state.error = null;
    });
  },
});
