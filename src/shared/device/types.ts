export type Device = {
  id: string;
  name: string;
  price: number;
  brandId: number;
  typeId: number;
  info: string;
  img: string;
};

export type DevicePayload = Omit<Device, "id">;

export type FetchDeviceParams = {
  typeId?: number;
  brandId?: number;
  page?: number;
  limit?: number;
};

export type Type = {
  id: string;
  name: string;
};

export type Brand = Type;

export type DeviceInitialState = {
  types: Type[];
  brands: Brand[];
  devices: Device[];
  oneDevice: Device;
  error: unknown;
  loading: boolean;
};
