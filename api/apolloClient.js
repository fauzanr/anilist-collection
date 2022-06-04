import { ApolloClient, InMemoryCache } from "@apollo/client";

const config = {
  uri: process.env.ANILIST_URL,
  cache: new InMemoryCache(),
};

const client = new ApolloClient(config);

export default client;
