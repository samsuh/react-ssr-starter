import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div
        className="center-align"
        style={{
          paddingTop: "200px",
          paddingBottom: "200px",
          backgroundImage:
            "url(" +
            "https://images.pexels.com/photos/3162828/pexels-photo-3162828.jpeg" +
            ")",
        }}
      >
        <h3>Welcome to the Home Component</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt,
          unde.
        </p>
      </div>
      <div className="ui container">
        <Link
          to="/tasks/new"
          className="waves-effect waves-light btn-large right"
        >
          <i className="material-icons right">+</i>Create New Task
        </Link>

        <TaskList />
      </div>
    </div>
  );
};

export default {
  component: Home,
};
