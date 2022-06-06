import { ThemeProvider } from "@emotion/react";
import { GeistProvider } from "@geist-ui/core";
import CollectionProvider from "../context/CollectionProvider";
import theme from "../utils/theme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CollectionProvider>
        <GeistProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GeistProvider>
      </CollectionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
