import { css, Global } from "@emotion/react";

export default (
  <Global
    styles={css`
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");

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

      @media only screen and (max-width: 576px) {
        body {
          font-size: 0.8em;
        }
      }
    `}
  />
);
