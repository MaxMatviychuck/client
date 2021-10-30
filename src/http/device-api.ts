import { authHost, host } from "./index";
import { Brand, Type, Device, FetchDeviceParams } from "../shared/device/types";

export const createType = async (type: string) => {
  const response: {
    data: { id: string; name: string };
  } = await authHost.post("http://localhost:3001/type", { name: type });
  return response.data || [];
};

export const fetchTypes = async () => {
  const response: { data: Type[] } = await authHost.get(
    "http://localhost:3001/type"
  );
  const { data } = response;
  return data;
};

export const createBrand = async (brand: string) => {
  const response: {
    data: Brand;
  } = await authHost.post("http://localhost:3001/brand", { name: brand });
  const { data } = response;
  return data;
};

export const fetchBrands = async () => {
  const response: { data: Brand[] } = await authHost.get(
    "http://localhost:3001/brand"
  );
  const { data } = response;

  return data;
};

export const createDevice = async (device: FormData) => {
  const response: { data: Device } = await authHost.post(
    "http://localhost:3001/device",
    device
  );
  const { data } = response;
  return data;
};

export const fetchDevices = async ({
  typeId,
  brandId, // limits and pagination were not implemented
  page,
  limit = 5,
}: FetchDeviceParams) => {
  const response: { data: Device[] } = await host.get(
    "http://localhost:3001/device",
    {
      params: {
        typeId,
        brandId,
        page,
        limit,
      },
    }
  );
  const { data } = response;
  return data;
};

export const fetchOneDevice = async (id: string) => {
  const response: { data: Device } = await host.get(
    `http://localhost:3001/device/${id}`
  );
  const { data } = response;
  return data;
};

export const deleteDevice = async (id: string) => {
  await authHost.delete(`http://localhost:3001/device/${id}`);
};

export const updateDevice = async (params: {
  id: string;
  device: FormData;
}) => {
  const response: { data: Device } = await authHost.put(
    `http://localhost:3001/device/${params.id}`,
    params.device
  );
  const { data } = response;
  return data;
};
