import "../styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import CollectionProvider from "../context/CollcectionProvider";
import theme from "../utils/theme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CollectionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CollectionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
