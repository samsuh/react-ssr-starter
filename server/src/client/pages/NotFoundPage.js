import React from "react";

//staticContext is the 'context' object passed in here. this sets the 'notFound' that sets the context object back in src/index.js
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h1>404 Route not found</h1>;
};

export default {
  component: NotFoundPage,
};
