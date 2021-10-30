import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";

import { history } from "./store/history";
import { ROUTES } from "./routes";
import { Admin } from "./pages/admin";
import Auth from "./pages/auth";
import Shop from "./pages/shop";
import NavBar from "./components/nav-bar";
import { createStore } from "./store/index";
import { UserData } from "./user-data/user-data";

export const App = () => {
  return (
    <Provider store={createStore()}>
      <ConnectedRouter history={history}>
        <React.StrictMode>
          <UserData>
            {(user) => {
              return (
                <>
                  <NavBar />
                  <div className="App">
                    <Switch>
                      {user.role && (
                        <Route path={ROUTES.SHOP_ROUTE} component={Shop} />
                      )}

                      {user.role === "admin" && (
                        <Route path={ROUTES.ADMIN_ROUTE} component={Admin} />
                      )}
                      <Route path={ROUTES.LOGIN_ROUTE} component={Auth} />
                      <Route
                        path={ROUTES.REGISTRATION_ROUTE}
                        component={Auth}
                      />

                      <Redirect to={ROUTES.LOGIN_ROUTE} />
                    </Switch>
                  </div>
                </>
              );
            }}
          </UserData>
        </React.StrictMode>
      </ConnectedRouter>
    </Provider>
  );
};
