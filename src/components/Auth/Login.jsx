import React, { Component } from "react";
import PropTypes from "prop-types";
import Auth0Lock from "auth0-lock";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();

    this.lock = new Auth0Lock(
      "Z60BoPhrpK2dPNWK9qdO6Tzd3nnH1NeZ",
      "leaderhosen.auth0.com"
    );
  }

  login = () => {
    this.lock.show();
  };

  componentDidMount() {
    this.lock.on("authenticaed", authResult => {
      window.localStorage.setItem("auth0IdToken", authResult.idToken);
      this.props.history.push("/signup");
    });
  }

  render() {
    return (
      <section>
        <p>Login to Leaderhosen!</p>
        <button onClick={this.login}>Welcome</button>
      </section>
    );
  }
}

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object.isRequired
};
