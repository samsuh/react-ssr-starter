//Higher order components are functions that take in a component, and enhances that input component.
//HOC are common around authentication/redirect/validation logic.

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default (ChildComponent) => {
  //new component that wraps ChildComponent
  class RequireAuth extends Component {
    render() {
      //switch over auth state to determine what we want to do
      switch (this.props.auth) {
        case false:
          return <Redirect to="/" />;
        case null:
          return <div>Loading...</div>;
        default:
          //spreading props makes sure to pass along any props that were passed into ChildComponent
          return <ChildComponent {...this.props} />;
      }
    }
  }

  //get authentication piece of state to RequireAuth component
  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
