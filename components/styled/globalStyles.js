import { css, Global } from "@emotion/react";

export default (
  <Global
    styles={css`
      :root {
        --txtBlack: #04111d;
        --txtPrimary: #04111dbf;
      }

      * {
        font-family: Poppins, sans-serif;
      }

      html,
      body {
        padding: 0;
        margin: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: var(--txtBlack);
        margin: 0;
      }

      p,
      span,
      label {
        color: var(--txtPrimary);
        margin: 0;
      }

      a {
        text-decoration: none;
      }

      * {
        box-sizing: border-box;
      }
    `}
  />
);
