import { SetStateAction, Dispatch } from "react";

import { Device } from "../../shared/device/types";

export type ModalsProps = {
  show: boolean;
  onHide: Dispatch<SetStateAction<boolean | undefined>>;
};

export type DeviceModalProps = ModalsProps & {
  deviceToUpdate: Device | null;
};
