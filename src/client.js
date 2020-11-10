import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.sketch.cloud/api",
  cache: new InMemoryCache(),
});

export default client;
