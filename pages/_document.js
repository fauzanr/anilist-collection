import Document, { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@geist-ui/core";
import globalStyles from "../components/styled/globalStyles";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const styles = CssBaseline.flush();

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
          {globalStyles}
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Anilist Collection App | generated by create next app"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
