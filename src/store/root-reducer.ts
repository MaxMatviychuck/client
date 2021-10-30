import { combineReducers, CombinedState } from "redux";
import { RouterState } from "connected-react-router";

// import { IdentityPropertiesState } from '@app/shared/user/types';
import { userSlice } from "../shared/user";
import { UserState } from "../shared/user";
import { deviceSlice } from "../shared/device";
import { DeviceInitialState } from "../shared/device";
import { routerReducer } from "./history";

export type AppState = CombinedState<{
  router: RouterState<unknown>;
  [userSlice.name]: UserState;
  [deviceSlice.name]: DeviceInitialState;
}>;

export const rootReducer = combineReducers({
  router: routerReducer,
  [userSlice.name]: userSlice.reducer,
  [deviceSlice.name]: deviceSlice.reducer,
});
