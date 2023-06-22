import { css, styled } from "styled-components";

export const AnimateContainer = styled.div<{
  $onScreen: boolean;
}>`
  opacity: ${(props) => (props.$onScreen ? "1" : "0")};
  translate: ${(props) => (props.$onScreen ? "none" : "0 2rem")};
  transition: 600ms ease-in-out;

  > div > div > img {
    ${(props) =>
      props.$onScreen &&
      css`
        opacity: 1;
        filter: blur(0);
        transform: translateX(0);
      `}
  }
`;
