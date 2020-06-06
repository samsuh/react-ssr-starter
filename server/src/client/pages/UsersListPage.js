import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";
//helmet is to help create SEO-friendly head tags
import { Helmet } from "react-helmet";

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers(); // throws error on server side. refactor later.
  }
  //map over 'users' to extract user info.
  renderUsers() {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  head() {
    //helmet creates these tags and remembers them. in renderer.js we extract these and put them in the html template that gets rendered.
    // <title>Users SSR App</title>
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="Users SSR App" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        List of Users goes here
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

function loadData(store) {
  // console.log("Trying to load data from UsersList loadData function");
  //manual dispatch. fetchUsers called, make network request, return promise representing network request.
  // to send back that promise that was created, we 'return' it.
  return store.dispatch(fetchUsers());
}

export default {
  loadData: loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList),
};
