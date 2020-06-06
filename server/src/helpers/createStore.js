// server side redux store. create store, work with it before rendering it. once it goes to Provider, it should be all ready for front end consumption.
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

import reducers from "../client/reducers";

export default (req) => {
  const axiosInstance = axios.create({
    baseURL: "http://react-ssr-api.herokuapp.com",
    headers: { cookie: req.get("cookie") || "" },
  });

  // const store = createStore(reducers, {}, applyMiddleware(thunk));
  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );

  return store;
};

//unlike client side, we want to do all the work before rendering anything, so it will be handled inside our route handler at ../index.js; load store, initial data loading, then eventually render.
