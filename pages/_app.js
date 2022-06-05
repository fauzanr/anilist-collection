import "../styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import CollectionProvider from "../context/CollectionProvider";
import theme from "../utils/theme";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../api/apollo";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <GeistProvider>
      <ThemeProvider theme={theme}>
        <CollectionProvider>
          <Layout>
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </Layout>
        </CollectionProvider>
      </ThemeProvider>
    </GeistProvider>
  );
}

export default MyApp;
