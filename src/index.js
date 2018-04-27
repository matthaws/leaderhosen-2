import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloProvider, createNetworkInterface } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./index.css";
import App from "./App";
import SignUp from "./components/Auth/SignUp";
import registerServiceWorker from "./registerServiceWorker";

const httplink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cjghxqjrq4pl80163tcot9apc"
});

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("auth0IdToken");
  const headerValue = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: headerValue
    }
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httplink),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <main className="root">
        <Route exact path="/" component={App} />
        <Route exact path="/signup" component={SignUp} />
      </main>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
