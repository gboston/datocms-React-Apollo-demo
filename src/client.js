import { ApolloClient } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import schema from "./schema.json";
// schema.json should be manually updated every time changes are made to the schema

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema
});

const apiToken = process.env.REACT_APP_DATO_API_TOKEN;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + apiToken
};
const cache = new InMemoryCache({
  dataIdFromObject: obj => obj.id,
  addTypename: false,
  fragmentMatcher
});
const link = new HttpLink({
  uri: "https://graphql.datocms.com",
  headers
});
const client = new ApolloClient({
  cache,
  link
});

export default client;
