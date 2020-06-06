//SSR and React logic goes here, extracted from index.js main file, which now contains only the express logic.

import React from "react";
import { renderToString } from "react-dom/server";
// import Home from "../client/components/Home"; //being rendered by the Routes component
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import serialize from "serialize-javascript"; // scrubs data to prevent cross site scripting attacks.
import Routes from "../client/Routes"; //Routes.js file is no longer exporting a component, but now an array of route objects
import { renderRoutes } from "react-router-config"; //renderRoutes takes the route objects and turns them into normal route components, and returns those.
import { Helmet } from "react-helmet";

//by the time we pass 'store' into this function, it's already loaded up with all the data it needs.
export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      {/* context is what gives us the ability to communicate from render components back to renderer file. we made it in src/index.js and passed it as context in props down to here. to display 404, pass context to 404 as prop */}
      <StaticRouter context={{}} location={req.path} context={context}>
        {/* <Routes /> */}
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  //window.INITIAL_STATE is now available with the fully loaded server-side state, which can be set as the initial state on the client side state/reduxstore.
  return `
  <html>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    </head>
    <body>
      <div id='root'>${content}</div>
      <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
      <script src="bundle.js"></script>
    </body>
  </html>
`;
};
