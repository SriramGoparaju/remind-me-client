import React from "react";
import App from "./App";
import { ApolloProvider, InMemoryCache, ApolloClient , createHttpLink} from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
	uri: "https://stormy-sands-09027.herokuapp.com/",
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
