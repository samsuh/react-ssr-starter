//Separate out express server logic from the react/server-side logic.

import "babel-polyfill"; //to allow async/await inside server and client side bundles.
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";

import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

const app = express();

app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    },
  })
);

app.use(express.static("public"));

//express handles * route because it passes it to React Router (BrowserRouter on Client side, and StaticRouter on the server side.)
app.get("*", (req, res) => {
  //pass req into createStore to help pass data around for auth purposes
  const store = createStore(req);

  //logic to initial and load data into store.
  //matchRoutes takes two arguments: the Route-configuration array, and the second is the path the user is attempting to view on req.path
  // itll look at the two and return an array of components to be rendered.
  //  now that the loadData function exists on the route object, map over the route objects to invoke the appropriate loadData function for the requested path.
  //assign the array crated by matchRoutes to a const as 'promises'
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      //some routes dont have a loadData function to invoke. if it exists, call loadData(), but if it doesnt exist, do nothing, then return it.
      // return route.loadData ? route.loadData() : null;
      //(1) pass in store to loadData
      //REFACTOR: for case where Promise.all has one failing, one solution is to wrap all inner promises to resolve (successfully or fail), and proceed with the Promise.all function call.
      //old code: return route.loadData ? route.loadData(store) : null;});
      return route.loadData ? route.loadData(store) : null;
    })
    .map((promise) => {
      //refactored code: map over promises and null. wrap promise with a new Promise, and call an inner function which has resolve/reject functions. always resolve inner promise.
      if (promise) {
        return new Promise((resolve, reject) => {
          //always resolve the inner promise
          promise.then(resolve).catch(resolve);
        });
      }
    });
  console.log(promises); //take this and pass it to Promise.all
  //(3) wait for all the inner promises to resolve using Promise.all, and that big Promise.all returns when all others are done.
  Promise.all(promises).then(() => {
    //to pass 404 status code, create 'context' object and pass it into StaticRouter component of renderer.js via the renderer() call as a third argument.
    const context = {};
    // res.send(renderer(req, store, context)); // extract the renderer() call to a variable so it can be invoked separately
    const content = renderer(req, store, context);

    //for the redirect for unauthorized attempt to access protected route
    if (context.url) {
      return res.redirect(301, context.url);
    }
    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  });

  //(1)call loadData functions, passing in redux store.
  //(2)inside loadData function, manually dispatch action creators. in UsersList.js file. from that action creator, return a promise representing the underlying request.
  //(3) wait for promise to resolve, meaning everything's ready to load. Then render.
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
