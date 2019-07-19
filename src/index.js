import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import App from "./components/App";
import { ApolloProvider } from "react-apollo";
import client from "./client";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
