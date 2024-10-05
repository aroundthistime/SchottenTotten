import { css } from "@emotion/react";

export const fullScreenCss = css`
  width: 100vw;
  height: 100vh;

  @supports (height: 100vh) {
    height: 100dvh;
  }
`;
