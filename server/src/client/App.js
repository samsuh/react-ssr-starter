import React from "react";
import { renderRoutes } from "react-router-config";
import Header from "./components/Header";
import { fetchCurrentUser } from "./actions";

const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

//eventually tie data loading to this. if there are action creator/request that we want to execute for every page in the app
export default {
  component: App,
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser()),
};
