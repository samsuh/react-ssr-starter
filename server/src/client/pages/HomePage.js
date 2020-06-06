import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div
        className="center-align"
        style={{
          paddingTop: "200px",
        }}
      >
        <h3>Welcome to the Home Component</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt,
          unde.
        </p>
      </div>
      <div className="ui container"></div>
    </div>
  );
};

export default {
  component: Home,
};
