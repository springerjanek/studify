import { styled, css } from "styled-components";

export const AnimateContainer = styled.div<{
  $onScreen: boolean;
  $photos?: boolean;
}>`
  opacity: ${(props) => (props.$onScreen ? "1" : "0")};
  translate: ${(props) => (props.$onScreen ? "none" : "0 2rem")};
  transition: 600ms ease-in-out;

  > div {
    ${(props) =>
      props.$onScreen &&
      props.$photos &&
      css`
        gap: 100px;
      `}
  }

  > div > img {
    ${(props) =>
      props.$onScreen &&
      props.$photos &&
      css`
        width: 200px;
        opacity: 1;
        filter: blur(0);
        transform: translateX(0);
      `}
  }

  > div > img:nth-child(2) {
    ${(props) =>
      props.$onScreen &&
      props.$photos &&
      css`
        transition-delay: 200ms;
      `}
  }

  > div > img:nth-child(3) {
    ${(props) =>
      props.$onScreen &&
      props.$photos &&
      css`
        transition-delay: 400ms;
      `}
  }
`;
