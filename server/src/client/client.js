//entrypoint for client code
import "babel-polyfill"; //allows babel to use async/await properly by using its helper functions.
import React from "react";
import ReactDOM from "react-dom";
// import Home from "./components/Home"; //dont need cuz we have Routes now
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import axios from "axios";
import Routes from "./Routes";
import { renderRoutes } from "react-router-config";
import reducers from "./reducers";

const axiosInstance = axios.create({
  baseURL: "/api",
});

// server side state is prepopulated with all the data we need, so load that object as initial state instead of empty object.
// const store = createStore(reducers, {}, applyMiddleware(thunk));
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {/* <Routes /> */}
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
