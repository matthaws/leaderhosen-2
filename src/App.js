import React, { Component } from "react";
import PropTypes from "prop-types";
import Login from "./components/Auth/Login";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    debugger;
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    if (!this.props.data.user) {
      return <Login />;
    }

    return <div>Logged In!</div>;
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`;

export default graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
  withRouter(App)
);
