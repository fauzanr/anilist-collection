import "../styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import CollectionProvider from "../context/CollcectionProvider";
import theme from "../utils/theme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider>
      <ThemeProvider theme={theme}>
        <CollectionProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CollectionProvider>
      </ThemeProvider>
    </GeistProvider>
  );
}

export default MyApp;
