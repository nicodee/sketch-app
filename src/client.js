import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.sketch.cloud/api",
  fetchOptions: {
    mode: "no-cors",
  },
  cache: new InMemoryCache(),
});

export default client;
