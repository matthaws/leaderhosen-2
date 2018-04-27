import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class SignUp extends Component {
  state = {
    username: ""
  };

  createUser = async () => {
    const userInfo = {
      idToken: window.localStorage.getItem("auth0IdToken"),
      username: this.state.username
    };

    const res = await this.props.createUser({ userInfo });
    this.props.history.replace("/");
  };

  handleNameChange = e => this.setState({ username: e.target.value });

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }

    if (
      this.props.data.user ||
      window.localStorage.getItem("auth0IdToken") === null
    ) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <input
          value={this.state.username}
          placeholder="Username"
          onChange={this.handleNameChange}
        />
        {this.state.username && (
          <button onClick={this.createUser}>Create</button>
        )}
      </div>
    );
  }
}

SignUp.propTypes = {
  createUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const createUser = gql`
  mutation($idToken: String!, $username: String!) {
    createUser(
      authProvider: { auth0: { idToken: $idToken } }
      username: $username
    ) {
      id
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(createUser, { name: "createUser" })(
  graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
    withRouter(SignUp)
  )
);
