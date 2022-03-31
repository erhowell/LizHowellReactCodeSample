import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import { AnyAction } from "redux";
import { Provider } from "react-redux";
import { ThunkAction } from "redux-thunk";
import App from "./App";
import configureStore from "./Store/configureStore";
import { RootState } from "./Store/reducer";
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

export type GetStateType = typeof store.getState;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
